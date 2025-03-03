"use client";
import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import exercisesData from "@/utils/exercises.json";

export default function Hero() {
  const router = useRouter();
  const [randomExerciseId, setRandomExerciseId] = useState(null);

  // function handle get staet button
  const handleGetStartedClick = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      router.push('/workouts'); // go to workouts page
    } else {
      router.push('/authen/login');  // go to login page
    }
  };

  useEffect(() => {
    // function random exercise id
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