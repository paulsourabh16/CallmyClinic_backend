import mongoose from 'mongoose'
import UserModel from '../models/model/user.js'
import jwt from 'jsonwebtoken'

//Get all user records
class GetUserController{
    static allUser = async (req,res) => {
    await UserModel.find().populate('role')
    .then(result => {
        if(result != null){
            console.log(result);
        res.status(200).json({
            userData:result
        });
        } else {
            res.send({"status":"Failed", "message":"No user added"})
        } 
    })
    }
}

export default GetUserController