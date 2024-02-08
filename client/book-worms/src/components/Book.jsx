
import missingBook from '../assets/missing-book-image.jpg'

function Book(props) {

    const book = props.book;

    return (
        <div className="list-item-root">
            {book.bookImage !== null ? (
                <img src={book.bookImage} alt="Book Index Image" /> 
            ) : (
                <img src={missingBook} alt="Book Index Image" /> 
            )}
            
            <p>{book.title}</p>
            <p>Written by: {book.author}</p>
            <p>{book.genre}</p>                   {/*Might need to change to .map, in case it becomaes an array*/}
            {props.bookItemtype === "library" ? (
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