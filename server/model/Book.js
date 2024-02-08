import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema({
    bookId: String,
    title: String,
    author: String,
    year: String,
    pageCount: Number,
    genre: String,
    description: String,
    bookImage: String,
    deatailURL: String,
    reviews: Array,
});
export default model('Book', bookSchema);