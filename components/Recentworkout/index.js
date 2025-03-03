"use client";
import { useState, useEffect } from "react";
import styles from './Recentworkout.module.css';
import exercisesData from "@/utils/exercises.json";

export default function Recentworkout() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        // get the last 6 exercises from the JSON data
        const latestExercises = exercisesData.slice(-6); 
        setExercises(latestExercises);
    }, []);

    return (
        <section className={styles.recentContainer} id='recentWorkout'>
            <h1><span className={styles.accent}>Recent</span> Workouts</h1>
            <div className={styles.exerciseGrid}>
                {exercises.map((exercise) => (
                    <div className={styles.exerciseCard} key={exercise.id}>
                        <div className={styles.image}></div>
                        <div className={styles.exerciseInfo}>
                            <h3>{exercise.name}</h3>
                            <p className={styles.info}>{exercise.description}</p>
                            <p>Target: <span className={styles.info}>{exercise.target}</span></p>
                            <p>Equipment: <span className={styles.info}>{exercise.equipment}</span></p>
                            <a href={`/workouts/detail/${exercise.id}`} className={`${styles.btn} ${styles.learn_more}`}>
                                <span className={styles.circle} aria-hidden="true">
                                    <span className={`${styles.icon} ${styles.arrow}`}></span>
                                </span>
                                <span className={styles.button_text}>Learn More</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}