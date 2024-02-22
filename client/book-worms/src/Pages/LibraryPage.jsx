import { useEffect, useState } from "react"
import Filter from "../components/Filter"
import BookList from "../components/BookList"



function LibraryPage({ user, isAdmin }) {
    const [isFiltered, setIsFiltered] = useState(false)
    const [filteredList, setFilteredList] = useState('');
    const [list, setList] = useState('');

    useEffect(() => {
        async function fetchList() {
            const response = await fetch("/api/books/all");
            const books = await response.json();
            setList(books);
        }
        fetchList();
    }, [])

    function handleFilter(filteredBooks) {
        setFilteredList(filteredBooks);
        setIsFiltered(true)
    }

    function handleClearFilter(){
        setIsFiltered(false);
    }

    return (
        <>
            <div className="menu-bar">
                <Filter onFilter={handleFilter} onClear={handleClearFilter} />
            </div>
            {isFiltered ?
                <div className="content">
                    <BookList pageType={'library'} user={user} isAdmin={isAdmin} books={filteredList} />
                </div>
                :
                <div className="content">
                    <BookList pageType={'library'} user={user} isAdmin={isAdmin} books={list} />
                </div>
            }

        </>
    )
}
export default LibraryPage