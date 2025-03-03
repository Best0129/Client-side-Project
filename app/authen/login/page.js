"use client";
import { useState, useEffect } from 'react';
import styles from './login.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [rememberMe, setRememberMe] = useState(false); 
  const router = useRouter();

  // function handle show password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  // function handle login
  const handleLogin = async (e) => {
    e.preventDefault(); 

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });


    if (!response.ok) {
      const errorData = await response.json(); 
      setError(errorData.message); 
      return;
    }

    const data = await response.json();

    const userData = { email, username: data.user.username };
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    router.push('/');
  };

  // store user data in localstorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email); 
    }
  }, []);

  return (
    <main>
      <section className={styles.loginForm}>
        <div className={styles.container}>
          <h1>GymBuddy</h1>
          <div className={styles.card}>
            <h1 className={styles.head}>Welcome Back!</h1>
            <p>The faster you fill up, the faster you get healthier</p>
            <form onSubmit={handleLogin}>
              <div className={styles.inputBox}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <span className={styles.user}>Email</span>
              </div>

              <div className={styles.inputBox}>
                <input
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <span>Password</span>
                {password && ( 
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.viewPasswordButton} 
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                )}

                {error && (
                  <div className={styles.notification}>
                    <div className={styles.notiglow}></div>
                    <div className={styles.notiborderglow}></div>
                    <div className={styles.notititle}>{error}</div>
                    <div className={styles.notibody}>Please try again.</div>
                  </div>
                )}
              </div>

              <div className={styles.box}>
                <label className={styles.contain}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <svg viewBox="0 0 64 64" height="1em" width="1em">
                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className={styles.path}></path>
                  </svg>
                  Remember me
                </label>
              </div>

              <button type="submit" className={styles.enter}>Sign in</button>
            </form>

            <p className={styles.sign}>Don't have an account? <span><a href="/authen/register" className={styles.signup}>Sign up</a></span></p>
          </div>
        </div>
      </section>
    </main>
  );
}