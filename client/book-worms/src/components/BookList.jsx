import { useState } from "react";
import Book from "./Book"

function BookList({ isLoggedIn, isAdmin, books }) {
    /*const [showDetails, setShowDetails] = useState(false);
    const [chosenBook, setChosenBook] = useState(null);
    const [list, setList] = useState();
    const fetcher = fetchList;*/

    const [bookList] = useState(books)

    console.log("listning books");
    return (
        bookList.map((book) => (
            <Book
                key={book.bookId} 
                book={book}
                isAdmin={false}
                pageType={"library"}
            />
        ))
    )
}
//book, bookItemtype, isLoggedIn, isAdmin = false, onShowDetails
/* isLoggedIn={false}*/
                
export default BookList;