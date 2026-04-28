import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signInWithEmail, signInWithGoogle, registerWithEmail, clearError } from '../../store/slices/authSlice';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, user } = useAppSelector((s) => s.auth);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null);

  const showToast = (msg: string, type: 'error' | 'success' = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(`1`)
    e.preventDefault();
    console.log(`2`)
    if (!email || !password) return;
    console.log(`3`)
    if (isSignUp) {
      console.log(`inside this`)
      if (password !== confirmPassword) { showToast('Passwords do not match'); return; }
      if (password.length < 6) { showToast('Password must be at least 6 characters'); return; }
      const res = await dispatch(registerWithEmail({ email, password }));
      if (registerWithEmail.fulfilled.match(res)) { showToast('Account created! Welcome to MediCore.', 'success'); setTimeout(() => navigate('/'), 800); }
      else showToast((res.payload as string) || 'Sign up failed. Please try again.');
    } else {
      const res = await dispatch(signInWithEmail({ email, password })).catch(() => null);
      console.log('res:', res);
      console.log('loading after dispatch:', loading);
      if (res && signInWithEmail.fulfilled.match(res)) {
        navigate('/');
      } else {
        console.log('calling showToast');
        showToast('Invalid credentials. Please check your email and password.');
        console.log('toast state after showToast:', toast);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const res = await dispatch(signInWithGoogle());
    if (signInWithGoogle.fulfilled.match(res)) navigate('/');
    else showToast('Google sign-in failed. Please try again.');
  };

  return (
    <div className={styles.page}>
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            {toast.type === 'error'
              ? <><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" /><path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>
              : <><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>
            }
          </svg>
          {toast.msg}
        </div>
      )}

      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className={styles.logoText}>MediCore</span>
          </div>
          <div className={styles.heroText}>Healthcare Intelligence, Unified.</div>
          <div className={styles.heroSub}>
            Clinical-grade data management and patient intelligence trusted by 500+ hospitals worldwide.
          </div>
          <div className={styles.stats}>
            {[['2.4M', 'Patients managed'], ['98.7%', 'Uptime SLA'], ['ISO 27001', 'Certified']].map(([num, label]) => (
              <div key={label} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.leftFooter}>HIPAA · SOC 2 Type II · ISO 27001</div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{isSignUp ? 'Create account' : 'Welcome back'}</h2>
            <p className={styles.cardSub}>{isSignUp ? 'Sign up for your MediCore account' : 'Sign in to your MediCore account'}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Work Email</label>
              <input className={styles.input} type="email" placeholder="dr.mehta@hospital.com"
                value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.passWrap}>
                <input className={styles.input} type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={isSignUp ? 'new-password' : 'current-password'} required />
                <button type="button" className={styles.showPass} onClick={() => setShowPass((v) => !v)}>{showPass ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            {isSignUp && (
              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.passWrap}>
                  <input className={styles.input} type={showPass ? 'text' : 'password'} placeholder="••••••••"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className={styles.options}>
                <label className={styles.remember}><input type="checkbox" defaultChecked /> Remember me</label>
                <span className={styles.forgot}>Forgot password?</span>
              </div>
            )}

            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? <span className={styles.spinner} /> : isSignUp ? 'Create Account' : 'Sign In with Firebase'}
            </button>
          </form>

          <div className={styles.divider}><span className={styles.dividerLine} /><span className={styles.dividerText}>or continue with</span><span className={styles.dividerLine} /></div>

          <button className={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
          </button>

          <p className={styles.switchMode}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <span onClick={() => { setIsSignUp((v) => !v); dispatch(clearError()); setConfirmPassword(''); }}>
              {isSignUp ? 'Sign in' : 'Sign up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
