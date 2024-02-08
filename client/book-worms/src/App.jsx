
import { useState } from 'react'

import ItemList from './components/ItemList.jsx'
import './App.css'
import DetailedBook from './components/DetailedBook'


function App() {  

  const [siteType, setSiteType] = useState('library');
  const [collectedBooks, setCollectedBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [chosenBook, setChosenBook] = useState(null)


  function handleShowDetails(book) {
    setShowDetails(true);
    setChosenBook(book);
  }

  function handleBack(){
    setShowDetails(false);
  }

  const handleAddToCollectClick = async (book, name, isRead, isFavorite) => {
    const title = book.volumeInfo.title;
    const bookId = book.volumeInfo.bookId;
    const selfLink = book.selfLink

    try {
      const response = await fetch('/api/addToCollection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, bookId, title, isRead, isFavorite, selfLink })
      });
      setCollectedBooks(response)
      console.log(response)
    } catch (error) {
      console.error('Error adding book to collection:', error);
    }
  };

  async function fetchAllBooks(){
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
          <button className='header-item'>Log In</button>
        </header>
        <>
          {showDetails ?
            <DetailedBook book={chosenBook} isAdmin={isAdmin} isLoggedIn={isLoggedIn} onBack={handleBack}></DetailedBook> :

            siteType === 'library' ? (
              <>
                <div className='menu-bar'>
                  <h3>Filters</h3>
                </div>
                <div className="content"><ItemList fetchList={fetchAllBooks} bookItemtype={siteType} onShowDetails={handleShowDetails} isLoggedIn={isLoggedIn} isAdmin={isAdmin}></ItemList></div>
              </>

            ) : siteType === 'collection' ? (
              <>
                <div className='menu-bar'>
                  <h3>Filters</h3>
                </div>
                <div className="content"><ItemList onBack={handleBack} onShowDetails={handleShowDetails} isLoggedIn={isLoggedIn} isAdmin={isAdmin}></ItemList></div>
              </>

            ) : siteType === 'admin' ? (
              <>
                <div className='menu-bar'>
                  <h3>Filters</h3>
                </div>
                <div className="content"><ItemList onBack={handleBack} onShowDetails={handleShowDetails} isLoggedIn={isLoggedIn} isAdmin={isAdmin}></ItemList></div>
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
