import mongoose from "mongoose";
import User from "./model/User.js";
import Book from "./model/Book.js";
import "dotenv/config";

//createTestUser()
//getUserAndBooks()


async function getUserAndBooks() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    const user = await User
        .findOne({name: "admin"})
        .populate("usersBooks.book")
        .exec();
    console.log(user.usersBooks[0]);
    await mongoose.disconnect();
}

async function createTestUser() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        await createUser()
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}

async function createUser() {
    const user = new User({
        name: "admin",
        usersBooks: [
            {
                book: "65c498899c388738b92cd089",
                isRead: true,
                isFavorite: false,
                currentPageCount: 310
            },
            {
                book: "65c498899c388738b92cd08b",
                isRead: true,
                isFavorite: false,
                currentPageCount: 310
            },
        ],
    });
    await user.save()
}
