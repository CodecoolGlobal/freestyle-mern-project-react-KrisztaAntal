import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import BookList from "./components/BookList"



function Library({ user, isAdmin }) {
    const [filterValue, setFilterValue] = useState('');
    const [filteredList, setFilteredList] = useState('');
    const [list, setList] = useState('');

    function handleFilter(filter) {
        setFilterValue(filter)
    }

    useEffect(() => {
        async function fetchFilteredList() {
            const response = await fetch(`/api/books/all?filter=Robot`);
            const filteredBooks = response.json();
            setFilteredList(filteredBooks);
        }
        fetchFilteredList()
    }, [filterValue])

    useEffect(() => {
        async function fetchList() {
            const response = await fetch("/api/books/all");
            const books = response.json();
            setList(books);
        }
        fetchList();
    }, [])

    return (
        <>
            <div className="menu-bar">
                {console.log('kacsa')}
                <Filter onFilter={handleFilter} />
            </div>
            {/* {filterValue ? <div className="content">
                <BookList list={filteredList} />
            </div>
                :
                <div className="content">
                    <BookList list={list} />
                </div>
            } */}

        </>
    )
}
export default Library