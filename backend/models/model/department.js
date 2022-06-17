import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const departmentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    dept_name:String,
    dept_code:String,
    created_at:String,
    created_by:String,
    updated_at:String,
    updated_by:String,
    status:String
})

departmentSchema.plugin(uniqueValidator);
const departmentModel =  mongoose.model('department',departmentSchema);

export default departmentModel