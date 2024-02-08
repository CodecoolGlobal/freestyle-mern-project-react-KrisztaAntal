import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    usersBooks: [
        {
            book: {
                type: Schema.Types.ObjectId, 
                ref: 'Book'
            },
            isRead: Boolean,
            isFavorite: Boolean,
            currentPageCount: Number
        }
    ]
})
export default model('User', userSchema);
