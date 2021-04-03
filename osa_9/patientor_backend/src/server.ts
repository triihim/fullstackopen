import express from "express";
import cors from "cors";
import diagnosisController from "./controllers/diagnosis";
import patientController from "./controllers/patient";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosisController);
app.use("/api/patients", patientController);
app.get("/api/ping", (_, res) => { res.send("pong"); });

const port = 3001;
app.listen(port, () => console.log(`App running on port ${port}`));