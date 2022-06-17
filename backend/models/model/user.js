import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import role from './role.js';

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String ,required: true },
    password:{type: String ,required: true },
    contact_number:{type: Number ,required: true },
    email:{type: String ,unique: true },
    address:{type: String ,required: true },
    pincode:{type: Number ,required: true },
    state:{type: String ,required: true },
    country:{type: String ,required: true },
    gender:{type: String ,required: true },
    dob:{type: String ,required: true },
    created_at:{type: String},
    created_by:{type: String},
    updated_at:{type: String },
    updated_by:{type: String},
    status:{type: String ,required: true },
    role:{type:'ObjectId',ref:'role'}
})

userSchema.plugin(uniqueValidator);
const UserModel = mongoose.model('user',userSchema);

export default UserModel
