import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import BookList from "./components/BookList"



function LibraryPage({ user, isAdmin }) {
    const [filterValue, setFilterValue] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false)
    const [filteredList, setFilteredList] = useState('');
    const [list, setList] = useState('');

    function handleFilter(filter) {
        async function fetchFilteredList() {
            const response = await fetch(`/api/books/all?filter=${filter}`);
            const filteredBooks = await response.json();
            setFilteredList(filteredBooks);
        }
        fetchFilteredList()
        setIsFiltered(true)
    }

    /* useEffect(() => {
        async function fetchFilteredList() {
            const response = await fetch(`/api/books/all?filter=${filterValue}`);
            const filteredBooks = await response.json();
            setFilteredList(filteredBooks);
        }
        fetchFilteredList()
    }, [filterValue]) */

    useEffect(() => {
        async function fetchList() {
            const response = await fetch("/api/books/all");
            const books = await response.json();
            setList(books);
        }
        fetchList();
    }, [])

    return (
        <>
            <div className="menu-bar">
                <Filter onFilter={handleFilter} />
            </div>
            {isFiltered ?
                <div className="content">
                    <BookList pageType={'Library'} user={user} isAdmin={isAdmin} books={filteredList} />
                </div>
                :
                <div className="content">
                {console.log('kacsa')}
                    <BookList pageType={'Library'} user={user} isAdmin={isAdmin} books={list} />
                </div>
            }

        </>
    )
}
export default LibraryPage