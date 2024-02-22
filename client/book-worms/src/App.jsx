
import { useState } from 'react'
import DetailedBook from './components/DetailedBook'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//import Library from "./Pages/Library.jsx"
import LibraryPage from './Pages/LibraryPage.jsx';
import './App.css'

function App() {

  const [isAdmin] = useState(false);
  const [user] = useState('Stranger')

  return (
    <Router>
      <div className="parent">
        <header className="header">
          <Link to={"/"}>
            <div className='header-title'>The Cult of Stories</div>
          </Link>
          <Link to={"/"}>
            <button className='header-item'>Library</button>
          </Link>
          <Link to={"/collection"}>
            <button className='header-item'>Collection</button>
          </Link>
          {user ? <p>Hello, {user}!</p> :
            <button className='header-item'>Log In</button>}
        </header>
          <Routes>
            <Route path="/" element={<LibraryPage user={user} isAdmin={isAdmin}/>} />
            <Route path="/collection" element={<h1>Its working</h1>} />
            <Route path="/book/details/:id" element={<DetailedBook user={user} isAdmin={isAdmin}/>} />
          </Routes>
      </div>
    </Router>
  )
}

export default App;
