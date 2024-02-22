import { useEffect, useState } from "react";
import BookList from "../components/BookList";

const fetchCollectedBooks = (userId) => {
    return fetch(`/api/users/${userId}/collected`).then((res) => res.json());
}

function UserPage({ pageType, user, isAdmin }) {
    // const [isChecked, setIsChecked] = useState(false);
    // const [currentPageCount, setCurrentPageCount] = useState(0);
    // const [pageCount, setPageCount] = useState(0);
    const [collected, setCollected] = useState([])

    // const handleCheckboxChange = async () => {
    //     setIsChecked(!isChecked);
    //     try {
    //         const response = await fetch(`/api/updateUsersBook/${user._id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ isRead: !isChecked }),
    //         });
    //         const responseData = await response.json();
    //         setIsChecked(responseData);
    //     } catch (error) {
    //         console.error("Error updating checkbox status:", error);
    //     }
    // };

    // const handlePageChange = (event) => {
    //     setCurrentPageCount(parseInt(event.target.value));
    // };

    // const calculateProgress = () => {
    //     if (pageCount === 0) return 0;
    //     return Math.round((currentPageCount / pageCount) * 100);
    // };

    useEffect(() => {
        fetchCollectedBooks(user._id)
            .then((collected) => {
                setCollected(collected)
                console.log(collected);
            })
    }, [user])



    return (
        <div>
            <BookList
                books={collected}
                pageType={pageType}
                isAdmin={isAdmin}
                user={user}
            />
            {/* <label>
                I have read it:
                <input
                    type="checkbox"
                    name="myCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </label>
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
                <label>Total Pages: {pageCount}</label>
            </div>
            <div>
                <label>Reading Progress: {calculateProgress()}%</label>
            </div> */}
        </div>
    );
}

export default UserPage;