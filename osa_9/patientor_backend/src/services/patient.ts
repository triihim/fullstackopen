import patients from "../data/patients";
import { PatientWithoutSSN, NewPatient, Patient, PublicPatient, NewEntry, Entry } from "../types";
import { v4 as uuid } from "uuid";

const service = {

  getPatients: (): Array<PatientWithoutSSN> => patients.map(p => {
    return {
      id: p.id,
      name: p.name,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      occupation: p.occupation,
      entries: p.entries
    }
  }),

  getPatient: (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if(!patient) throw new Error(`no patient found with id: ${id}`);
    return patient;
  },

  createPatient: (newPatient: NewPatient): PublicPatient => {
    const patient = newPatient as Patient;
    patient.id = uuid();
    patients.push(patient);
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    }
  },

  createEntry: (patientId: string, entry: NewEntry): Entry => {
    const patient = patients.find(p => p.id === patientId);
    if(!patient) throw new Error(`no patient found with id: ${patientId}`);
    const newEntry = entry as Entry;
    newEntry.id = uuid();
    patient.entries.push(newEntry);
    return newEntry;
  }

};

export default service;