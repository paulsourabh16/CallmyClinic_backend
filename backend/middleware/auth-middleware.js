import jwt from 'jsonwebtoken'
import { nextTick } from 'process'
import UserModel from '../models/model/user.js'

var checkUserAuth = async (req,res,next) => {
    let token
    const { authorization } = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]

            //Verify token
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            //Get user from token
            req.user = await UserModel.findById(userId)
            next()

        } catch (error) {
            console.log(error)
            res.status(401).send({"status":"failed"})
        }
    }
    if(!token) {
        res.status(401).send({"status":"failed", "message":"Unauthorized user, no token"})
    }
}

export default checkUserAuth