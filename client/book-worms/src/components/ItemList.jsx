import { useState } from "react";
import Book from "./Book"
import DetailedBook from "./DetailedBook";
const dummyList = [
    {
        bookId: "123asdf",
        title: "Title",
        author: "Author",
        genre: "Genre",
        bookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        deatailURL: "url",
        reviews: [{
            rating: 5,
            comment: String,
            commenter: String
        }]

    },
    {
        bookId: "123asdg",
        title: "Title",
        author: "Author",
        genre: "Genre",
        bookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        deatailURL: "url",
        reviews: [{
            rating: 5,
            comment: String,
            commenter: String
        }]

    },
    {
        bookId: "123asdb",
        title: "Title",
        author: "Author",
        genre: "Genre",
        bookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        deatailURL: "url",
        reviews: [{
            rating: 5,
            comment: String,
            commenter: String
        }]

    },
    {
        bookId: "123asde",
        title: "Title",
        author: "Author",
        genre: "Genre",
        bookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        deatailURL: "url",
        reviews: [{
            rating: 5,
            comment: String,
            commenter: String
        }]

    },
    {
        bookId: "123asds",
        title: "Title",
        author: "Author",
        genre: "Genre",
        bookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        deatailURL: "url",
        reviews: [{
            rating: 5,
            comment: String,
            commenter: String
        }]

    },
];

function ItemList({ isLoggedIn, isAdmin, onShowDetails, onBack }) {
    const [showDetails, setShowDetails] = useState(false);
    const [chosenBook, setChosenBook] = useState(null)


    function handleShowDetails(book) {
        setShowDetails(true);
        setChosenBook(book);
    }

    //const bookItemtype = props.itemType;
    const bookItemtype = "library";
    const list = dummyList;

    return (
        <div className="item-list-root">
            {list.map((book) =>
                <Book onShowDetails={onShowDetails} isLoggedIn={isLoggedIn} isAdmin={isAdmin} book={book} key={book.bookId} bookItemtype={bookItemtype}></Book>
            )}
        </div>)
}
// 
export default ItemList;