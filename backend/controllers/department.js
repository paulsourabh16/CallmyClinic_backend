import express from 'express'
import departmentModel from '../models/model/department.js';
import date from 'date-and-time'
const now  =  new Date();
import mongoose from 'mongoose';

class departmentController{
    static allDepartment = async (req,res) => {
        departmentModel.find()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                department_data:result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
    }

    static departmentRegistration = async (req, res) => {
        const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
        const department = new departmentModel({
            _id: new mongoose.Types.ObjectId,
            dept_name:req.body.dept_name,
            dept_code:req.body.dept_code,
            created_at:value,
            created_by:req.body.created_by,
            updated_at:value,
            updated_by:req.body.updated_by,
            status:"Active",
        })
        department.save()
    .then(result=>{
        if(result)
        {
            res.status(200).json({
                new_department:result
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

export default departmentController