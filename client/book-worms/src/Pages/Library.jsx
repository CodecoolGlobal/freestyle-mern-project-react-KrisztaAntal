//This component fetches all books from the library. It does not require params

import BookList from "../components/BookList"
import { useEffect, useState } from "react";

async function fetchAllBooks() {
    const response = await fetch("/api/books/all");
    const data = await response.json();
    console.log(data);
    return data;
}

function Library({pageType, user, isAdmin}) {

    console.log("pageType: "+pageType);
    
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
                pageType={pageType}
                user={user}
                isAdmin={isAdmin}
                books={books}
            />
        </div>
    )
}

export default Library