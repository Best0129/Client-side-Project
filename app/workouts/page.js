"use client";
import Navbar from '@/components/Navbar';
import { useState, useEffect } from "react";
import styles from "./workouts.module.css";
import exercisesData from "@/utils/exercises.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Loader from '@/components/Loader';

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBodyParts, setSelectedBodyParts] = useState(["all"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage, setExercisesPerPage] = useState(6);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    setExercises(exercisesData);
    setLoading(false);
  }, []);

  const bodyParts = [
    "all",
    ...new Set(
      exercisesData.flatMap((exercise) =>
        exercise.target.split(",").map((target) => target.trim())
      )
    ),
  ];

  const filteredExercises = selectedBodyParts.length === 0 || selectedBodyParts.includes("all")
    ? exercises
    : exercises.filter((exercise) =>
      selectedBodyParts.some((part) => exercise.target.includes(part))
    );

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryClick = (bodyPart) => {
    setCategoryLoading(true);
    setTimeout(() => {
      if (bodyPart === "all") {
        setSelectedBodyParts(["all"]);
      } else {
        setSelectedBodyParts((prev) => {
          if (prev.includes(bodyPart)) {
            return prev.filter((part) => part !== bodyPart && part !== "all");
          } else {
            return [...prev.filter((part) => part !== "all"), bodyPart];
          }
        });
      }
      setCurrentPage(1);
      setCategoryLoading(false);
    }, 2000);
  };

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Pagination logic
  const getPaginationRange = () => {
    const range = [];
    const maxPagesToShow = 3;

    // Calculate the start and end page numbers
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    // Adjust the start and end if there are less than maxPagesToShow
    if (totalPages <= maxPagesToShow) {
      start = 1;
      end = totalPages;
    } else {
      if (currentPage === 1) {
        end = Math.min(maxPagesToShow, totalPages);
      } else if (currentPage === totalPages) {
        start = Math.max(1, totalPages - maxPagesToShow + 1);
      } else {
        // If current page is in the middle
        if (currentPage > 1 && currentPage < totalPages) {
          start = currentPage - 1;
          end = currentPage + 1;
        }
      }
    }

    // Fill the range array with page numbers
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <main>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <section id="workouts" className={styles.container}>
            <div className={styles.categories}>
              <h1>Categories</h1>
              {bodyParts.map((bodyPart) => (
                <button
                  key={bodyPart}
                  className={`${styles.categoryButton} ${selectedBodyParts.includes(bodyPart) ? styles.active : ""}`}
                  onClick={() => handleCategoryClick(bodyPart)}
                >
                  {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
                </button>
              ))}
            </div>

            {categoryLoading ? (
              <div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
              </div>
            ) : (
              <div className={styles.exercisesGrid}>
                {currentExercises.map((exercise) => (
                  <div key={exercise.id} className={styles.exerciseCard}>
                    <div className={styles.image}></div>
                    <div className={styles.exerciseInfo}>
                      <h3>{exercise.name}</h3>
                      <p className={styles.info}>{exercise.description}</p>
                      <p>Target: <span className={styles.info}>{exercise.target}</span></p>
                      <p>Equipment: <span className={styles.info}>{exercise.equipment}</span></p>
                      <Link href={`/workouts/detail/${exercise.id}`} className={`${styles.btn} ${styles.learn_more}`}>
                        <span className={styles.circles} aria-hidden="true">
                          <span className={`${styles.icon} ${styles.arrow}`}></span>
                        </span>
                        <span className={styles.button_text}>Learn More</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.pagination}>
              <button
                className={`${styles.paginationButton} ${currentPage === 1}`}
                onClick={() => handlePageChange(1)}
              >
                First (1)
              </button>

              {paginationRange.map((page) => (
                <button
                  key={page}
                  className={`${styles.paginationButton} ${currentPage === page ? styles.active : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className={`${styles.paginationButton} ${currentPage === totalPages}`}
                onClick={() => handlePageChange(totalPages)}
              >
                Last ({totalPages})
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}