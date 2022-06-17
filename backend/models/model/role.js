import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const roleSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    description:String,
    created_at:String,
    created_by:String,
    updated_at:String,
    updated_by:String,
    status:String
})

roleSchema.plugin(uniqueValidator);
const roleModel =  mongoose.model('role',roleSchema);
export default roleModel