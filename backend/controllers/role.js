import roleModel from "../models/model/role.js"
import mongoose from "mongoose"
import date from 'date-and-time'
const now  =  new Date();

class roleController{
    static roleRegistration = async (req, res)=>{
        const {name, description, status} = req.body
            if(name && description && status)
            {
                   try {
                    const value = date.format(now,'YYYY/MM/DD HH:mm:ss')
                    const doc = new roleModel({
                   _id: new mongoose.Types.ObjectId,
                   name:name,
                   description:description,
                   created_at:value,
                   updated_at:value,
                   status:status
                    }) 
                    await doc.save()
                    res.send({"status":"Success", "message":"Role added successfully."})
                } catch(error) {
                    console.log(error)
                    res.send({"status":"Failed", "message":"Role not added please try again."})
                }
            } else {
                res.send({"status":"Failed", "message":"All fields are required"})
            }
}
}

export default roleController