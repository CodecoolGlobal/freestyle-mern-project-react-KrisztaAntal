import { useEffect, useState } from "react";
import EditDetailedBook from "./EditDetailedBook";

function DetailedBook({ book, isAdmin, isLoggedIn, onBack }) {
    const [bookInfo, setBookInfo] = useState(book);
    //const [bookInfo2, setBookInfo2] = useState(null);
    const [isAddReviewPushed, setIsAddReviewPushed] = useState(false);
    const [review, setReview] = useState('');
    const [rate, setRate] = useState(0);
    //const isAdmin = true;
    //const isLoggedIn = false;
    const bookId = book.bookId
    //    const detailsLink = "https://www.googleapis.com/books/v1/volumes/zvHImh5II3cC"

    /*     async function fetchBookDetails() {
            const res = await fetch(`${detailsLink}`);
            const bookDetails2 = await res.json();
            setBookInfo2(bookDetails2.volumeInfo);
            //console.log(bookDetails2.volumeInfo);
        } */

    useEffect(() => {
        //fetchBookDetails();
        fetchBookInfo();
    }, [])

    async function fetchBookInfo() {
        const res = await fetch(`/api/book/${bookId}`);
        const bookDetails = await res.json();
        setBookInfo(bookDetails)
        //console.log(bookDetails);
    }

    async function handleAddReview() {
        const res = await fetch(`/api/book/${bookId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rate: rate, txt: review })
        })
        fetchBookInfo();
    }


    return ((book &&
        (isAdmin
            ? <EditDetailedBook onBack={onBack} bookinfo={book}></EditDetailedBook>
            : <>
                <div>
                    <button onClick={()=>{onBack()}}>Back</button>
                    </div>
                <div>
                    <img src={bookInfo.bookImage}></img>
                    <h1>{bookInfo.title}</h1>
                    <h2>Author: {bookInfo.author}{/* {bookInfo.authors.map(author => <h3 key={author}>{author}</h3>)} */}</h2>
                    <h3>Category: {bookInfo.genre}{/* {bookInfo.categories.map(category => <li key={category}>{category}</li>)} */}</h3>
                    <p>Published at: {parseInt(bookInfo.year)}</p>
                    <p>Pages: {parseInt(bookInfo.pageCount)}</p>
                    <p>{bookInfo.description}</p>
                    <div>
                        {isLoggedIn
                            ? <>
                                <button onClick={() => setIsAddReviewPushed(true)}>Add a review</button>
                                {isAddReviewPushed && <form onSubmit={handleAddReview}>
                                    <label>5<input type="radio" name="rate" value={5} onChange={(e) => setRate(e.target.value)}></input></label>
                                    <label>4<input type="radio" name="rate" value={4} onChange={(e) => setRate(e.target.value)}></input></label>
                                    <label>3<input type="radio" name="rate" value={3} onChange={(e) => setRate(e.target.value)}></input></label>
                                    <label>2<input type="radio" name="rate" value={2} onChange={(e) => setRate(e.target.value)}></input></label>
                                    <label>1<input type="radio" name="rate" value={1} onChange={(e) => setRate(e.target.value)}></input></label>
                                    <br></br>
                                    <input value={review} onChange={(e) => setReview(e.target.value)} type="text"></input>
                                    <button type="submit" >Add</button>
                                </form>
                                }
                            </>
                            : <p>To add a review, please log in!</p>}
                        <div>
                            <h3>Average rate: {bookInfo.reviews.reduce((rateSum, review) => rateSum + parseInt(review.rate), 0) / bookInfo.reviews.length}</h3>
                            <p>{bookInfo.reviews.map(review => <p key={review.txt}><p>Rate: {review.rate}</p><p>Review: {review.txt}</p></p>)}</p>
                        </div>
                    </div>
                </div>
            </>
        ))
    )
}
export default DetailedBook;