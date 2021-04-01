import express from "express";
import service from "../services/patient";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_, res) => {
  res.json(service.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body) ;
    const patient = service.createPatient(newPatient);
    return res.status(201).json(patient);
  } catch(e) {
    return res.status(400).json({ error: (e as Error).message });
  }
});

export default router;