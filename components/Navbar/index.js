"use client";
import styles from './Navbar.module.css';
import Link from 'next/link';
import { FaDumbbell, FaCalendarAlt, FaUsers, FaUtensils, FaUser, FaUserPlus } from 'react-icons/fa'; // Import icons
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for success popup
  const [showConfirm, setShowConfirm] = useState(false); // State for confirmation popup

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser); // Parse the JSON string
      if (user && user.username) {
        setUsername(user.username); // Access the username property
      }
    } else if (sessionUser) {
      const user = JSON.parse(sessionUser); // Parse the JSON string
      if (user && user.username) {
        setUsername(user.username); // Access the username property
      }
    }
  }, []);

  const handleClick = () => {
    if (username) {
      router.push('/profile');
    } else {
      router.push('/authen/login');
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message); // "Logged out successfully"

      // Clear user data from localStorage and sessionStorage
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      // Show the success popup
      setShowPopup(true);

      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload(); // This will refresh the page
      }, 1000); // Adjust the delay as needed (1000 ms = 1 second)
    } else {
      console.error(data.message); // Handle error
    }
  };

  const confirmLogout = () => {
    setShowConfirm(true); // Show confirmation popup
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false); // Close confirmation popup
    handleLogout(); // Proceed with logout
  };

  const handleCancelLogout = () => {
    setShowConfirm(false); // Close confirmation popup
  };

  return (
    <nav className={styles.navbar} id='nav'>
      <div className={styles.logo}>
        <Link href="/">GymBuddy</Link>
      </div>
      <ul className={styles.navItems}>
        <li>
          <Link href="/workouts">
            <FaDumbbell className={styles.navIcon} /> Workouts {/* Icon for Workouts */}
          </Link>
        </li>
        <li>
          <Link href="">
            <FaCalendarAlt className={styles.navIcon} /> Plans {/* Icon for Plans */}
          </Link>
        </li>
        <li>
          <Link href="">
            <FaUsers className={styles.navIcon} /> Community {/* Icon for Community */}
          </Link>
        </li>
        <li>
          <Link href="">
            <FaUtensils className={styles.navIcon} /> Nutrition {/* Icon for Nutrition */}
          </Link>
        </li>
        <li>
          <button onClick={handleClick} className={styles.ctaButton}>
            {username ? (
              <span>
                <FaUser className={styles.navIcon} /> {username}
              </span>
            ) : (
              <span>
                <FaUserPlus className={styles.navIcon} /> Join Now
              </span>
            )}
          </button>
        </li>
        <li>
          {username ? (
            <button className={styles.logoutBtn} onClick={confirmLogout}>
              <div className={styles.sign}><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
              <div className={styles.text}>Logout</div>
            </button>
          ) : null} {/* Show nothing if no username */}
        </li>
      </ul>

      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmPopup}>
            <div className={styles.flex_shrink}>
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={styles.alert_svg}>
              <path clipRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1>Logout account</h1>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleCancelLogout} className={styles.cancelBtn}>Cancle</button>
            <button onClick={handleConfirmLogout} className={styles.confirmBtn}>Confirm</button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>
              <svg className={styles.succes_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Logout successful!</p>
          </div>
        </div>
      )}

    </nav>
  );
}