import { useState } from 'react';
import missingBook from '../assets/missing-book-image.jpg'
import { useNavigate } from 'react-router-dom';

function Book({pageType, isLoggedIn, key, book}) {


    const navigate = useNavigate();

    const [collectedBooks, setCollectedBooks] = useState(null)

    const handleAddToCollection = async (book, userId) => {
        const body = {
            book: book._id,
            isRead: false,
            isFavorite: false,
            currentPageCount: 0
        }
        try {
            const response = await fetch(`/api/users/${userId}/addToCollection`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            setCollectedBooks(response)
            console.log(response)
        } catch (error) {
            console.error('Error adding book to collection:', error);
        }
    };

    const handleRemoveFromCollection = async (bookId, userId) => {
        try {
            await fetch(`/api/users/${userId}/removeFromCollection/${bookId}`, {
                method: "PATCH"
            })
            setCollectedBooks((collectedBooks) => {
                return collectedBooks.filter((collectedBook) => collectedBook._id !== bookId)
            })
        } catch (error) {
            return console.error(error)
        }
    }


    return (
        <div className="list-item-root" key={key}>
            {book.bookImage !== null ? (
                <img src={book.bookImage} alt="Book Index Image" />
            ) : (
                <img src={missingBook} alt="Book Index Image" />
            )}
            <p>{book.title}</p>
            <p>Written by: {book.author}</p>
            <p>{book.genre}</p>
            {pageType === "library" ? (
                <> {isLoggedIn ? <> {collectedBooks ? (
                    <button onClick={() => handleAddToCollection(book)}>Add to collection</button>
                ) : (<button onClick={() => handleRemoveFromCollection(book)}>Remove from collection</button>)}
                    <button onClick={() => { navigate(`/book/details/${book.bookId}`); console.log(book) }}>Show details</button>
                </>
                    :
                    <button onClick={() => { navigate(`/book/details/${book._id}`); console.log(book) }}>Show details</button>
                }
                </>
            )
                : pageType === "collection" ? (
                    <>
                        <button onClick={() => handleRemoveFromCollection(book._id)}>Remove from collection</button> 
                        <button onClick={() => { navigate(`/book/details/${book.bookId}`); console.log(book) }}>Show details</button>
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