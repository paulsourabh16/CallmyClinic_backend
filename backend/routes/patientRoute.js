import express from "express";
const router = express.Router();
import PatientController from "../controllers/patient.js";
import checkUserAuth from "../middleware/auth-middleware.js";


//Route level middleware - to protect route
// router.use("/getList",checkUserAuth);

//protected routes
router.get('/allPatient', PatientController.allPatient)
router.post('/doctorRegistration', PatientController.patientRegistration)

export default router