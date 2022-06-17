import express from "express";
const router = express.Router();
import doctorController from "../controllers/patient.js";
import checkUserAuth from "../middleware/auth-middleware.js";


//Route level middleware - to protect route
// router.use("/getList",checkUserAuth);

//protected routes
router.get('/allPatient', doctorController.allPatient)
router.post('/searchUsingId', doctorController.searchUsingId)

export default router