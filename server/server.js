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
                ...item.book.toObject(), // Convert Mongoose document to plain JavaScript object
                isRead: item.isRead,
                isFavorite: item.isFavorite,
                currentPageCount: item.currentPageCount,
                _id: item._id
            };
        } else {
            // Handle the case where item.book is undefined
            return null; // or any other appropriate action
        }
    }).filter(Boolean); // Filter out any null entries
    return res.json(collectedBooks);
});



app.get('/api/users/:name', async (req, res) => {
    const name = req.params.name
    const user = await User.findOne({ name: name })
    return res.json(user)
})

app.post('/api/books/:id/review', async (req, res) => {
    const review = req.body
    //await connectMongoose();
    const update = await Book.findOneAndUpdate({ bookId: req.params.id }, { $push: { reviews: review } }, { new: true })
    //await mongoose.disconnect();
    console.log(review);
    console.log(update);

    res.json(update.reviews.at(-1))
})

app.delete('/api/books/:id/reviews', async (req, res) => {
    const idToFind = req.body
    const deleted = await Book.findOneAndUpdate({ "reviews._id": idToFind });
    //const kacs= await deleted.json()
    console.log(idToFind);
    console.log(deleted);
    res.sendStatus(200)
})

app.patch('/api/books/:id', async (req, res) => {

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
        //await connectMongoose();
        const userBook = await UserBook.findOneAndUpdate(
            { _id: userId },
            { $set: { ...req.body } },
            { new: true }
        );
        //await mongoose.disconnect();
        res.json(userBook);
    } catch (error) {
        console.error("Error updating user book:", error);
        res.status(500).json({ error: "Error updating user book" });
    }
});

app.get("/api/users/:name", async (req, res) => {
    const userName = req.params.name;
    //await connectMongoose();
    const user = await User.findOne({ name: userName })
        .populate("usersBooks.book")
        .exec();
    //mongoose.disconnect;    
    res.status(200).send(user);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
