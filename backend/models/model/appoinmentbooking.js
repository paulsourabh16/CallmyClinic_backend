import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const appoinmentbookingSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    patient_id:{type:'ObjectId',ref:'patient'},
    doctor_id:{type:'ObjectId',ref:'doctor'},
    dept_id:{type:'ObjectId',ref:'department'},
    booking_date:String,
    booking_start_time:String,
    booking_end_time:String,
    booking_fees:Number,
    paid:String,
    paid_by:String,
    created_at:String,
    created_by:String,
    updated_at:String,
    updated_by:String,
    status:String
})
//623a9f327e8de687c3968100
//6239672b6b68d39c7cff0f4e
//62395646e9e169ee8caf6c70


appoinmentbookingSchema.plugin(uniqueValidator);
const appoinmentBookingModel =  mongoose.model('appoinmentbooking',appoinmentbookingSchema);
export default appoinmentBookingModel