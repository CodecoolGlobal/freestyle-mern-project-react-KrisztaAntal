**User Schema:**

    Name: String
    Books: Array, Object {
        BookName: String,
        BookId: String,
        IsRead: Boolean,
        IsFavorite: Boolean,
        ReadStatus: {
            PageCount: Integer (Book page count),
            CurrentPageCount: Integer
        }
        DetailLink: String,
    }


**Book Schema:**

    BookId: String,
    Title: String,
    Author: String,
    Genre: String,
    BookImage: String,
    Deatail URL: String,
    Reviews: Array, Object {
        Rating: Integer,
        Comment: String,
        Commenter: String
    }

**Features:**
Header: Logo, Books, Profile, Sign in, Admin

1. Main page:
Search bar
Books with less details: Title, Author, Img, Category, Button (Show details), Button (Add to collection)

2. User page
Search bar (checkboy: my books, all books)
Books with less details: Title, Author, Img, Category, Button (Show details), Button (Add to favorite)

3. Details page (isLoggedIn ? edit : logIn)
Book with more details from the detail link: Title, Author, Img, Category, description, pub year, reviews, Button (add a review)

3. Admin page
Search bar
Books with all details: Title, Author, Img, Category, Button (Edit, Delete)

**MongoDB:**
