import { useState } from "react";

function EditDetailedBook({ bookinfo, onBack}) {
    console.log(bookinfo);
    const [imgLink, setImgLink] = useState(bookinfo.bookImage);
    const [title, setTitle] = useState(bookinfo.title);
    const [author, setAuthor] = useState(bookinfo.author);
    const [category, setCategory] = useState(bookinfo.genre);
    const [pubYear, setPubYear] = useState(bookinfo.year);
    const [description, setDescription] = useState(bookinfo.description);
    const [update, setUpdate] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`/api/book/${bookinfo.bookId}`, {
            method: 'PATCH',
            headers: { 'Contetnt-Type': 'application/json' },
            body: JSON.stringify(update)
        })
        const updatedBook = await res.json();
        console.log(updatedBook);
    }

    return (
        (bookinfo) && <>
            <div>
                <button onClick={()=>onBack()}>Back</button>
            </div>
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
        </>
    )
}
export default EditDetailedBook;