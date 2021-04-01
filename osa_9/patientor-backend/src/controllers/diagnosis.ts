import express from "express";
import service from "../services/patient";

const router = express.Router();

router.get("/", (_, res) => {
  res.json(service.getPatients());
});

export default router;