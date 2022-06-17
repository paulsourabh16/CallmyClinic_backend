import mongoose from'mongoose'

const resettokenSchema = new mongoose.Schema({
    _userId: { type:'ObjectId', required: true, ref: 'User' },
    resetToken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

const resetTokenModel = mongoose.model('resetToken', resettokenSchema);

export default resetTokenModel