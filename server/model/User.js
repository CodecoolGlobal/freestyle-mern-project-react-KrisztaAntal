import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    Name: String,
    Books: Array,
})
export default model('User', userSchema);
