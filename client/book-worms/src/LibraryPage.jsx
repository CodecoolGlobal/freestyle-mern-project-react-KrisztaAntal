import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import ItemList from "./components/ItemList"



function LibraryPage() {
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
            <Filter onFilter={handleFilter} />
            {filterValue ?
                <ItemList list={filteredList} />
                :
                <ItemList list={list} />}

        </>
    )
}
export default LibraryPage