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

app.get('/api/books/all/filter/:filterBy/:filter', async (req, res) => {
    const filterBy = req.params.filterBy;
    const filter = new RegExp(`${req.params.filter}`, 'i');
    const filteredList = await Book.find({ [filterBy]: filter });
    res.json(filteredList);
})

app.get('/api/books/all/filter', async (req, res) => {
    const { title, author, genre, year } = req.query
    const books = await Book
        .find({ title: new RegExp(title, "i") })
        .find({ author: new RegExp(author, "i") })
        .find({ genre: new RegExp(genre, "i") })
        .find({ year: new RegExp(year, "i") })
    res.json(books)
})

app.get('/api/book/:id', async (req, res) => {
    const idToFind = req.params.id
    const book = await Book.findOne({ bookId: idToFind })
    console.log(idToFind);
    console.log(book);
    res.send(book)
});

app.get('/api/users/:userId/collected', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId).populate("usersBooks.book")
    const collectedBooks = user.usersBooks.map(item => {
        if (item.book) {
            return {
                ...item.book.toObject(),
                isRead: item.isRead,
                isFavorite: item.isFavorite,
                currentPageCount: item.currentPageCount,
                _id: item._id
            };
        } else {
            return null;
        }
    }).filter(Boolean);
    return res.json(collectedBooks);
});



app.get('/api/users/:name', async (req, res) => {
    const name = req.params.name
    const user = await User.findOne({ name: name })
    return res.json(user)
})

app.post('/api/books/:id/review', async (req, res) => {
    const review = req.body
    const update = await Book.findOneAndUpdate({ bookId: req.params.id }, { $push: { reviews: review } }, { new: true })
    console.log(review);
    console.log(update);

    res.json(update.reviews.at(-1))
})

app.delete('/api/books/:id/reviews', async (req, res) => {
    const idToFind = req.body
    const deleted = await Book.findOneAndUpdate({ "reviews._id": idToFind });
    res.sendStatus(200)
})


app.get('/api/books/all', async (req, res) => {
    const bookList = await Book.find({})
    res.json(bookList);
})



app.patch('/api/users/:userId/addToCollection', async (req, res) => {
    const userId = req.params.userId
    const book = req.body;

    try {
        const collectedBook = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { usersBooks: book } },
            { new: true }
        );

        if (!collectedBook) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(collectedBook);

    } catch (error) {
        console.error('Error adding book to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/api/users/:userId/removeFromCollection/:bookId', async (req, res) => {
    const userId = req.params.userId
    const bookId = req.params.bookId
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { usersBooks: { _id: bookId } } },
            { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(updatedUser);

    } catch (error) {
        console.error('Error removing book from collection:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/removeFromCollection/:id', async (req, res) => {
    try {
        const book = await UserBook.findById(req.params.id);
        const deleted = await book.delete()
        return res.json(deleted)
    } catch (err) {
        return console.error(err)
    }
})

app.patch("/api/updateUserBook/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const userBook = await UserBook.findOneAndUpdate(
            { _id: userId },
            { $set: { ...req.body } },
            { new: true }
        );
        res.json(userBook);
    } catch (error) {
        console.error("Error updating user book:", error);
        res.status(500).json({ error: "Error updating user book" });
    }
});

app.get("/api/users/:name", async (req, res) => {
    const userName = req.params.name;
    const user = await User.findOne({ name: userName })
        .populate("usersBooks.book")
        .exec();
    res.status(200).send(user);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
