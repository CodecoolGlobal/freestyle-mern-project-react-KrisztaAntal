import { useState } from "react";
//import ItemList from "./ItemList";

function Filter({ onFilter, onClear }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    function handleSearch() {
        let queryParams = "?"
        queryParams += title ? `&title=${title}` : ""
        queryParams += author ? `&author=${author}` : ""
        queryParams += genre ? `&genre=${genre}` : ""
        queryParams += year ? `&year=${year}` : ""
        async function fetchFilteredList() {
            const response = await fetch(`/api/books/all/filter${queryParams}`);
            const filteredBooks = await response.json();
            onFilter(filteredBooks)
        }
        fetchFilteredList();
        // setTitle('');
        // setAuthor('');
        // setGenre('');
        // setYear('');
    }


    return (
        <>
            <div>
                <label htmlFor="filterTitle">Filter by title:</label>
                <br />
                <input type="text" id="filterTitle" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                {/*  <br />
                <button onClick={() => handleSearch(['title', title])}>Search</button> */}
                <br />
                <label htmlFor="filterAuthor">Filter by author</label>
                <br />
                <input type="text" id="filterAuthor" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                {/* <br />
                <button onClick={() => handleSearch(['author', author])}>Search</button> */}
                <br />
                <label htmlFor="filterGenre">Filter by genre</label>
                <br />
                <input type="text" id="filterGenre" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                {/*  <br />
                <button onClick={() => handleSearch(['genre', genre])}>Search</button> */}
                <br />
                <label htmlFor="filterYear">Filter by publication year</label>
                <br />
                <input type="number" id="filterYear" name="year" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} />
                <br />
                <button onClick={() => handleSearch()}>Search</button>
                <br />
                <button onClick={() => {
                    setTitle('');
                    setAuthor('');
                    setGenre('');
                    setYear('');
                    onClear()
                }}>Clear filter</button>
            </div>
        </>
    )
}
export default Filter;