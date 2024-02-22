
import { useState } from 'react'
import DetailedBook from './components/DetailedBook'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Library from "./Pages/Library.jsx"
import './App.css'
import Collection from "./Pages/Collection.jsx"

const fetchUsers = (name) => {
  return fetch(`/api/users/${name}`).then((res) => res.json())
}

function App() {
  const [isAdmin] = useState(false);
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("")

  const handleLogIn = (name) => {
    fetchUsers(name)
      .then((user) => {
        setUser(user)
        setUserName(name)
        console.log(user._id)
      })
  }

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
          {user ? (
            <div>
              <p>Hello, {userName}!</p>
              <button
                type='button'
                onClick={() => setUser('')}
              >Log Off</button>
            </div>) : (
            <div>
              <input
                type='text'
                placeholder='input your username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)} />
              <button
                className='header-item'
                onClick={() => handleLogIn(userName)}
              >Log In</button>
            </div>
          )}
        </header>


        <div className="content">
          <Routes>
            <Route path="/" element={<Library pageType="library" user={user} isAdmin={isAdmin} />} />
            <Route path="/collection" element={<Collection pageType="library" user={user} isAdmin={isAdmin} />} />
            <Route path="/book/details/:id" element={<DetailedBook user={user} isAdmin={isAdmin} />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
