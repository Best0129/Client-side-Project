"use client";
import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import exercisesData from "@/utils/exercises.json"; // Import the JSON file

export default function Hero() {
  const router = useRouter(); // Initialize the router
  const [randomExerciseId, setRandomExerciseId] = useState(null);

  const handleGetStartedClick = () => {
    const storedUser   = localStorage.getItem('user');
    if (storedUser  ) {
      const user = JSON.parse(storedUser  );
      if (user.username) {
        router.push('/workouts');
      } else {
        router.push('/authen/login');
      }
    } else {
      router.push('/authen/login');
    }
  };


  useEffect(() => {
    const getRandomExerciseId = () => {
      const randomIndex = Math.floor(Math.random() * exercisesData.length);
      return exercisesData[randomIndex].id; 
    };

    setRandomExerciseId(getRandomExerciseId());
  }, []); 

  return (
    <section id="hero" className={styles.herocontainer}>
      <div className={styles.heroContent}>
        <h1>Transform Your Life</h1>
        <h1>Through Fitness</h1>
        <p>Join our community of fitness enthusiasts and achieve your health goals</p>
        <div className={styles.heroButtons}>
          <button onClick={handleGetStartedClick} className={styles.primaryButton}>
            Get Started Free
          </button>
          <a href={`/workouts/detail/${randomExerciseId}`} className={styles.secondaryButton}>
            <PlayCircle className={styles.icon} />
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
}