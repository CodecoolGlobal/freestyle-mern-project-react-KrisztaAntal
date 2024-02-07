import { useState } from "react";

function EditDetailedBook({ book }) {
    const [imgLink, setImgLink] = useState(book.imgLink);
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [category, setCategory] = useState(book.category);
    const [pubYear, setPubYear] = useState(book.pubYear);
    const [description, setDescription] = useState(book.description);
    const [reviews, setReviews] = useState(book.reviews);
    const [update, setUpdate] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`${apiLink}`, {
            method: 'PATCH',
            headers: { 'Contetnt-Type': 'application/json' },
            body: JSON.stringify(update)
        })
        const updatedBook = await res.json();
        console.log(updatedBook);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>ImageLink:
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
            <label>Title:
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
            <label>Author:
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
            <label>Category:
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
            <label>Published at:
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
            <label>Description:
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
            <label>Reviews:
                <input
                    type="text"
                    name="reviews"
                    value={reviews}
                    onChange={
                        (e) => {
                            setReviews(e.target.value);
                            setUpdate({ ...update, [e.target.name]: e.target.value })
                        }
                    }>
                </input>
            </label>
        </form>
    )
}
export default EditDetailedBook;