export type Hours = number;
export type Days = number;
export enum Rating { Bad = 1, Good, Excellent }

export interface ExerciseResult {
  periodLength: Days,
  trainingDays: Days,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: Hours,
  average: number
}

export interface ExerciseInput {
  exercises: Array<Hours>,
  target: Hours
}

const getRating = (target: Hours, realized: Hours): Rating => {
  const ratingThreshold: Hours = 0.5;
  return realized > target + ratingThreshold ? Rating.Excellent :
         realized > target - ratingThreshold ? Rating.Good :
         Rating.Bad;
};

const getRatingDescription = (rating: Rating): string => {
  switch(rating) {
    case Rating.Excellent: return "Excellent effort!";
    case Rating.Good: return "Good job!";
    case Rating.Bad: return "Better effort next time!";
    default: throw new Error("Invalid rating supplied");
  }
};

export const calculateExercise = ({exercises, target}: ExerciseInput): ExerciseResult => {
  const periodLength: Days = exercises.length;
  const trainingDays: Days = exercises.reduce((days, daysExercise) => days + (daysExercise > 0 ? 1 : 0), 0);
  const average: Hours = exercises.reduce((total, hours) => total + hours, 0) / exercises.length;
  const success: boolean = average >= target;
  const rating: Rating = getRating(target, average);
  const ratingDescription: string = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

(() => {
  // Inside IIFE to avoid collision with bmiCalculator's parseArgs
  const parseArgs = (argv: Array<string>): ExerciseInput  => {
    if(argv.length < 4) 
      throw new Error("Provide atleast the target and one day's exercise hours. I.e. atleast two arguments");
    
    const target: Hours = +argv[2];
    const exercises: Array<Hours> = argv.slice(3).map(arg => +arg);

    if(exercises.some((e: Hours) => isNaN(e)) || isNaN(target)) 
      throw new Error("Provide only number values");

    return { target, exercises };
  };

  try {
    const exercises: ExerciseInput = parseArgs(process.argv);
    console.log(calculateExercise(exercises));
  } catch(e) {
    console.log((e as Error).message);
  }
})();

