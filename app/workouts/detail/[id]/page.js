import exercisesData from '@/utils/exercises.json';
import styles from './detail.module.css';
import * as React from 'react';
import Navbar from '@/components/Navbar';

const ExerciseDetail = ({ params }) => {
  const { id } = React.use(params); // Get the id from the URL parameters

  // Find the exercise based on the id
  const exercise = exercisesData.find(ex => ex.id.toString() === id);

  // Handle case where exercise is not found
  if (!exercise) {
    return <div>Exercise not found</div>; 
  }

  function convertToEmbedLink(youtubeUrl) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = youtubeUrl.match(regex);

    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    } else {
      return null; 
    }
  }

  const youtubeLink = exercise.videoUrl;
  const embedLink = convertToEmbedLink(youtubeLink);
  const autoPlay = "?autoplay=1"
  const embedLinkAutoPlay = embedLink.concat(autoPlay)

  // Function to get related exercises based on the target
  const getRelatedExercises = (target) => {
    return exercisesData.filter(ex => ex.target === target && ex.id.toString() !== id);
  };

  const relatedExercises = getRelatedExercises(exercise.target).slice(0, 10); // Limit to 10 related exercises;

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <iframe width="1280" height="720" src={embedLinkAutoPlay} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <h1>Exercise: {exercise.name}</h1>
          <div className={styles.details}>
            <p>Description: {exercise.description}</p>
            <p>Target: <span>{exercise.target}</span></p>
            <p>Equipment: <span>{exercise.equipment}</span></p>
          </div>
        </div>
        <div className={styles.related_content}>
          <h2>Related Exercises</h2>
          {relatedExercises.length > 0 ? (
            <ul>
              {relatedExercises.map(relEx => (
                <a key={relEx.id} href={`/workouts/detail/${relEx.id}`}>
                  <li>
                    <iframe width="400" height="225" src={convertToEmbedLink(relEx.videoUrl)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <p>Exercise: {relEx.name}</p>
                    <hr></hr>
                  </li>
                </a>
              ))}
            </ul>
          ) : (
            <p>No related exercises found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

// This function generates the static paths for the dynamic routes
export async function generateStaticParams() {
  const paths = exercisesData.map(exercise => ({
    id: exercise.id.toString(),
  }));

  return paths.map(path => ({ params: path }));
}

export default ExerciseDetail;