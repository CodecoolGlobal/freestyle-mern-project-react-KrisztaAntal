import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Book from "./model/Book.js";
import UserBook from "./model/UserBook.js";

//mongoose.connect(process.env.MONGO_DB_URL);
const app = express();
const PORT = 8080;

async function connectMongoose() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    await console.log("connected");
}

connectMongoose();


app.use(express.json());

app.get('/api/book/:id', async (req, res) => {
    const idToFind = req.params.id
    const book = await Book.findOne({ bookId: idToFind })
    res.send(book)
});

app.post('/api/book/:id', async (req, res) => {
    const review = req.body
    const update = await Book.updateOne({ bookId: req.params.id }, { $push: { reviews: review } })
    console.log(review);
    console.log(update);
    res.status(200)
})

app.patch('/api/book/:id', async (req, res) => {

})



app.get('/api/books/all', async (req, res) => {

    const bookList = await Book.find({})
    res.json(bookList);

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
        await UserBook.findOneAndUpdate({ Name: name }, { Books: { BookId: bookId, BookTitle: title, isRead: isRead, isFavorite: isFavorite, DetailLink: selflink } })
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding book to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put("/api/updateUserBook", async (req, res) => {
    try {
        const { isRead, bookId } = req.body;
        const userBook = await UserBook.findOneAndUpdate(
            { BookId: bookId }, { IsRead: isRead },
        );
        res.json(userBook);
    } catch (error) {
        console.error("Error updating user book:", error);
        res.status(500).json({ error: "Error updating user book" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
