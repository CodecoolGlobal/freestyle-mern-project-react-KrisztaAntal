import mongoose from 'mongoose'
const {Schema, model} = mongoose;

const reviewSchema = new Schema({
    Rating: Number,
    Comment: String,
    Commenter: String
});
export default model('Review', reviewSchema);