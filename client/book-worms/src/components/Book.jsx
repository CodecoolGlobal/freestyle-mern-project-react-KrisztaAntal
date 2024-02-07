function Book(props) {

    const book = props.book;

    /*BookId: String,
    Title: String,
    Author: String,
    Genre: String,
    BookImage: String,
    Deatail URL: String,
    Reviews: Array, Object {
        Rating: Integer,
        Comment: String,
        Commenter: String
    }*/

    return (
        <div className="list-item-root">
            <img src={book.BookImage} alt="Book Index Image" />
            <h6>{book.Title}</h6>
            <h6>Written by: {book.Author}</h6>
            <h6>{book.Genre}</h6>                   {/*Might need to change to .map, in case it becomaes an array*/}
            {props.bookItemtype === "store" ? (
                <>
                    <button>Add to collection</button>
                    <button>Show details</button>
                </>
            )
                : props.bookItemtype === "collection" ? (
                    <>
                        <button>Remove from collection</button>
                        <button>Show details</button>
                        <button>⭐</button>
                    </>
                ) : (
                    <>
                        <button>Edit</button>
                        <button>Delete</button>
                    </>

                )
            }
        </div>
    )
}

export default Book;