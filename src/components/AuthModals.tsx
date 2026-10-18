import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, KeyRound, Sparkles } from 'lucide-react';

interface AuthModalsProps {
  onNavigate?: (route: string, param?: string) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ onNavigate }) => {
  const {
    loginModalOpen,
    registerModalOpen,
    forgotModalOpen,
    openLogin,
    openRegister,
    openForgot,
    closeModals,
    login,
    loginWithGoogle,
    register,
    resetPassword,
    adminLogin,
    adminAuth
  } = useAuth();

  // Login form state (unified for traveler and admin)
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  if (!loginModalOpen && !registerModalOpen && !forgotModalOpen) {
    return null;
  }

  // Handle Unified Login (Traveler & Admin)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginInput.trim() || !loginPassword) {
      setLoginError('Please enter both your email address/username and password.');
      return;
    }
    setLoginLoading(true);
    try {
      const res = await login(loginInput.trim(), loginPassword);
      if (res.success) {
        closeModals();
        if (res.isAdmin) {
          if (onNavigate) onNavigate('admin');
        } else {
          if (onNavigate) onNavigate('dashboard');
        }
      } else {
        setLoginError(res.error || 'Failed to sign in. Please verify your credentials.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'An unexpected error occurred while signing in.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        closeModals();
        if (onNavigate) onNavigate('dashboard');
      } else {
        setLoginError(res.error || 'Google sign-in was cancelled or failed.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Google sign-in encountered an error.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Traveler Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    if (!regFirstName.trim()) {
      setRegError('Please provide your first name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please recheck.');
      return;
    }

    setRegLoading(true);
    try {
      const res = await register({
        firstName: regFirstName.trim(),
        lastName: regLastName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        password: regPassword
      });
      if (res.success) {
        closeModals();
        if (onNavigate) onNavigate('dashboard');
      } else {
        setRegError(res.error || 'Registration failed. The email may already be registered.');
      }
    } catch (err: any) {
      setRegError(err.message || 'An error occurred during registration.');
    } finally {
      setRegLoading(false);
    }
  };

  // Handle Password Reset
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotSuccess(null);
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your account email address.');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await resetPassword(forgotEmail.trim());
      if (res.success) {
        setForgotSuccess('A password recovery email has been dispatched. Please check your inbox and spam folder.');
      } else {
        setForgotError(res.error || 'Could not send recovery link. Check that the email is registered.');
      }
    } catch (err: any) {
      setForgotError(err.message || 'Failed to dispatch password reset request.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={closeModals}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* -------------------- 1. LOGIN MODAL (Unified for Traveler & Admin) -------------------- */}
        {loginModalOpen && (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#5191fa] mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Diran Peak Adventure</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-[#1a2b48]">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sign in to access your bookings, saved trips, and member portal
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loginLoading}
              className="w-full py-2.5 px-4 mb-4 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center gap-2.5 shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">or email / username</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address or Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="name@example.com or username"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={openForgot}
                    className="text-[11px] text-[#5191fa] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loginLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={openRegister}
                className="font-bold text-[#5191fa] hover:underline cursor-pointer"
              >
                Register Now
              </button>
            </div>
          </div>
        )}

        {/* -------------------- 2. REGISTER MODAL -------------------- */}
        {registerModalOpen && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Diran Peak Adventure</span>
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-[#1a2b48]">
                Create Climber Account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Save expedition wishlists, manage visas, and track Karakoram permits
              </p>
            </div>

            {regError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="Ali"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="Sadpara"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="mountaineer@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone (Optional)</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+92 345 6412992"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full py-2.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-3"
              >
                {regLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create My Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              Already registered?{' '}
              <button
                type="button"
                onClick={openLogin}
                className="font-bold text-[#5191fa] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* -------------------- 3. FORGOT PASSWORD MODAL -------------------- */}
        {forgotModalOpen && (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-[#1a2b48]">
                Reset Your Password
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your account email to receive a secure password recovery link.
              </p>
            </div>

            {forgotSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {forgotError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{forgotError}</span>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="registered@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full py-2.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {forgotLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Send Recovery Email</span>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              Remembered your credentials?{' '}
              <button
                type="button"
                onClick={openLogin}
                className="font-bold text-[#5191fa] hover:underline cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
