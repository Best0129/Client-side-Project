import styles from './Footer.module.css';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <section id="Footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1 className={styles.accent}>Gym<span>Buddy</span></h1>
          <h4>We believe that fitness is not just a destination.</h4>
          <h2>Contact Us</h2>
          <h5><Phone size={16} /><span>+66 095-025-2795</span></h5>
          <h5><Mail size={16} /><span>65070129@kmitl.ac.th</span></h5>
        </div>
        <div className={styles.informations}>
          <h2>Informations</h2>
          <ul>
            <li><Link href="#about">About Us</Link></li>
            <li><Link href="#workouts">Workout Plans</Link></li>
            <li><Link href="#recentWorkout">Recent Workouts</Link></li>
          </ul>
        </div>
        <div className={styles.quicklinks}>
          <h2>Quick Links</h2>
          <ul>
            <li><Link href="./workouts">Workouts</Link></li>
            <li><Link href="">Plans</Link></li>
            <li><Link href="">Community</Link></li>
            <li><Link href="">Nutrition</Link></li>
          </ul>
        </div>
        <div className={styles.subscribe}>
          <h2>Subscribe More Info</h2>
          <input className={styles.input_box} type='email' placeholder='Enter your Email'></input>
          <span className={styles.underline}></span><br></br>
          <a className={styles.ctaButton} href=''>Subscribe</a>
        </div>
      </div>
      <hr></hr>
      <div className={styles.copyright}>
        <p>&copy; 2025 GymBuddy. All rights reserved.</p>
      </div>
      <a href='#hero' className={styles.Btn}>
        <svg height="1.2em" className={styles.arrow} viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>
        <p className={styles.text}>Back to Top</p>
      </a>
    </section>
  )
}