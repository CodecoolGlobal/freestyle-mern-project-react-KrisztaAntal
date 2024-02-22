import { useState } from "react";
import ItemList from "./ItemList";

function Filter({onFilter}) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [length, setLength] = useState('');

    async function handleSearch(filterValue) {
        onFilter(filterValue);
        setTitle('');
        setAuthor('');
        setGenre('');
        setLength('');
    }


    return (
        <>
            <div>
                <label htmlFor="filterTitle">Filter by title:</label>
                <br />
                <input type="text" id="filterTitle" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button onClick={()=>handleSearch(title)}>Search</button>
                <br />
                <label htmlFor="filterAuthor">Filter by author</label>
                <br />
                <input type="text" id="filterAuthor" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <button onClick={()=>handleSearch(author)}>Search</button>
                <br />
                <label htmlFor="filterGenre">Filter by genre</label>
                <br />
                <input type="text" id="filterGenre" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                <button onClick={()=>handleSearch(genre)}>Search</button>
                <br />
                <label htmlFor="filterYear">Filter by publication year</label>
                <br />
                <input type="number" id="filterYear" name="year" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} />
                <button onClick={()=>handleSearch(year)}>Search</button>
                <br />
                <label htmlFor="filterYear">Filter by length</label>
                <br />
                <select name="bookLength" id="bookLength" value={length} onChange={(e) => setLength(e.target.value)}>
                    <option value="short">Short</option>
                    <option value="average">Average</option>
                    <option value="long">Long</option>
                </select>
                <button onClick={()=>handleSearch(length)}>Search</button>
                <br />
            </div>
        </>
    )
}
export default Filter;