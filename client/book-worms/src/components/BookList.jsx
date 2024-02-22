import Book from "./Book";


function BookList({ pageType, user, isAdmin, books }) {

    //const [bookList] = useState(books)


    console.log("listing books");
    return (
        <div className="item-list-root">
            {
                books && books.map((book) => (
                    <Book
                        pageType={pageType}
                        isLoggedIn={user}
                        key={book.bookId}
                        book={book}
                        isAdmin={isAdmin}
                        user={user}
                    />
                ))
            }
        </div>

    )
}

export default BookList;