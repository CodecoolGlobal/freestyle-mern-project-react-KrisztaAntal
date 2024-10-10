import {useState} from 'react';
import missingBook from '../assets/missing-book-image.jpg'
import {useNavigate} from 'react-router-dom';

function Book({pageType, isLoggedIn, key, book, user}) {

    const navigate = useNavigate();
    const [collectedBooks, setCollectedBooks] = useState(null)
    const userId = user ? user._id : null;
    const [currentPageCount, setCurrentPageCount] = useState(0);

    const handleAddToCollection = async () => {
        const body = {
            book: book._id,
        }
        try {
            const response = await fetch(`/api/users/${userId}/addToCollection`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                setCollectedBooks(prevState => prevState ? [...prevState, book] : [book]);
                console.log('Book successfully added to collection')
            } else {
                console.error('Failed to add book to collection');
            }
        } catch (error) {
            console.error('Error adding book to collection:', error);
        }
    };

    const handleRemoveFromCollection = async () => {
        try {
            const response = await fetch(`/api/users/${userId}/removeFromCollection/${book._id}`, {
                method: "PATCH"
            });
            if (response.ok) {
                setCollectedBooks(prevState => prevState.filter(collectedBook => collectedBook._id !== book._id));
                console.log('Book successfully removed to collection')
            } else {
                console.error('Failed to remove book from collection');
            }
        } catch (error) {
            return console.error(error)
        }
    }


    const handlePageChange = (event) => {
        setCurrentPageCount(parseInt(event.target.value));
    };

    const calculateProgress = () => {
        if (book.pageCount === 0) return 0;
        return Math.round((currentPageCount / book.pageCount) * 100);
    };

    return (
        <div className="list-item-root" key={key}>
            {book.bookImage !== null ? (
                <img src={book.bookImage} alt="Book Index Image"/>
            ) : (
                <img src={missingBook} alt="Book Index Image"/>
            )}
            <p>{book.title}</p>
            <p>Written by: {book.author}</p>
            <p>{book.genre}</p>
            {pageType === "library" ? (
                    <> {isLoggedIn ?
                        <> {!collectedBooks ? (
                            <button onClick={handleAddToCollection}>Add to collection</button>
                        ) : (<button onClick={handleRemoveFromCollection}>Remove from collection</button>)}
                            <button onClick={() => {
                                navigate(`/book/details/${book.bookId}`);
                                console.log(book)
                            }}>Show details
                            </button>
                        </>
                        :
                        <button onClick={() => {
                            navigate(`/book/details/${book.bookId}`);
                            console.log(book)
                        }}>Show details</button>
                    }
                    </>
                )
                : pageType === "collection" ? (
                    <>
                        {/* <button onClick={() => handleRemoveFromCollection(book._id)}>Remove from collection</button> */}
                        <div>
                            <label>
                                Current Page:
                                <input
                                    type="number"
                                    value={currentPageCount}
                                    onChange={handlePageChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>Total Pages: {book.pageCount}</label>
                        </div>
                        <div>
                            <label>Reading Progress: {calculateProgress()}%</label>
                        </div>
                        <button onClick={() => {
                            navigate(`/book/details/${book.bookId}`);
                            console.log(book)
                        }}>Show details
                        </button>
                        {/* <button>⭐</button> */}
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