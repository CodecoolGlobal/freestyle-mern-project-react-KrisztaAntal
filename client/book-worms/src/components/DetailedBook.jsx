import { useEffect, useState } from "react";

function DetailedBook() {
    const [bookInfo, setBookInfo] = useState(null)
    const isAdmin = false;
    const isLoggedIn = false;
    const edit = 'kacsa';
    const bookId = "zvHImh5II3cC"
    const detailsLink = "https://www.googleapis.com/books/v1/volumes/Ll4wEAAAQBAJ"

    /*     async function fetchBookDetails() {
            const res = await fetch(`${detailsLink}`);
            const bookDetails = await res.json();
            setBookInfo(bookDetails.volumeInfo);
            console.log(bookDetails.volumeInfo);
        } */

    useEffect(() => {
        //fetchBookDetails();
        fetchBookInfo();
    }, [])

    async function fetchBookInfo() {
        const res = await fetch(`/api/book/${bookId}`);
        const bookDetails = await res.json();
        setBookInfo(bookDetails)
        console.log(bookDetails);
    }

    async function handleAddReview() {
        const res = fetch(`/api/book/${bookId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        })
    }


    return ((bookInfo &&
        (isAdmin
            ? <p>{edit}</p>
            : <>
                <p>Kacsa</p>
                <img src={bookInfo.imageLinks.thumbnail}></img>
                <h2>{bookInfo.title}</h2>
                <h3>Authors: {bookInfo.authors.map(author => <h3 key={author}>{author}</h3>)}</h3>
                <p >Category: {bookInfo.categories.map(category => <li key={category}>{category}</li>)}</p>
                <p>Published at: {parseInt(bookInfo.publishedDate)}</p>
                <p>{bookInfo.description}</p>
                <div>
                    {/* <p>{bookInfo.reviews.map(review=><p key={review}>{review}</p>)}</p> */}
                    {isLoggedIn
                        ? <button onClick={handleAddReview}>Add a review</button>
                        : <p>Please log in to add a review!</p>}
                </div>
            </>))
    )
}
export default DetailedBook;