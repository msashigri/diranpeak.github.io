import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModals: React.FC = () => {
  const {
    loginModalOpen,
    registerModalOpen,
    forgotModalOpen,
    openLogin,
    openRegister,
    openForgot,
    closeModals,
    login,
    register
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  if (!loginModalOpen && !registerModalOpen && !forgotModalOpen) {
    return null;
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const res = await login(loginEmail, loginPassword);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!acceptTerms) {
      setRegisterError('You must accept the Terms and Privacy Policy to continue.');
      return;
    }

    setRegisterLoading(true);
    const res = await register({
      firstName,
      lastName,
      email: registerEmail,
      phone,
      password: registerPassword
    });
    setRegisterLoading(false);
    if (!res.success) {
      setRegisterError(res.error || 'Failed to create account.');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      return;
    }
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSent(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Close Button */}
        <button
          onClick={closeModals}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= LOGIN MODAL ================= */}
        {loginModalOpen && (
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-md bg-[#5191fa]/10 flex items-center justify-center text-[#5191fa]">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#1a2b48]">Log In</h3>
              </div>
              <p className="text-xs text-slate-500">Welcome back to Chogori Adventure</p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Laravel style form */}
            <form className="bravo-form-login space-y-4" onSubmit={handleLoginSubmit}>
              <input type="hidden" name="_token" value="csrf-token-chogori-auth-2026" />
              <input type="hidden" name="redirect" value="" />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#5191fa] rounded border-slate-300 focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={openForgot}
                  className="text-[#5191fa] hover:underline font-medium cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 bg-[#5191fa] hover:bg-[#3b77db] text-white font-semibold text-xs rounded-lg shadow-sm transition-all hover:shadow cursor-pointer flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                <span>{loginLoading ? 'Signing in...' : 'Log In'}</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('traveler@chogori.com');
                    setLoginPassword('password123');
                  }}
                  className="py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Demo Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    login('climber@chogori.com', 'expedition2026');
                  }}
                  className="py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#5191fa]" />
                  <span>1-Click Login</span>
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                Do not have an account?{' '}
                <button
                  type="button"
                  onClick={openRegister}
                  className="font-semibold text-[#5191fa] hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= REGISTER MODAL ================= */}
        {registerModalOpen && (
          <div className="p-8 max-h-[90vh] overflow-y-auto">
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-md bg-[#5191fa]/10 flex items-center justify-center text-[#5191fa]">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#1a2b48]">Sign Up</h3>
              </div>
              <p className="text-xs text-slate-500">Create an account to book treks & manage expeditions</p>
            </div>

            {registerError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            {/* Laravel style register form */}
            <form className="form bravo-form-register space-y-3.5" onSubmit={handleRegisterSubmit}>
              <input type="hidden" name="_token" value="csrf-token-chogori-reg-2026" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ali"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Hassan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 344 5925993"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password (min. 6 characters)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    name="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showRegisterPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    name="term"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    className="mt-0.5 w-3.5 h-3.5 text-[#5191fa] rounded border-slate-300 focus:ring-0"
                  />
                  <span>
                    I have read and accept the{' '}
                    <span className="text-[#5191fa] underline font-medium">Terms of Service</span> and{' '}
                    <span className="text-[#5191fa] underline font-medium">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={registerLoading}
                className="w-full py-2.5 px-4 bg-[#5191fa] hover:bg-[#3b77db] text-white font-semibold text-xs rounded-lg shadow-sm transition-all hover:shadow cursor-pointer flex items-center justify-center gap-2"
              >
                {registerLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                <span>{registerLoading ? 'Creating Account...' : 'Sign Up'}</span>
              </button>

              <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={openLogin}
                  className="font-semibold text-[#5191fa] hover:underline cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= FORGOT PASSWORD MODAL ================= */}
        {forgotModalOpen && (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-heading text-[#1a2b48]">Reset Password</h3>
              <p className="text-xs text-slate-500">
                Enter your email address and we will send you a password recovery link.
              </p>
            </div>

            {forgotSent ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Check your inbox</h4>
                <p className="text-xs text-slate-600 mb-6">
                  We have dispatched a password reset link to <strong className="text-slate-900">{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={openLogin}
                  className="w-full py-2.5 px-4 bg-[#5191fa] text-white text-xs font-semibold rounded-lg"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2.5 px-4 bg-[#5191fa] hover:bg-[#3b77db] text-white font-semibold text-xs rounded-lg shadow-sm transition-all"
                >
                  {forgotLoading ? 'Sending...' : 'Send Password Reset Link'}
                </button>

                <div className="text-center text-xs text-slate-500 pt-2">
                  <button
                    type="button"
                    onClick={openLogin}
                    className="font-medium text-[#5191fa] hover:underline cursor-pointer"
                  >
                    Back to Log In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
