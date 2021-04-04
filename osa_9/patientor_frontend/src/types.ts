export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryType {
  "HealthCheck" = "HealthCheck",
  "OccupationalHealthcare" = "OccupationalHealthcare",
  "Hospital" = "Hospital"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
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

export type OccupationalHealthCareEntryForm = Omit<OccupationalHealthCareEntry, "id">;
export type HospitalEntryForm = Omit<HospitalEntry, "id">;
export type HealthCheckEntryForm = Omit<HealthCheckEntry, "id">;

export type EntryForm = HealthCheckEntryForm | HospitalEntryForm | OccupationalHealthCareEntryForm;