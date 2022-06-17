import express from "express";
const router = express.Router();
import GetUserController from '../controllers/user.js'
import checkUserAuth from "../middleware/auth-middleware.js";


//Route level middleware - to protect route
// router.use("/getList",checkUserAuth);

//protected routes
router.post('/getlist', GetUserController.allUser)

export default router