import { NewPatient, Gender } from "./types";

const isString = (arg: unknown): arg is string => typeof(arg) === "string" || arg instanceof String;
const isDate = (arg: string): boolean => !!Date.parse(arg);
const isGender = (arg: any): arg is Gender => arg === Gender.Male || arg === Gender.Female;

const parseString = (arg: unknown): string => {
  if(arg && isString(arg)) return arg;
  throw new Error("Not a string");
}

const parseName = (arg: unknown): string => {
  try {
    return parseString(arg);
  } catch(_) {
    throw new Error("Invalid name")
  }
}

const parseOccupation = (arg: unknown): string => {
  try {
    return parseString(arg);
  } catch(_) {
    throw new Error("Invalid occupation");
  }
}

const parseSSN = (arg: unknown): string => {
  try {
    return parseString(arg);
  } catch(_) {
    throw new Error("Invalid SSN")
  }
}

const parseDate = (arg: unknown): string => {
  if(arg && isString(arg) && isDate(arg)) return arg;
  throw new Error("Invalid date");
}

const parseGender = (arg: unknown): Gender => {
  if(arg && isGender(arg)) return arg;
  throw new Error("Invalid gender");
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatient;
};