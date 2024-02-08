import { useState, useEffect } from "react";
import Book from "./Book"
import DetailedBook from "./DetailedBook";

function ItemList({ isLoggedIn, isAdmin, onShowDetails, onBack, fetchList, bookItemtype }) {
    const [showDetails, setShowDetails] = useState(false);
    const [chosenBook, setChosenBook] = useState(null);
    const [list, setList] = useState();
    const fetcher = fetchList;


    useEffect(() => {
        async function fetchList() {
            try {
                const data = await fetcher()
                setList(data);
            } catch (error) {
                console.log("error: " + error);
            }
        }
        fetchList();
    }, ([]))

    return (
        <div className="item-list-root">
            {list ?
                (
                    list.map((book) =>
                        <Book onShowDetails={onShowDetails}
                            isLoggedIn={isLoggedIn}
                            isAdmin={isAdmin} book={book} key={book.bookId}
                            bookItemtype={bookItemtype}>
                        </Book>)
                ) : (
                    <h1>Loading...</h1>
                )}

        </div>)
}
// 
export default ItemList;