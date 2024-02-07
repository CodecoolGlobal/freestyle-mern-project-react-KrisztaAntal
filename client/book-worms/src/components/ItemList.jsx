import Book from "./Book"
const dummyList = [
    {
        BookId: "123asd",
        Title: "Title",
        Author: "Author",
        Genre: "Genre",
        BookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        DeatailURL: "url",
        Reviews: [{
            Rating: 5,
            Comment: String,
            Commenter: String
        }]

    },
    {
        BookId: "123asd",
        Title: "Title",
        Author: "Author",
        Genre: "Genre",
        BookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        DeatailURL: "url",
        Reviews: [{
            Rating: 5,
            Comment: String,
            Commenter: String
        }]

    },
    {
        BookId: "123asd",
        Title: "Title",
        Author: "Author",
        Genre: "Genre",
        BookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        DeatailURL: "url",
        Reviews: [{
            Rating: 5,
            Comment: String,
            Commenter: String
        }]

    },
    {
        BookId: "123asd",
        Title: "Title",
        Author: "Author",
        Genre: "Genre",
        BookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        DeatailURL: "url",
        Reviews: [{
            Rating: 5,
            Comment: String,
            Commenter: String
        }]

    },
    {
        BookId: "123asd",
        Title: "Title",
        Author: "Author",
        Genre: "Genre",
        BookImage: "http://books.google.com/books/publisher/content?id=9ledDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73AiLcLimkzA5YufMHUJbVEJunnGCdSCNYj7ZMh9lHoy8VzKIWnro-WQ1C9_W9PWZW4dh2JSo1FSwGDiCY26PQddyv2kGaBaTsrKlkGdb8ydlapn-VKM8i9J3XQ6nuTAakaM3Zc&source=gbs_api",
        DeatailURL: "url",
        Reviews: [{
            Rating: 5,
            Comment: String,
            Commenter: String
        }]

    },
];

function ItemList(/*props*/) {

    //const bookItemtype = props.itemType;
    const bookItemtype = "store";
    const list = dummyList;

    return (
        <div className="item-list-root">
            {list.map((a, index) =>
                <Book book={a} key={index} bookItemtype={bookItemtype}></Book>
            )}
        </div>)
}
// 
export default ItemList;