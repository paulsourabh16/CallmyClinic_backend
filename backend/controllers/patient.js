import express from 'express'
import patientModel from '../models/model/patient.js';
import date from 'date-and-time'
const now  =  new Date();
import mongoose from 'mongoose';

//Get all user records
class patientController{
    static allPatient = async (req,res) => {
    await patientModel.find()
    .then(result => {
        if(result != null){
        res.status(200).json({
            "status":"Success",
            userData:result
        });
    } else {
        res.send({"status":"Failed", "message":"No patient added"})
    }
    }) 
    }

    //Patient search using id
    static searchUsingId = async (req,res) => {
        const {id} = req.body
        if(id) {
           await patientModel.findById(id)
           .then(result => {
            if(result != null){
            res.status(200).json({
                "status":"Success",
                "patientData":result
            });
        } else{
            res.send({"status":"Failed", "message":"Please enter valid patient id"})
        }
        })
     } else {
            res.send({"status":"Failed", "message":"Please enter valid patient id"})
        }
    }

    //Patient search using name 
    static searchUsingName = async (req,res) => {
         const {name} = req.body
        patientModel.find({ "name": { $regex: '.*' + name + '.*' }},
   function(err,data){
       if(data[0] != null) {
        res.status(200).json({
           "parient data":data
       }) } else {
        res.send({"status":"Failed", "message":"Patient name with entered name is unavilable"})
    }
})
    } 

    static patientRegistration = async (req, res) => {
            const {name, email, emergency_contact_no, blood_group, weight, height, role} = req.body
                if(name && email && emergency_contact_no && blood_group && weight && height && role)
                {
                       try {
                        const value = date.format(now,'YYYY/MM/DD HH:mm:ss')
                        const doc = new patientModel({
                            _id: new mongoose.Types.ObjectId,
                            name:name,
                            email:email,
                            emergency_contact_no:emergency_contact_no,
                            blood_group:blood_group,
                            weight:weight,
                            height:height,
                            created_at:value,
                            updated_at:value,
                            status:"Active",
                            role:role
                        }) 
                        await doc.save()
                        res.send({"status":"Success", "message":"Patient added successfully."})
                    } catch(error) {
                        console.log(error)
                        res.send({"status":"Failed", "message":"Patient not added please try again."})
                    }
                } else {
                    res.send({"status":"Failed", "message":"All fields are required"})
                }
    }
    }

export default patientController