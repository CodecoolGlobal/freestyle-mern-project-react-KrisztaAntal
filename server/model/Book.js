import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    BookId: String,
    Title: String,
    Author: String,
    Genre: String,
    BookImage: String,
    DeatailURL: String,
    Reviews: Array,
});
export default model('Book', bookSchema);