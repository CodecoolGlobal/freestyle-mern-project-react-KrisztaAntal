import { useEffect, useState } from "react";
import Book from "./Book"

function ItemList(props) {

    const fetcher = props.fetchList;

    const [list, setList] = useState();

    useEffect(()=>{
        async function fetchList(){
            try {
                const data = await fetcher()
                setList(data);
            } catch (error) {
                console.log("error: "+error);
            }
        }
        fetchList();
    }, ([]))

    const bookItemtype = props.bookItemtype;
    return (
        <div className="item-list-root">
            {list ? (
                list.map((a, index) =>
                    <Book book={a} key={index} bookItemtype={bookItemtype}></Book>
                )
            ):(
                <h1>Loading...</h1>
            )}

        </div>)
}
// 
export default ItemList;