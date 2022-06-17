import express from 'express'
import appoinmentBookingModel from '../models/model/appoinmentbooking.js';
import date from 'date-and-time'
const now  =  new Date();
import mongoose from 'mongoose';
import doctorModel from '../models/model/doctor.js';

class AppoinmentBookingController {
    static deleteUsingId = async (req,res) => {
        const {id} = req.params
        if(id){
        appoinmentBookingModel.remove({_id:id})
    .then(result=>{
        res.send({"status":"Success", "message":"Appoinment deleted successfully."})
    })
    .catch(err=>{
        res.send({"status":"Failed", "message":"Invalid ID provided."})
        })
    } else {
        res.send({"status":"Failed", "message":"Please provide an id"})
    }
}

     static updateDateTime = async (req, res)=>{
        appoinmentBookingModel.findOneAndUpdate({_id:req.params.id},{
            $set:{
            booking_date:req.body.booking_date,
            booking_start_time:req.body.booking_start_time,
            booking_end_time:req.body.booking_end_time
            }
        })
        .then(result=>{
            res.send({"status":"Success", "message":"Appoinment timing updated successfully."})
        })
        .catch(err=>{
            res.send({"status":"Failed", "message": "Unable to update details. Please try again"})
        })
     }

     static searchPatientWithDoctorName = async (req, res) => {
        var regex = new RegExp(req.body.dname, 'i');
        doctorModel.findOne({name:regex})
        .then(result=>{
                console.log(result.id);
                appoinmentBookingModel.find({doctor_id:result.id})
                .then(result=>{
                    res.status(200).json({
                       patientData:result
                    })
                })
                
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
     }

     static searchAppoinmentUsingId = async (req,res) => {
        appoinmentBookingModel.findById(req.body.id).populate("patient_id").populate("doctor_id").populate("dept_id")
        .then(result=>{
            res.status(200).json({
                user:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
     }

     static getAllAppoinment = async (req, res) => {
        appoinmentBookingModel.find().populate("patient_id").populate("doctor_id").populate("dept_id")
        .then(result=>{
            console.log(result);
            res.status(200).json({
                userData:result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
     }

     static bookAppoinment = async (req, res) => {
        const value = date.format(now,'YYYY-MM-DD');
        const appoinmentbooking = new Appoinmentbooking({
            _id: new mongoose.Types.ObjectId,
            patient_id:req.body.patient_id,
            doctor_id:req.body.doctor_id,
            dept_id:req.body.dept_id,
            booking_date:value,
            booking_start_time:req.body.booking_start_time,
            booking_end_time:value,
            booking_fees:req.body.fees,
            paid:"true",
            paid_by:req.body.paid_by,
            created_at:value,
            created_by:req.body.created_by,
            updated_at:value,
            updated_by:req.body.updated_by
        })
        appoinmentbooking.save()
    .then(result=>{
        if(result)
        {
            res.status(200).json({
                name:result.name,
                email:result.email,
                role_id:result.role,
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
     }
}

export default AppoinmentBookingController