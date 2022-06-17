import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const doctoravilableSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:Number,
    doctor_id:String,
    avilable_date:Date,
    avilable_from:Date,
    avilable_to:String,
    created_at:Date,
    created_by:String,
    updated_at:Date,
    updated_by:String,
    status:Boolean
})

doctoravilableSchema.plugin(uniqueValidator);
const doctorAvilableMOdel = mongoose.model('doctoravilable',doctoravilableSchema);
export default doctorAvilableMOdel