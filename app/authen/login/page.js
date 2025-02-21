"use client";
import { useState, useEffect } from 'react';
import styles from './login.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State to manage password input
  const [error, setError] = useState(''); // State for error messages
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility state
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorData = await response.text(); // Get the response text
      console.error('Error response:', errorData); // Log the error response
      setError('Login failed. Please try again.'); // Set a generic error message
      return; // Exit the function early
    }

    const data = await response.json(); // Now it's safe to parse as JSON

    // Handle successful login
    const userData = { email, username: data.user.username }; // Ensure username is included
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    router.push('/'); // Redirect to home page
  };

  // Load email and password from localStorage or sessionStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email); // Set email from localStorage
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
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <span className={styles.user}>Email</span>
              </div>

              <div className={styles.inputBox}>
                <input
                  type={showPassword ? "text" : "password"} // Change input type based on state
                  required
                  value={password} // Bind the input value to the state
                  onChange={(e) => setPassword(e.target.value)} // Update state on input change
                />
                <span>Password</span>
                {password && ( // Conditionally render the button if password is not empty
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.viewPasswordButton} // Add a class for styling
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

              <div className={styles.box}>
                <label className={styles.contain}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} // Update rememberMe state
                  />
                  < svg viewBox="0 0 64 64" height="1em" width="1em">
                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className={styles.path}></path>
                  </svg>
                  Remember me
                </label>
                <a>Forgot Your Password</a>
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