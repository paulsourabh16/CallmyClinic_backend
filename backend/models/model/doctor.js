import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const doctorSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    dept_id:String,
    registration_number:String,
    college_name:String,
    specialization:String,
    fees:Number,
    avilability:String,
    created_at:String,
    created_by:String,
    updated_at:String,
    updated_by:String,
    status:String
})

doctorSchema.plugin(uniqueValidator);
const doctorModel = mongoose.model('doctor',doctorSchema);

export default doctorModel