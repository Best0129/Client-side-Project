"use client";
import { useState, useEffect } from 'react';
import styles from './Nutritions.module.css';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';

const activityLevels = [
    { value: 1.2, label: "Sedentary (little or no exercise)" },
    { value: 1.375, label: "Lightly active (light exercise/sports 1-3 days/week)" },
    { value: 1.55, label: "Moderately active (moderate exercise/sports 3-5 days/week)" },
    { value: 1.725, label: "Very active (hard exercise/sports 6-7 days a week)" },
    { value: 1.9, label: "Super active (very hard exercise/sports & a physical job)" },
];

export default function NutritionCalculator() {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState(activityLevels[0].value);
    const [gender, setGender] = useState({ male: false, female: false });
    const [calories, setCalories] = useState(null);
    const [loader, setLoader] = useState(true);

    const calculateCalories = () => {
        let bmr;

        // Determine selected gender
        const selectedGender = gender.male ? 'male' : gender.female ? 'female' : null;

        // Mifflin-St Jeor Equation for BMR
        if (selectedGender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (selectedGender === 'female') {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            alert("Please select a gender.");
            return;
        }

        const dailyCalories = bmr * activityLevel;
        setCalories(Math.round(dailyCalories));
    };

    const handleGenderChange = (e) => {
        const { value } = e.target;
        setGender({ male: value === 'male', female: value === 'female' });
    };

    const handleClear = () => {
        setAge("")
        setHeight("")
        setWeight("")
        setActivityLevel(activityLevels[0].value)
        setCalories(null)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={styles.nutritionContainer}>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <div className={styles.container}>
                        <h1>Nutrition Calculator</h1>
                        <div className={styles.formGroup}>
                            <label>Age (years):</label>
                            <div className={styles.inputWithIcon}>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Height (cm):</label>
                            <div className={styles.inputWithIcon}>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Weight (kg):</label>
                            <div className={styles.inputWithIcon}>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Activity Level:</label>
                            <select
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                            >
                                {activityLevels.map((activity) => (
                                    <option
                                        className={styles.option}
                                        key={activity.value}
                                        value={activity.value}>
                                        {activity.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Gender:</label>
                            <div className={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender.male}
                                        onChange={handleGenderChange}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender.female}
                                        onChange={handleGenderChange}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className={styles.btnContainer}>
                            <button
                                className={styles.calcBtn}
                                onClick={calculateCalories}
                            >
                                Calculate
                            </button>
                            <button
                                className={styles.clearBtn}
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                        </div>
                        {calories !== null && (
                            <div className={styles.notification}>
                                <div className={styles.notiglow}></div>
                                <div className={styles.notiborderglow}></div>
                                <div className={styles.notibody}>
                                    <h2>Your daily calories needs: {calories} calories</h2>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}