import { useEffect, useState } from "react";
import EditDetailedBook from "./EditDetailedBook";

function DetailedBook({ book, isAdmin, isLoggedIn, onBack }) {
    const [bookInfo, setBookInfo] = useState(book);
    const [isAddReviewPushed, setIsAddReviewPushed] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rate, setRate] = useState(0);
    const [averageRate, setAverageRate] = useState(null);
    const [missingRate, setMissingRate] = useState(false)
    const bookId = book.bookId

    async function addReview(bookId, review) {
        if (review.rate > 0) {
            setMissingRate(false)
            const response = await fetch(`/api/books/${bookId}/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review)
            })
            setIsAddReviewPushed(false);
            setReviewText('')
        } else { setMissingRate(true) }
    }

    async function handleAddReview(e) {
        e.preventDefault();
        await addReview(bookId, { reviewText, rate })
        await fetchBookInfo();

    }

    function getAverageRate() {
        const average = Math.round(bookInfo.reviews.reduce((rateSum, review) => isNaN(review.rate) ? rateSum : rateSum + review.rate, 0) / bookInfo.reviews.length);
        setAverageRate(average)
    }


    useEffect(() => {
        getAverageRate()
        fetchBookInfo();
    }, [getAverageRate])

    async function fetchBookInfo() {
        const res = await fetch(`/api/book/${bookId}`);
        const bookDetails = await res.json();
        setBookInfo(bookDetails)
    }


    return ((book &&
        (isAdmin
            ? <EditDetailedBook onBack={onBack} bookinfo={book}></EditDetailedBook>
            : <>

                <div>
                    <img src={bookInfo.bookImage}></img>
                    <h2 className="bookDetailTitle">{bookInfo.title}</h2>
                    <p className="bookDetailP">Author:</p><h2 className="bookDetail">{bookInfo.author}</h2>
                    <p className="bookDetailP">Category:</p><h3 className="bookDetail">{bookInfo.genre}</h3>
                    <p className="bookDetail">Published at: {parseInt(bookInfo.year)}</p>
                    <p className="bookDetail">Pages: {parseInt(bookInfo.pageCount)}</p>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{
                        __html: bookInfo.description
                    }}></div>

                </div>
                <div>
                    {isLoggedIn
                        ? <>
                            {isAddReviewPushed ? <form onSubmit={handleAddReview}>
                                <label><input type="radio" name="rate" value={1} onChange={(e) => setRate(e.target.value)}></input>1</label>
                                <label><input type="radio" name="rate" value={2} onChange={(e) => setRate(e.target.value)}></input>2</label>
                                <label><input type="radio" name="rate" value={3} onChange={(e) => setRate(e.target.value)}></input>3</label>
                                <label><input type="radio" name="rate" value={4} onChange={(e) => setRate(e.target.value)}></input>4</label>
                                <label><input type="radio" name="rate" value={5} onChange={(e) => setRate(e.target.value)}></input>5</label>
                                <br></br>
                                <input value={reviewText} onChange={(e) => setReviewText(e.target.value)} type="text"></input>
                                <button type="submit" >Add Review</button>
                            </form>:
                            <button onClick={() => setIsAddReviewPushed(true)}>Add a review</button>
                            }
                            {missingRate && <p>Please Rate!</p>}
                        </>
                        : <p>To add a review, please log in!</p>}
                    <div>
                        {averageRate > 0 &&
                            <h3>Average rate:&nbsp;
                                {averageRate}</h3>}
                        <>{bookInfo.reviews.map(review => <div className="reviewDiv" key={review._id}><p>Rate: {review.rate}</p><p>Review: {review.reviewText}</p></div>)}</>
                    </div>
                </div>
                <div>
                    <button onClick={() => { onBack() }}>Back</button>
                </div>
            </>
        ))
    )
}
export default DetailedBook;