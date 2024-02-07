import selfLinks1 from "./selfLinks.js"


async function fetchData() {
    const books = await Promise.all(selfLinks1.map(async (link, index) => {
        console.log(link, index);
        const response = await fetch(link)
        const data = await response.json()
        console.log(data.volumeInfo.title);
        const book = {
            title: data.volumeInfo.title ? data.volumeInfo.title : null,
            authors: data.volumeInfo.authors[0],
            genre: data.volumeInfo.categories,
            image: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : null,
            detailURL: data.selfLink
        }
        return book;
    }))
    console.log(books);
}
fetchData()


