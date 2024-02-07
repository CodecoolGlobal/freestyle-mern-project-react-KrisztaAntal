//import { useState } from 'react'
import ItemList from './components/ItemList.jsx'
import './App.css'

function App() {
  return (
    <>
      {
        <div className="parent">
          <header className="header">
            <div className='header-title'>Boooook site</div>
            <div className='header-item'>menu1</div>
            <div className='header-item'>menu2</div>
            <div className='header-item'>menu3</div>
          </header>
          <div className='menu-bar'>
  
          </div>
          <div className="content"><ItemList></ItemList></div>
        </div>
      }
    </>
  )
}

export default App
