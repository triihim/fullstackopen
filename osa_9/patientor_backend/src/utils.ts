import { 
  NewPatient, 
  Gender,
  EntryType,
  HealthCheckRating, 
  NewHealthCheckEntry, 
  NewHospitalEntry,
  NewOccupationalHealthCareEntry, 
  NewEntry
} from "./types";

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

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatient;
};



interface EntryFields {
  type: EntryType,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown,
  HealthCheckRating?: unknown,
  employerName?: unknown,
  discharge?: { 
    date: unknown, 
    criteria: unknown 
  },
  sickLeave?: { 
    startDate: unknown,
    endDate: unknown }
}

const parseDescription = (arg: unknown): string => {
  if(!arg || !isString(arg)) throw new Error("Invalid description");
  return arg;
};

const isHealthCheckRating = (arg: any): arg is HealthCheckRating => {
  return arg === HealthCheckRating.CriticalRisk || 
         arg === HealthCheckRating.HighRisk || 
         arg === HealthCheckRating.LowRisk || 
         arg === HealthCheckRating.Healthy;
};

const parseHealthCheckRating = (arg: unknown): HealthCheckRating => {
  if(!isHealthCheckRating(arg)) throw new Error("Invalid health check rating");
  return arg;
};

const parseSpecialist = (arg: unknown): string => {
  try {
    return parseString(arg);
  } catch(_) {
    throw new Error("Invalid specialist");
  }
};

const parseDiagnosisCodes = (arg: unknown): Array<string> => {
  if(!Array.isArray(arg)) throw new Error("Diagnosis codes must be an array of strings");
  return arg.map(a => a.toString());
};

const parseDischarge = (arg: any): { date: string, criteria: string } => {
  if(!arg.date || !isString(arg.date) || !isDate(arg.date)) throw new Error("Invalid discharge date");
  if(!arg.criteria || !isString(arg.criteria)) throw new Error("Invalid discharge criteria");
  return { date: arg.date, criteria: arg.criteria };
};

const parseHealthCheckEntry = (entry: EntryFields): NewHealthCheckEntry => {
  const result: NewHealthCheckEntry = {
    type: EntryType.HealthCheck,
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    healthCheckRating: parseHealthCheckRating(entry.HealthCheckRating),
    specialist: parseSpecialist(entry.specialist)
  };

  if(entry.diagnosisCodes) {
    result.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  return result;
};

const parseHospitalEntry = (entry: EntryFields): NewHospitalEntry => {
  const result: NewHospitalEntry = {
    type: EntryType.Hospital,
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    discharge: parseDischarge(entry.discharge)
  };

  if(entry.diagnosisCodes) {
    result.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  return result;
};

const parseEmployerName = (arg: unknown): string => {
  try {
    return parseString(arg);
  } catch(_) {
    throw new Error("Invalid employer name");
  }
};

const parseSickLeave = (arg: any): { startDate: string, endDate: string } => {
  if(!arg.startDate || !isString(arg.startDate) || !isDate(arg.startDate)) throw new Error("Invalid sick leave start date");
  if(!arg.endDate || !isString(arg.endDate) || !isDate(arg.endDate)) throw new Error("Invalid sick leave end date");
  return { startDate: arg.startDate, endDate: arg.endDate };
}

const parseOccupationalHealthcareEntry  = (entry: EntryFields): NewOccupationalHealthCareEntry => {
  const result: NewOccupationalHealthCareEntry = {
    type: EntryType.OccupationalHealthcare,
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    employerName: parseEmployerName(entry.employerName),
  };

  if(entry.diagnosisCodes) {
    result.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  if(entry.sickLeave) {
    result.sickLeave = parseSickLeave(entry.sickLeave);
  }

  return result;
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  switch(entry.type) {
    case EntryType.HealthCheck: return parseHealthCheckEntry(entry);
    case EntryType.Hospital: return parseHospitalEntry(entry);
    case EntryType.OccupationalHealthcare: return parseOccupationalHealthcareEntry(entry);
    default: throw new Error("Invalid entry type");
  }
};