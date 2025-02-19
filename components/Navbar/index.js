"use client";
import styles from './Navbar.module.css';
import Link from 'next/link';
import { FaDumbbell, FaCalendarAlt, FaUsers, FaUtensils, FaUser , FaUserPlus } from 'react-icons/fa'; // Import icons
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  useEffect(() => {
    const storedUser  = localStorage.getItem('user');
    const sessionUser  = sessionStorage.getItem('user');

    if (storedUser ) {
      const user = JSON.parse(storedUser ); // Parse the JSON string
      if (user && user.username) {
        setUsername(user.username); // Access the username property
      }
    } else if (sessionUser ) {
      const user = JSON.parse(sessionUser ); // Parse the JSON string
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
      // Show the popup
      setShowPopup(true);

      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload(); // This will refresh the page
      }, 1000); // Adjust the delay as needed (1000 ms = 1 second)
    } else {
      console.error(data.message); // Handle error
    }
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
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          ) : null} {/* Show nothing if no username */}
        </li>
      </ul>

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