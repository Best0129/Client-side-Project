"use client"
import { useState } from 'react';
import styles from './login.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State to manage password input
  const [error, setError] = useState(''); // State for error messages

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

    const data = await response.json();
    
    if (response.ok) {
      // Handle successful login (e.g., redirect or show a success message)
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('email', data.user.email);
      router.push('/'); // Redirect to home page
    } else {
      const data = await response.json();
      setError(data.message); // Set error message from the response
    }
  };

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
                  required="required"
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
                  <input type="checkbox" />
                  <svg viewBox="0 0 64 64" height="1em" width="1em">
                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className={styles.path}></path>
                  </svg>
                  Remember me
                </label>
                <a>Forgot Your Password</a>
              </div>

              <button type="submit" className={styles.enter}>Sign in</button>
            </form>

            <button className={styles.signinGoogle}>
              <svg
                viewBox="0 0 256 262"
                preserveAspectRatio="xMidYMid"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                ></path>
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                ></path>
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                ></path>
              </svg>
              Sign up with Google
            </button>

            <p className={styles.sign}>Don't have an account? <span><a href="/authen/register" className={styles.signup}>Sign up</a></span></p>
          </div>
        </div>
      </section>
    </main>
  );
}