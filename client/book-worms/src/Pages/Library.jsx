//This component fetches all books from the library. It does not require params

import BookList from "../components/BookList"
import { useEffect, useState } from "react";

async function fetchAllBooks() {
    const response = await fetch("/api/books/all");
    const data = await response.json();
    console.log(data);
    return data;
}

function Library() {

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState(null);

    useEffect(() => {
        fetchAllBooks()
            .then((books) => {
                setBooks(books);
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="content">
            <BookList
                books={books}
            />
        </div>
    )
}

/*            <BookList
                fetchList={fetchAllBooks}
                bookItemtype={siteType}
                onShowDetails={handleShowDetails}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin} /> */

export default Library