import UserModel from '../models/model/user.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { count } from 'console'
import date from 'date-and-time'
const now  =  new Date();
import resetTokenModel from '../models/model/resetToken.js'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

//Transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'paulsourabh16@gmail.com',
        pass: 'qkyujculdwfxtrhl'
    }
});

class UserController{
    static userRegistration = async (req, res)=>{
        const {name, password, confirm_password, contact_number, email, address, pincode, state, country, gender, dob, status} = req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed", "message":"Email already exist"})
        } else {
            if(name && password && contact_number && email && address && pincode && state && country && gender && dob && status){
               if(password === confirm_password){
                   try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const value = date.format(now,'YYYY/MM/DD HH:mm:ss')
                    const doc = new UserModel({
                        name:name,
                        password:hashPassword,
                        contact_number:contact_number,
                        email:email,
                        address:address,
                        pincode:pincode,
                        state:state,
                        country:country,
                        gender:gender,
                        dob:dob,
                        created_at:value,
                        updated_at:value,
                        status:status
                    }) 
                    await doc.save()
                    const saved_user = await UserModel.findOne({email:email})
                    //Generate JWT token
                    const token = jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "5d"})
                    res.status(201).send({"status":"Success", "message":"Registered successfully", "token": token})
                   } catch (error) {
                      res.send({"status":"failed", "message":"Unable to register"})
                   }
               } else{
                res.send({"status":"failed", "message":"Password and confirm password does not match"})
               }
            } else {
                res.send({"status":"failed", "message":"All fields are required"})
            }
        }
    }

    static userLogin = async (req, res) => {
        const {email, password} = req.body
        try {
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch)
                         {
                            let accessToken = jwt.sign({userId:user._id,role_id:"Admin"},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
                            let refreshToken = jwt.sign({userId:user._id,role_id:"Admin"},process.env.JWT_SECRET_KEY_2,{expiresIn:"7d"})
                            res.send({"status":"Success", "message":"Login successful","accessToken":accessToken, "refreshToken":refreshToken})
                         } else {
                            res.send({"status":"failed", "message":"Email and password not valid"})
                         }
                } else {
                    res.send({"status":"failed", "message":"Email not registered"})
                }
            } else {
                res.send({"status":"failed", "message":"Both fields are required"})
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"failed", "message":"Unable to login"})
        }
}
 
    static changePassword = async (req,res) => {
       try {
        const {email, old_password, new_password, confirm_password} = req.body
        if(new_password === confirm_password){
        const user = await UserModel.findOne({email:email})
        if(user != null) {
            const isMatch = await bcrypt.compare(old_password,user.password)
            if((user.email === email) && isMatch){
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(new_password, salt)
                await UserModel.findOneAndUpdate({_id:user._id},{
                    $set:{
                    password:hashPassword
                    }
                })
                res.send({"status":"Success", "message":"password changed successfully"})
            }else{
                res.send({"status":"failed", "message":"Email or old password doesnot match"})
            }
        } else {
            res.send({"status":"failed", "message":"Email not registered"})
        }
    } else {
        res.send({"status":"failed", "message":"new password and confirm password doesnot match."})
    }
       } catch (error) {
        console.log(error)
        res.send({"status":"failed", "message":"Unable to change password"})
       }
    }

    static resetPassword = async (req,res) => {
            const{email} = req.body
            const value = date.format(now,'YYYY/MM/DD HH:mm:ss')
            const user = await UserModel.findOne({email:email})
            if(user != null){
              crypto.randomBytes(16, function(ex, buf) {
                    var resettoken = buf.toString('hex');
               const resetToken = new resetTokenModel({
                _userId:user._id,
                resetToken: resettoken,
                created_at:value
               })
               resetToken.save()
               var resetPass = {
                from: 'paulsourabh16@gmail.com',
                to: email,
                subject: 'Password reset mail.',
                text: 'Hi, you may forget your password. dont worry you can reset it by clicking the link below.',
                html: '<p>Click <a href="http://localhost:3000/user/chPassword/' + resettoken + '">here</a> to reset your password</p>'
            };
            transporter.sendMail(resetPass, function(error, info){
                if(error){
                    res.send({"status":"failed", "message":"Unable to send password reset email"})
                }
                else {
                    res.send({"status":"Success", "message":"sent password reset email successfully. Please you inbox."})
                }
            })
        })
            } else {
                res.send({"status":"failed", "message":"Email not registered"})
            }
        }

        static forgetPassword = async(req,res) => {
            const{resetToken, password, confirm_password} = req.body
            try {
                if(password === confirm_password)
            {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                resetTokenModel.findOne({resetToken:resetToken})
                .then(result=>{
                    if(result){
                    resetTokenModel.deleteOne({resetToken:resetToken})
                    .then(reasult=>{
                    UserModel.findOneAndUpdate({_id:result._userId},{
                        $set:{
                        password:hashPassword
                        }
                    }).then(data => {
                        if(data != null){
                            res.send({"status":"Success", "message":"Password reset successfully."})
                        } else {
                            res.send({"status":"Failed", "message":"Password has not reset successfully."})
                        }
                    })
                    
            })
        } else {
            res.send({"status":"failed", "message":"Invalid token"})
        }
        })
            }else{
                    res.send({"status":"failed", "message":"Password and confirm password does not match"})
                }
            } catch (error) {
                res.send({"status":"failed", "message":"Unable to change Password"})
            }
           
            }

            static loggedUser = async (req, res) => {
                res.send({"user": req.user})
            }
        }

          

export default UserController