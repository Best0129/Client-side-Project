"use client"
import { useState } from 'react';
import styles from './register.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState(''); // State for email
  const [error, setError] = useState(''); // State for error messages
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      // Handle successful registration (e.g., redirect or show a success message)
      console.log('User registered successfully');
      router.push('/authen/login'); // Redirect to login page
    } else {
      const data = await response.json();
      setError(data.message); // Set error message from the response
    }
  };

  return (
    <main>
      <section className={styles.registerForm}>
        <div className={styles.container}>
          <h1>GymBuddy</h1>
          <div className={styles.card}>
            <h1 className={styles.head}>Get Start!</h1>
            <p>The faster you fill up, the faster you get healthier</p>

            <form onSubmit={handleRegister}> 
              <div className={styles.inputBox}>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update username state
                />
                <span className={styles.user}>Username</span>
              </div>

              <div className={styles.inputBox}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
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

                {error &&
                  <div className={styles.notification}>
                      <div className={styles.notiglow}></div>
                      <div className={styles.notiborderglow}></div>
                      <div className={styles.notititle}>{error}</div>
                      <div className={styles.notibody}>Please try again.</div>
                    </div>}
                    
              </div>
              <button type="submit" className={styles.enter}>Sign up</button>
            </form>
            
            <p className={styles.sign}>Already have an account? <span><a href='/authen/login' className={styles.signup}>Sign in</a></span></p>
          </div>
        </div>
      </section>
    </main>
  );
}