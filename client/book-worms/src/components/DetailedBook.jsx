import { useEffect, useState } from "react";
import EditDetailedBook from "./EditDetailedBook";
import { useNavigate, useParams } from "react-router-dom";

function DetailedBook({ isAdmin, user }) {
    const [bookInfo, setBookInfo] = useState(null);
    const [isAddReviewPushed, setIsAddReviewPushed] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rate, setRate] = useState(0);
    const [averageRate, setAverageRate] = useState(null);
    const [missingRate, setMissingRate] = useState(false)


    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const { id } = useParams();

    async function addReview(bookId, review) {
        if (review.rate > 0) {
            setMissingRate(false)
            const response = await fetch(`/api/books/${bookId}/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review)
            })
            console.log(response);
            setIsAddReviewPushed(false);
            setReviewText('')
        } else { setMissingRate(true) }
    }

    async function handleAddReview(e) {
        e.preventDefault();
        await addReview(bookInfo.bookId, { reviewText, rate })
        await fetchBookInfo();

    }

    function getAverageRate(reviews) {
        console.log(reviews);
        const average = Math.round(reviews.reduce((rateSum, review) => isNaN(review.rate) ? rateSum : rateSum + review.rate, 0) / reviews.length);
        setAverageRate(average)
    }


    useEffect(() => {
        fetchBookInfo()
            .then((book) => {
                setBookInfo(book)
                getAverageRate(book.reviews)
                setLoading(false)
            })
    }, [])

    async function fetchBookInfo() {
        const res = await fetch(`/api/book/${id}`);
        return await res.json();
        
    }

    if (loading) {
        return "Loading..."
    }

    return ((bookInfo &&
        (isAdmin
            ? <EditDetailedBook onBack={navigate(-1)} bookinfo={bookInfo}></EditDetailedBook>
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
                    {user
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
                            </form> :
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
                    <button onClick={() => { navigate(-1) }}>Back</button>
                </div>
            </>
        ))
    )
}
export default DetailedBook;