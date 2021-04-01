export type Kilograms = number;
export type Centimeters = number;
export type BMICategory = string;

export interface BMIinput {
  height: Centimeters,
  weight: Kilograms
}

export const calculateBmi = ({height, weight}: BMIinput): BMICategory => {
  if(isNaN(height) || isNaN(weight)) throw new Error("Invalid arguments. Expected height and weight as numbers");
  if(height < 0 || weight < 0) throw new Error("Arguments cannot be negative");

  const bmi = weight / Math.pow(height / 100, 2);

  if(bmi > 40)    return "Obese Class III (Very severely obese";
  if(bmi > 35)    return "Obese Class II (Severely obese)";
  if(bmi > 30)    return "Obese Class I (Moderately obese)";
  if(bmi > 25)    return "Overweight";
  if(bmi > 18.5)  return "Normal (healthy weight)";
  if(bmi > 16)    return "Underweight";
  if(bmi > 15)    return "Severely underweight";
                  return "Very severely underweight";
  
};

(() => {
  // Inside IIFE to avoid collision with exerciseCalculator's parseArgs
  const parseArgs = (argv: Array<string>): BMIinput => {
    if(argv.length !== 4) 
      throw new Error("Too many arguments. Provide only height and weight");
    
    const height: Centimeters = +argv[2];
    const weight: Kilograms = + argv[3];
  
    if(isNaN(height) || isNaN(weight)) 
      throw new Error("Invalid arguments. Height and weight must be numbers");
  
    return { height, weight };
  };
  
  try {
    const input: BMIinput = parseArgs(process.argv);
    console.log(calculateBmi(input));
  } catch(e) {
    console.log((e as Error).message);
  }
})();

