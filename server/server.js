import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
//import Book from "./model/Book";

mongoose.connect(process.env.MONGO_DB_URL);
const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})
