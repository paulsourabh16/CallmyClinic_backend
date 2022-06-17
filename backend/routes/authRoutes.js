import express from "express";
const router = express.Router();
import UserController from '../controllers/auth.js'
import checkUserAuth from "../middleware/auth-middleware.js";
import GetUserController from "../controllers/user.js"

//Route level middleware - to protect route
router.use('/changePassword', checkUserAuth)
router.use('/loggedUser', checkUserAuth)

//Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.get('/loggedUser', UserController.loggedUser)
router.post('/resetPassword',UserController.resetPassword)
router.get('/forgetPassword',UserController.forgetPassword)

//Protected routes
router.post('/changePassword',UserController.changePassword)

export default router