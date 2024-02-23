import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userBookSchema = new Schema({
    BookId: String,
    IsRead: Boolean,
    IsFavorite: Boolean,
    CurrentPageCount: Number
});

export default model('UserBook', userBookSchema);