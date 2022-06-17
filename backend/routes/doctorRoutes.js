import express from "express";
const router = express.Router();
import doctorController from "../controllers/doctor.js";
import checkUserAuth from "../middleware/auth-middleware.js";

//Route level middleware - to protect route
// router.use("/getList",checkUserAuth);

//protected routes
router.get('/allDoctors', doctorController.allDoctors)
router.get('/avilableDoctorList', doctorController.avilableDoctorList)
router.post('/doctorRegistration', doctorController.doctorRegistration)

export default router