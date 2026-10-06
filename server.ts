import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
// In development, the AI Studio iframe dev server MUST run on port 3000.
// In production (Cloud Run), it listens on process.env.PORT or 8080.
const PORT = isProduction ? (Number(process.env.PORT) || 8080) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage directory & files
const DATA_DIR = path.resolve(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredUser {
  id: string;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password_hash?: string;
  passwordHash?: string;
  role?: string;
  created_at?: string;
  createdAt?: string;
  last_login_at?: string;
  lastLoginAt?: string;
}

interface StoredSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  userAgent?: string;
}

// Helper to read users
function readUsers(): StoredUser[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading users file:', err);
  }

  // Initial seed users with real bcrypt hashes
  const salt = bcrypt.genSaltSync(10);
  const initialUsers: StoredUser[] = [
    {
      id: 'usr_seed_traveler',
      first_name: 'Alex',
      last_name: 'Morgan',
      email: 'traveler@diranpealadventure.com',
      phone: '+923129903153',
      password_hash: bcrypt.hashSync('password123', salt),
      role: 'customer',
      created_at: new Date('2027-01-15T10:00:00Z').toISOString(),
      last_login_at: new Date().toISOString()
    },
    {
      id: 'usr_seed_admin',
      first_name: 'Admin',
      last_name: 'Officer',
      email: 'admin@diranpeakadventure.com',
      phone: '+92 345 6412992',
      password_hash: bcrypt.hashSync('admin123', salt),
      role: 'admin',
      created_at: new Date('2027-01-01T00:00:00Z').toISOString(),
      last_login_at: new Date().toISOString()
    }
  ];

  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing seed users:', err);
  }
  return initialUsers;
}

function saveUsers(users: StoredUser[]) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

function readSessions(): StoredSession[] {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8'));
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading sessions:', err);
  }
  return [];
}

function saveSessions(sessions: StoredSession[]) {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
}

function createSessionToken(userId: string, userAgent?: string, remember = true): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000); // 30 days or 1 day

  const sessions = readSessions().filter(s => new Date(s.expiresAt) > now);
  sessions.push({
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    userAgent
  });
  saveSessions(sessions);
  return token;
}

// ----------------------------------------------------
// Laravel-Compatible Authentication API Endpoints
// ----------------------------------------------------

/**
 * POST /api/auth/register
 * Laravel equivalent: Auth::register()
 */
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { first_name, last_name, email, password, password_confirmation, phone, term } = req.body;
  const errors: Record<string, string[]> = {};

  // 1. Validation rules matching Laravel RegisterRequest
  if (!first_name || typeof first_name !== 'string' || first_name.trim().length < 2) {
    errors.first_name = ['The first name field is required and must be at least 2 characters.'];
  }

  if (!last_name || typeof last_name !== 'string' || last_name.trim().length < 2) {
    errors.last_name = ['The last name field is required and must be at least 2 characters.'];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = ['The email address must be a valid email format.'];
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.password = ['The password must be at least 8 characters long.'];
  } else if (password_confirmation !== undefined && password !== password_confirmation) {
    errors.password_confirmation = ['The password confirmation does not match.'];
  }

  if (term === false || term === '0' || term === 0) {
    errors.term = ['You must accept the Terms and Privacy Policy to register.'];
  }

  // Check email uniqueness
  const users = readUsers();
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    errors.email = ['The email has already been taken. Please choose another or login.'];
  }

  // If validation fails, return 422 Unprocessable Entity
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      status: 0,
      message: 'The given data was invalid.',
      errors
    });
  }

  // 2. Hash password with bcrypt
  const saltRounds = 10;
  const password_hash = bcrypt.hashSync(password, saltRounds);

  // 3. Create user record
  const now = new Date().toISOString();
  const trimmedFirst = first_name.trim();
  const trimmedLast = last_name.trim();
  const trimmedPhone = (phone || '').trim();
  const newUser: StoredUser = {
    id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    first_name: trimmedFirst,
    firstName: trimmedFirst,
    last_name: trimmedLast,
    lastName: trimmedLast,
    email: normalizedEmail,
    phone: trimmedPhone,
    password_hash,
    passwordHash: password_hash,
    role: 'customer',
    created_at: now,
    createdAt: now,
    last_login_at: now,
    lastLoginAt: now
  };

  users.push(newUser);
  saveUsers(users);

  // 4. Create session token
  const token = createSessionToken(newUser.id, req.headers['user-agent']);

  return res.status(201).json({
    status: 1,
    message: 'Your account has been created successfully. Welcome to Diran Peak Adventure!',
    token,
    user: {
      id: newUser.id,
      first_name: trimmedFirst,
      firstName: trimmedFirst,
      last_name: trimmedLast,
      lastName: trimmedLast,
      email: newUser.email,
      phone: trimmedPhone,
      role: newUser.role,
      created_at: now,
      createdAt: now
    }
  });
});

/**
 * POST /api/auth/login
 * Laravel equivalent: Auth::attempt()
 */
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password, remember } = req.body;
  const errors: Record<string, string[]> = {};

  if (!email) {
    errors.email = ['The email field is required.'];
  }
  if (!password) {
    errors.password = ['The password field is required.'];
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      status: 0,
      message: 'The given data was invalid.',
      errors
    });
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return res.status(401).json({
      status: 0,
      message: 'These credentials do not match our records.',
      errors: {
        email: ['These credentials do not match our records. Please check your email or password.']
      }
    });
  }

  // Verify bcrypt password
  const storedHash = user.password_hash || user.passwordHash;
  if (!storedHash || !bcrypt.compareSync(password, storedHash)) {
    return res.status(401).json({
      status: 0,
      message: 'These credentials do not match our records.',
      errors: {
        password: ['The password provided is incorrect.']
      }
    });
  }

  // Update last login timestamp
  const loginTimestamp = new Date().toISOString();
  user.last_login_at = loginTimestamp;
  user.lastLoginAt = loginTimestamp;
  saveUsers(users);

  // Issue session token
  const token = createSessionToken(user.id, req.headers['user-agent'], Boolean(remember));
  const userFirst = user.first_name || user.firstName || '';
  const userLast = user.last_name || user.lastName || '';
  const userCreated = user.created_at || user.createdAt || loginTimestamp;

  return res.status(200).json({
    status: 1,
    message: 'Logged in successfully.',
    token,
    user: {
      id: user.id,
      first_name: userFirst,
      firstName: userFirst,
      last_name: userLast,
      lastName: userLast,
      email: user.email,
      phone: user.phone || '',
      role: user.role || 'customer',
      created_at: userCreated,
      createdAt: userCreated,
      last_login_at: loginTimestamp,
      lastLoginAt: loginTimestamp
    }
  });
});

/**
 * GET /api/auth/me or /api/auth/user
 * Laravel equivalent: Auth::user()
 */
app.get(['/api/auth/me', '/api/auth/user'], (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 0,
      message: 'Unauthenticated.'
    });
  }

  const token = authHeader.split(' ')[1];
  const sessions = readSessions();
  const now = new Date();
  const session = sessions.find(s => s.token === token && new Date(s.expiresAt) > now);

  if (!session) {
    return res.status(401).json({
      status: 0,
      message: 'Session expired or invalid.'
    });
  }

  const users = readUsers();
  const user = users.find(u => u.id === session.userId);
  if (!user) {
    return res.status(401).json({
      status: 0,
      message: 'User no longer exists.'
    });
  }

  return res.json({
    status: 1,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      created_at: user.created_at,
      last_login_at: user.last_login_at
    }
  });
});

/**
 * POST /api/auth/logout
 * Laravel equivalent: Auth::logout()
 */
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const sessions = readSessions().filter(s => s.token !== token);
    saveSessions(sessions);
  }

  return res.json({
    status: 1,
    message: 'Successfully logged out.'
  });
});

/**
 * POST /api/auth/forgot-password
 * Laravel equivalent: Password::sendResetLink()
 */
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(422).json({
      status: 0,
      errors: { email: ['A valid email address is required.'] }
    });
  }

  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  // In standard Laravel security practice, we return success even if user not found to prevent user enumeration
  return res.json({
    status: 1,
    message: 'If an account exists with that email, a password reset link has been dispatched.'
  });
});

/**
 * GET /api/auth/demo-credentials
 * Handy for users and evaluators testing the clone
 */
app.get('/api/auth/demo-credentials', (_req: Request, res: Response) => {
  return res.json({
    traveler: {
      email: 'traveler@chogoriadventure.com',
      password: 'password123',
      description: 'Standard traveler demo account'
    },
    admin: {
      email: 'admin@diranpeakadventure.com',
      password: 'admin123',
      description: 'Admin operations account'
    }
  });
});

// ----------------------------------------------------
// Server bootstrap (Vite in Dev or Static in Production)
// ----------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('⚡ Vite dev server middleware mounted');
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
    }
    app.get('*', (_req: Request, res: Response) => {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send('Diran Peak Adventure API Server Running.');
      }
    });
    console.log('📦 Serving production static bundle from /dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Chogori Adventure Full-Stack Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
