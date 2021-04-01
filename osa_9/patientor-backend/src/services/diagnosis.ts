import diagnoses from "../data/diagnoses.json";
import { Diagnosis } from "../types";

const service = {

  getDiagnoses: (): Array<Diagnosis> => diagnoses
  
};

export default service;