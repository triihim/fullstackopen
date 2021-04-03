import express from "express";
import service from "../services/diagnosis";

const router = express.Router();

router.get("/", (_, res) => {
  res.json(service.getDiagnoses());
});

export default router;