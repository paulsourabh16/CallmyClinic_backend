import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const patientSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:{type:String, unique:true},
    emergency_contact_no:Number,
    blood_group:String,
    weight:Number,
    height:Number,
    created_at:String,
    created_by:String,
    updated_at:String,
    updated_by:String,
    status:String
})

patientSchema.plugin(uniqueValidator);

const patientModel = mongoose.model('patient',patientSchema);

export default patientModel