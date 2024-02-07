import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const readStatusSchema = new Schema({
    PageCount: Number,
    CurrentPageCount: Number
})

const userBookSchema = new Schema({
    BookId: String,
    BookTitle: String,
    IsRead: Boolean,
    IsFavorite: Boolean,
    ReadStatus: {
        type: readStatusSchema,
        default: {}
    },
    DetailLink: String,
});
export default model('UserBook', userBookSchema);