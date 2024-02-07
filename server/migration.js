import selfLinks1 from "./selfLinks.js"
import Book from "./model/Book.js"
import mongoose from "mongoose";
import "dotenv/config";
//import Book from "./model/Book";

mongoose.connect(process.env.MONGO_DB_URL);

async function fetchData() {
    const books = await Promise.all(selfLinks1.map(async (link, index) => {
        console.log(link, index);
        const response = await fetch(link)
        const data = await response.json()
        const book = new Book({
            BookId: data.id,
            Title: data.volumeInfo.title ? data.volumeInfo.title : null,
            Author: data.volumeInfo.authors[0],
            Genre: data.volumeInfo.categories ? data.volumeInfo.categories[0] : null,
            BookImage: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : null,
            DeatailURL: data.selfLink,
            Reviews: []
        })
        await book.save()
    }))
}
// fetchData()


