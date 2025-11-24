import type { CoursePart } from "../App";

function Total({ courseParts }: { courseParts: CoursePart[] }) {

  const totalExercises = courseParts.reduce((sum, part) => {
    return sum + part.exerciseCount;
  }, 0)
  return (
    <>
      Number of exercises: {totalExercises}
    </>
  );
};

export default Total;
