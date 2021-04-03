import express from "express";
import service from "../services/patient";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_, res) => {
  res.json(service.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = service.createPatient(newPatient);
    return res.status(201).json(patient);
  } catch(e) {
    return res.status(400).json({ error: (e as Error).message });
  }
});

router.get("/:id", (req, res) => {
  try {
    return res.json(service.getPatient(req.params.id));
  } catch(e) {
    return res.status(400).json({ error: (e as Error).message });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    return service.createEntry(req.params.id, newEntry);
  } catch(e) {
    return res.status(400).json({ error: (e as Error).message });
  }
});

export default router;