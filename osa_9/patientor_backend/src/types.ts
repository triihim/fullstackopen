export enum Gender {
  Male = "male",
  Female = "female"
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Array<Entry>
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;
export type PublicPatient = Omit<PatientWithoutSSN, "entries">;
export type NewPatient = Omit<Patient, "id" | "entries">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  "HealthCheck" = "HealthCheck",
  "OccupationalHealthcare" = "OccupationalHealthcare",
  "Hospital" = "Hospital"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck,
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare,
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital,
  discharge: {
    date: string,
    criteria: string
  }
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, "id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;

export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthCareEntry | NewHospitalEntry;