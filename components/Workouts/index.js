import React from 'react';
import styles from "./Workouts.module.css"; // Ensure this import matches your CSS module file
import { Dumbbell, Bike, Heart, BicepsFlexed, Weight, Timer } from 'lucide-react';

export default function Workouts() {
  const plans = [
    {
      title: 'Weight Loss',
      description: 'Personalized weight loss programs with proven results',
      icon: Weight
    },
    {
      title: 'Classic Yoga',
      description: 'Traditional yoga practices for mind-body balance',
      icon: Heart
    },
    {
      title: 'Cycling',
      description: 'Indoor and outdoor cycling programs for all levels',
      icon: Bike
    },
    {
      title: 'Body Building',
      description: 'Professional guidance for muscle building and strength',
      icon: BicepsFlexed
    },
    {
      title: 'Muscle Gain',
      description: 'Structured programs for building lean muscle mass',
      icon: Dumbbell
    },
    {
      title: 'Fitness Training',
      description: 'Comprehensive fitness routines for overall health',
      icon: Timer
    }
  ];

  return (
    <section id="workouts" className={styles.container}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            Workout Plans
          </h1>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.card_content}>
                <div className={styles.icon_wrapper}>
                  <plan.icon size={48} className={styles.icon} />
                </div>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="./workouts" className={styles.ctaButton}>
          <span>Discover more</span>
        </a>
      </div>
    </section>
  );
}