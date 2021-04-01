import express from "express";
import { Kilograms, Centimeters, BMICategory, calculateBmi } from "./bmiCalculator";
import { Hours, ExerciseResult, calculateExercise } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: Centimeters = Number(req.query.height);
  const weight: Kilograms = Number(req.query.weight);

  try {
    const category: BMICategory = calculateBmi({ height, weight });
    return res.json({ height, weight, bmi: category });
  } catch(e) {
    return res.status(400).json({ error: (e as Error).message });
  }

});

app.post("/exercises", (req, res) => {
  try {
    if(!req.body.daily_exercises || !req.body.target)
      throw new Error("parameters missing");

    const exercises: Array<Hours> = req.body.daily_exercises.map((e: string | number) => Number(e));
    const target: Hours = Number(req.body.target);

    if(exercises.some((e: Hours) => isNaN(e)) || isNaN(target))
      throw new Error("malformatted parameters");

    const result: ExerciseResult = calculateExercise({ exercises, target });
    return res.json(result);

  } catch(e) {
    return res.status(400).json({ error: (e as Error).message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));