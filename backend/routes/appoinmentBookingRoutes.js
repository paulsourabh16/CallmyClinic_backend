import express from "express";
const router = express.Router();
import AppoinmentBookingController from "../controllers/appoinmentBooking.js";
import checkUserAuth from "../middleware/auth-middleware.js";


//Route level middleware - to protect route
// router.use("/getList",checkUserAuth);

//protected routes
router.delete('/deleteAppoinment/:id', AppoinmentBookingController.deleteUsingId)
router.post("/searchPatientWithDoctorName", AppoinmentBookingController.searchPatientWithDoctorName)
router.put("/updateDateTime/:id",AppoinmentBookingController.updateDateTime)
router.post("/searchAppoinmentUsingId",AppoinmentBookingController.searchAppoinmentUsingId)
router.get("/getAllAppoinment",AppoinmentBookingController.getAllAppoinment)
router.post("/bookAppoinment",AppoinmentBookingController.bookAppoinment)
export default router