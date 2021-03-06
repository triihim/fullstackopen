import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SELECT_PATIENT";
      payload: Patient
    }
  | {
      type: "SET_DIAGNOSES",
      payload: Array<Diagnosis>
    }
  | {
      type: "ADD_ENTRY_TO_SELECTED_PATIENT",
      payload: Entry 
    };


export const setPatientList = (patients: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const selectPatient = (patient: Patient): Action => {
  return {
    type: "SELECT_PATIENT",
    payload: patient
  };
};

export const setDiagnoses = (diagnoses: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};

export const addEntryToSelectedPatient = (entry: Entry): Action => {
  return {
    type: "ADD_ENTRY_TO_SELECTED_PATIENT",
    payload: entry
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SELECT_PATIENT":
      return {
        ...state,
        selectedPatient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY_TO_SELECTED_PATIENT": {
      if(!state.selectedPatient) return state;
      return {
        ...state,
        selectedPatient: {
          ...state.selectedPatient,
          entries: state.selectedPatient.entries.concat(action.payload)
        }
      };
    }
    default:
      return state;
  }
};
