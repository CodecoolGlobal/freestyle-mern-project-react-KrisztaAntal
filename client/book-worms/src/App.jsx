
import { useState } from 'react'
import ItemList from './components/ItemList.jsx'
import './App.css'
import DetailedBook from './components/DetailedBook'
import { Link } from "react-router-dom";
import Filter from './components/Filter.jsx';


function App() {

  const [siteType, setSiteType] = useState('library');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [chosenBook, setChosenBook] = useState(null);
  const [user, setUser] = useState('Stranger')


  function handleShowDetails(book) {
    setShowDetails(true);
    setChosenBook(book);
  }

  function handleBack() {
    setShowDetails(false);
  }

  async function fetchAllBooks() {
    const response = await fetch("/api/books/all");
    const data = await response.json();
    console.log(data);
    return data;
  }

  return (
    <>
      <div className="parent">
        <header className="header">
          <div className='header-title'>The Cult of Stories</div>
          <button className='header-item'>Library</button>
          <button className='header-item'>Collection</button>
          {/* <Link to={"/collection"}> */}
          <button className='header-item'>Collection</button>
          {/* </Link> */}
          {isLoggedIn ? <p>Hello, {user}!</p> :
            <button className='header-item'>Log In</button>}
        </header>
        <>
          {showDetails ?
            <DetailedBook
              book={chosenBook}
              isAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
              onBack={handleBack} /> :

            siteType === 'library' ? (
              <>
                <div className='menu-bar'>
                  <Filter />
                </div>
                <div className="content">
                  <ItemList
                    fetchList={fetchAllBooks}
                    bookItemtype={siteType}
                    onShowDetails={handleShowDetails}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin} />
                </div>
              </>

            ) : siteType === 'collection' ? (
              <>
                <div className='menu-bar'>
                  <h3>Filters</h3>
                </div>
                <div className="content">
                  <ItemList
                    onBack={handleBack}
                    onShowDetails={handleShowDetails}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin} />
                </div>
              </>

            ) : siteType === 'admin' ? (
              <>
                <div className='menu-bar'>
                  <h3>Filters</h3>
                </div>
                <div className="content">
                  <ItemList
                    onBack={handleBack}
                    onShowDetails={handleShowDetails}
                    isLoggedIn={isLoggedIn}
                    isAdmin={isAdmin} />
                </div>
              </>
            ) : (
              <><div style={{ 'text-align': 'center' }}><h1>Something went wrong! Please refresh the site</h1></div></>
            )
          }
        </>
      </div>
    </>
  )
}

export default App
