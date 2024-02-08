import { useState } from 'react'

import ItemList from './components/ItemList.jsx'
import './App.css'


function App() {
  
  const [collectedBooks, setCollectedBooks] = useState([]);

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
  
  const [siteType, setSiteType] = useState('library');
  return (
    <>
      <div className="parent">
        <header className="header">
          <div className='header-title'>The Cult of Stories</div>
          <button className='header-item'>Library</button>
          <button className='header-item'>Collection</button>
          <button className='header-item'>Log In</button>
        </header>

        {siteType === 'library' ? (
          <>
            <div className='menu-bar'>
              <h3>Filters</h3>
            </div>
            <div className="content"><ItemList></ItemList></div>
          </>

        ) : siteType === 'collection' ? (
          <>
            <div className='menu-bar'>
              <h3>Filters</h3>
            </div>
            <div className="content"><ItemList></ItemList></div>
          </>

        ) : siteType === 'admin' ? (
          <>
            <div className='menu-bar'>
              <h3>Filters</h3>
            </div>
            <div className="content"><ItemList></ItemList></div>
          </>
        ) : (
          <><div style={{'text-align': 'center'}}><h1>Something went wrong! Please refresh the site</h1></div></>
        )}


      </div>
    </>
  )
}

export default App
