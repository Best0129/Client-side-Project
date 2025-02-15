"use client"
import { useState } from 'react';
import styles from './register.module.css';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [password, setPassword] = useState(''); // State to manage password input

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility state
  };

  return (
    <main>
      <section className={styles.registerForm}>
        <div className={styles.container}>
          <h1>GymBuddy</h1>
          <div className={styles.card}>
            <h1 className={styles.head}>Get Start!</h1>
            <p>The faster you fill up, the faster you get healthier</p>

            <div className={styles.inputBox}>
              <input type="text" required="required"></input>
              <span className={styles.user}>Username</span>
            </div>

            <div className={styles.inputBox}>
              <input type="email" required="required"></input>
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
            </div>


            <button className={styles.enter}>Sign up</button>
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

            <p className={styles.sign}>Already have an account ? <span><a href='/authen/login' className={styles.signup}>Sign in</a></span></p>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client"
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import styles from './register.module.css';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState(''); // State for email
  const router = useRouter(); // Initialize router

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Here you would typically send a request to your API
    // For example:
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, email, password }),
    // });

    // Simulating a successful registration
    const response = { ok: true }; // Replace with actual response handling

    if (response.ok) {
      // Redirect to another page after successful registration
      router.push('/welcome'); // Change to your desired route
    } else {
      // Handle registration error
      console.error('Registration failed');
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

            <form onSubmit={handleRegister}> {/* Add form submission handler */}
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
              </div>

              <button type="submit" className={styles.enter}>Sign up</button> {/* Change to type="submit" */}
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

            <p className={styles.sign}>Already have an account? <span><a href='/authen/login' className={styles.signup}>Sign in</a></span></p>
          </div>
        </div>
      </section>
    </main>
  );
}