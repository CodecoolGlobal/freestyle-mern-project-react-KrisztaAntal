import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Book from "./model/Book.js";

mongoose.connect(process.env.MONGO_DB_URL);
const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/api/book/:id', async (req, res) => {
    const idToFind = req.params.id
    const book = await Book.findOne({ BookId: idToFind })
    //console.log(book);
    res.send(book)
});

app.post('/api/book/:id', async (req, res) => {
    const review = req.body
    const update = await Book.updateOne({ BookId: req.params.id }, { $push: { Reviews: review } })
    console.log(review);
    console.log(update);
    res.status(200)
})

app.patch('/api/book/:id', async (req, res) => {

})






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

