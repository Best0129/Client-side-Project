import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <section id="about" className={styles.aboutus}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>About Me</h1>
          <p className={styles.subtitle}>Hello! I'm Porames Phomood student ,a passionate fitness enthusiast and founder of GymBuddy</p>
          <p className={styles.subtitle}>I'm excited to share my knowledge and help you on your fitness journey. Let's work together to achieve your goals!</p>
          <h1 className={styles.title}>About us</h1>
          <p className={styles.subtitle}>Welcome to GymBuddy, where we believe that fitness is not just a destination, but a journey towards a healthier, happier you. Founded in 2025, our mission is to empower individuals of all fitness levels to achieve their personal health goals through innovative training programs, expert guidance, and a supportive community.</p>
          <p className={styles.subtitle}>At GymBuddy, we understand that every body is unique. That's why we offer a diverse range of fitness solutions tailored to meet the needs of everyone—from beginners to seasoned athletes. Our state-of-the-art facilities are equipped with the latest fitness technology, and our team of certified trainers is dedicated to providing personalized coaching and motivation to help you stay on track.</p>
          <p className={styles.subtitle}>Whether you're looking to lose weight, build strength, improve your endurance, or simply lead a more active lifestyle, GymBuddy is here to support you every step of the way. Join us today and discover the transformative power of fitness!</p>
          <button className={styles.btn}> Join Our Community</button>
        </div>
        <div className={styles.rightSide}>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;