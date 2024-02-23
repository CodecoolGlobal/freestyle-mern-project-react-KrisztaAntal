import selfLinks1 from "./selfLinks.js"
import Book from "./model/Book.js"
import mongoose from "mongoose";
import "dotenv/config";

//main()

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    await fetchData();
    await mongoose.disconnect();
}

async function fetchData() {
    const books = await Promise.all(selfLinks1.map(async (link, index) => {
        console.log(link, index);
        const response = await fetch(link)
        const data = await response.json()
        const book = new Book({
            bookId: data.id,
            title: data.volumeInfo.title ? data.volumeInfo.title : null,
            author: data.volumeInfo.authors[0],
            year: data.volumeInfo.publishedDate ? data.volumeInfo.publishedDate : null,
            pageCount: data.volumeInfo.pageCount ? data.volumeInfo.pageCount : null,
            genre: data.volumeInfo.categories ? data.volumeInfo.categories[0] : null,
            description: data.volumeInfo.description ? data.volumeInfo.description : null,
            bookImage: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : null,
            deatailURL: data.selfLink,
            reviews: []
        })
        await book.save()
    }))
}

