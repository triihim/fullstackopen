import patients from "../data/patients";
import { PatientWithoutSSN, NewPatient, Patient } from "../types";
import { v4 as uuid } from "uuid";

const service = {

  getPatients: (): Array<PatientWithoutSSN> => patients.map(p => {
    return {
      id: p.id,
      name: p.name,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      occupation: p.occupation
    }
  }),

  createPatient: (newPatient: NewPatient): PatientWithoutSSN => {
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
  }

};

export default service;