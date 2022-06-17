import express from 'express'
import doctorModel from '../models/model/doctor.js';
import date from 'date-and-time'
const now  =  new Date();
import mongoose from 'mongoose';

 class DoctorController{
     static allDoctors = async (req,res) => {
        doctorModel.find()
        .then(result=>{
            res.status(200).json({
                doctor_data:result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
     }

     static avilableDoctorList = async (req,res) => {
        doctorModel.find({avilability:"avilable"})
        .then(result=>{
            res.status(200).json({
                avilable_doctor_data:result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
     }

     static doctorRegistration = async (req, res) => {
        const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
        const {name, dept_id, registration_number, college_name, specialization, fees, avilability, created_by, updated_by, role} = req.body
        if(name && dept_id && registration_number && college_name && specialization && fees && avilability && created_by && updated_by && role){
        const doctor = new doctorModel({
            _id: new mongoose.Types.ObjectId,
            name:req.body.name,
            dept_id:req.body.dept_id,
            registration_number:req.body.registration_number,
            college_name:req.body.college_name,
            specialization:req.body.specialization,
            fees:req.body.fees,
            avilability:req.body.avilability,
            created_at:value,
            created_by:req.body.created_by,
            updated_at:value,
            updated_by:req.body.updated_by,
            status:"Active",
            role:req.body.role
        })
        doctor.save()
    .then(result=>{
        if(result)
        {
            res.status(200).json({
                new_doctor:result
            })
        }
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
     } else {
        res.send({"status":"Failed", "message":"all fiends are required"})
     }
    }
 }

 export default DoctorController