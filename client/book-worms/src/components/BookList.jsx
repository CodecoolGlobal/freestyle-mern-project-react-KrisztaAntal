import Book from "./Book";


function BookList({ pageType, user, isAdmin, books }) {
    return (
        <div className="content">
            <div className="item-list-root">
                {
                    books && books.map((book) => (
                        <Book
                            pageType={pageType}
                            isLoggedIn={user}
                            IdKey={book.bookId}
                            book={book}
                            isAdmin={isAdmin}
                            user={user}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BookList;