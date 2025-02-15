import styles from './Hero.module.css';
import { PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className={styles.herocontainer}>
      <div className={styles.heroContent}>
        <h1>Transform Your Life</h1>
        <h1>Through Fitness</h1>
        <p>Join our community of fitness enthusiasts and achieve your health goals</p>
        <div className={styles.heroButtons}>
          <a href='/authen/login' className={styles.primaryButton}>Get Started Free</a>
          <a className={styles.secondaryButton}>
            <PlayCircle className={styles.icon} />
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  )
}