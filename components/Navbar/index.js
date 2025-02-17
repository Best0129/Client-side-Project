"use client";
import styles from './Navbar.module.css';
import Link from 'next/link';
import { FaDumbbell, FaCalendarAlt, FaUsers, FaUtensils, FaUser , FaUserPlus } from 'react-icons/fa'; // Import icons
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser  = localStorage.getItem('user');
    if (storedUser ) {
      const user = JSON.parse(storedUser ); // Parse the JSON string
      setUsername(user.username); // Access the username property
    }
  }, []);

  const handleClick = () => {
    if (username) {
      router.push('/profile');
    } else {
      router.push('/authen/login');
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
                <FaUser  className={styles.navIcon} /> {username}
              </span>
            ) : (
              <span>
                <FaUserPlus className={styles.navIcon} /> Join Now
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}