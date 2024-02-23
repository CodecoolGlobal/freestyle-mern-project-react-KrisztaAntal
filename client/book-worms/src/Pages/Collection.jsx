import { useEffect, useState } from "react";
import BookList from "../components/BookList";

const fetchCollectedBooks = (userId) => {
    return fetch(`/api/users/${userId}/collected`).then((res) => res.json());
}

function UserPage({ pageType, user, isAdmin }) {
    const [collected, setCollected] = useState([])

    useEffect(() => {
        fetchCollectedBooks(user._id)
            .then((collected) => {
                setCollected(collected)
            })
    }, [user])



    return (
        <>
            <BookList
                books={collected}
                pageType={pageType}
                isAdmin={isAdmin}
                user={user}
            />
        </>
    );
}

export default UserPage;