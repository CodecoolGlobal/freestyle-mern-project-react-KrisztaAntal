import { useState } from 'react';
import missingBook from '../assets/missing-book-image.jpg'

function Book({ book, bookItemtype, isLoggedIn, isAdmin, onShowDetails }) {

    const [collectedBooks, setCollectedBooks] = useState(null)

    const handleAddToCollection = async (book) => {
        try {
            const response = await fetch('/api/addToCollection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            setCollectedBooks(response)
            console.log(response)
        } catch (error) {
            console.error('Error adding book to collection:', error);
        }
    };

    const handleRemoveFromCollection = async (id) => {
        try {
            await fetch(`/api/removeFromCollection/${id}`, {
                method: "DELETE"
            })
            setCollectedBooks((collectedBooks) => {
                return collectedBooks.filter((collectedBook) => collectedBook._id !== id)
            })
        } catch (error) {
            return console.error(error)
        }
    }


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
            {bookItemtype === "library" ? (
                <> {isLoggedIn ? <>
                    <button onClick={handleAddToCollection}>Add to collection</button>                    <button onClick={() => { onShowDetails(book); console.log(book) }}>Show details</button>
                </>
                    :
                    <button onClick={() => { onShowDetails(book); console.log(book) }}>Show details</button>
                }
                </>
            )
                : bookItemtype === "collection" ? (
                    <>
                        <button onClick={handleRemoveFromCollection}>Remove from collection</button>                        <button onClick={() => { onShowDetails(book); console.log(book) }}>Show details</button>
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