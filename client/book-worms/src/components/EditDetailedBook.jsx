import { useState } from "react";

function EditDetailedBook({ bookinfo1, bookinfo2 }) {
    console.log(bookinfo1);
    const [imgLink, setImgLink] = useState(bookinfo1.BookImage);
    const [title, setTitle] = useState(bookinfo1.Title);
    const [author, setAuthor] = useState(bookinfo1.Author);
    const [category, setCategory] = useState(bookinfo1.Genre);
    const [pubYear, setPubYear] = useState(bookinfo2.publishedDate);
    const [description, setDescription] = useState(bookinfo2.description);
    const [update, setUpdate] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`/api/book/${bookinfo1.BookId}`, {
            method: 'PATCH',
            headers: { 'Contetnt-Type': 'application/json' },
            body: JSON.stringify(update)
        })
        const updatedBook = await res.json();
        console.log(updatedBook);
    }

    return (
        (bookinfo1 && bookinfo2) &&
        <form onSubmit={handleSubmit}>
            <label className="nowrap">ImageLink:&nbsp;
                <input
                    type="text"
                    name="imgLink"
                    value={imgLink}
                    onChange={
                        (e) => {
                            setImgLink(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
            <br></br>
            <label className="nowrap">Title:&nbsp;
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={
                        (e) => {
                            setTitle(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
            <br></br>
            <label className="nowrap">Author:&nbsp;
                <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={
                        (e) => {
                            setAuthor(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
            <br></br>
            <label className="nowrap">Category:&nbsp;
                <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={
                        (e) => {
                            setCategory(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
            <br></br>
            <label className="nowrap">Published at:&nbsp;
                <input
                    type="text"
                    name="pubYear"
                    value={pubYear}
                    onChange={
                        (e) => {
                            setPubYear(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
            <br></br>
            <label className="nowrap">Description:&nbsp;
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={
                        (e) => {
                            setDescription(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
            <br></br>
            <button type="submit">Edit</button>
        </form >
    )
}
export default EditDetailedBook;