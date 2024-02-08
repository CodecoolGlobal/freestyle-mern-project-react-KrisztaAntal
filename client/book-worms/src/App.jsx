import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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

  return (
    <div>
      <button onClick={handleAddToCollectClick}>Add to collection</button>
    </div>
  )
}

export default App
