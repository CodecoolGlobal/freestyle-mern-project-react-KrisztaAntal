import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Book from "./model/Book.js";
import UserBook from "./model/UserBook.js";
import User from "./model/User.js";


const app = express();
const PORT = 8080;

async function connectMongoose() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected");
}

connectMongoose();

app.use(express.json());

app.get('/api/book/:id', async (req, res) => {
    const idToFind = req.params.id
    //await connectMongoose();
    const book = await Book.findOne({ bookId: idToFind })
    //await mongoose.disconnect();
    //console.log(book);
    res.send(book)
});

app.post('/api/books/:id/review', async (req, res) => {
    const review = req.body
    //await connectMongoose();
    const update = await Book.findOneAndUpdate({ bookId: req.params.id }, { $push: { reviews: review } }, {new:true})
    //await mongoose.disconnect();
    console.log(review);
    console.log(update);
    
    res.json(update.reviews.at(-1))
})

app.patch('/api/book/:id', async (req, res) => {

})



app.get('/api/books/all', async (req, res) => {
    //await connectMongoose();
    const bookList = await Book.find({})
    res.json(bookList);
    //await mongoose.disconnect();
/*
    try {
        const bookList = await Book.find({})
        res.json(bookList);
        //res.sendStatus(200)
    } catch (error) {
        res.send(error);
        res.sendStatus(500);
    }
*/
})


app.post('/api/addToCollection', async (req, res) => {
    try {
        const { name, bookId, title, isRead, isFavorite, selflink } = req.body;
        //await connectMongoose();
        await UserBook.findOneAndUpdate({ Name: name }, { Books: { BookId: bookId, BookTitle: title, isRead: isRead, isFavorite: isFavorite, DetailLink: selflink } })
        //await mongoose.disconnect();
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding book to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put("/api/updateUserBook", async (req, res) => {
    try {
        const { isRead, bookId } = req.body;
        //await connectMongoose();
        const userBook = await UserBook.findOneAndUpdate(
            { BookId: bookId }, { IsRead: isRead },
            );
        //await mongoose.disconnect();
            res.json(userBook);
        } catch (error) {
            console.error("Error updating user book:", error);
            res.status(500).json({ error: "Error updating user book" });
        }
    });
    
    app.get("/api/users/:name", async (req, res)=> {
        const userName = req.params.name;
        //await connectMongoose();
        const user =  await User.findOne({name: userName})
            .populate("usersBooks.book")
            .exec();
        //mongoose.disconnect;    
        res.status(200).send(userName);
    })
    
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
    