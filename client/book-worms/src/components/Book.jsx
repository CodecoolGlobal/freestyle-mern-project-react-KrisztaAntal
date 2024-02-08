function Book({ book, bookItemtype, isLoggedIn, isAdmin, onShowDetails}) {

    //const book = props.book;

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
            <img src={book.bookImage} alt="Book Index Image" />
            <p>{book.title}</p>
            <p>Written by: {book.author}</p>
            <p>{book.genre}</p>                   {/*Might need to change to .map, in case it becomaes an array*/}
            {bookItemtype === "library" ? (
                <> {isLoggedIn ?<>
                    <button>Add to collection</button> 
                    <button onClick={()=>{onShowDetails(book); console.log(book)}}>Show details</button>
                    </>
                    :
                    <button onClick={()=>{onShowDetails(book); console.log(book)}}>Show details</button>
                }
                </>
            )
                : bookItemtype === "collection" ? (
                    <>
                        <button>Remove from collection</button>
                        <button onClick={()=>{onShowDetails(book); console.log(book)}}>Show details</button>
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