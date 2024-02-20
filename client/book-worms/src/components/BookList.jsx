import { useState } from "react";
import Book from "./Book"

function ItemList({ isLoggedIn, isAdmin, books }) {
    /*const [showDetails, setShowDetails] = useState(false);
    const [chosenBook, setChosenBook] = useState(null);
    const [list, setList] = useState();
    const fetcher = fetchList;*/

    const [bookList] = useState(books)

    return (
        bookList.map((book) =>
            <Book
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                book={book}
                key={book.bookId}
                pageType={"library"}
            />)
    )
}
export default ItemList;