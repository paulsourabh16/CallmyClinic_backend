import express from "express";
const router = express.Router();
import roleController from "../controllers/role.js";
import checkUserAuth from "../middleware/auth-middleware.js";


//Route level middleware - to protect route
// router.use("/getList",checkUserAuth);

//protected routes
router.post('/create', roleController.roleRegistration)

export default router