import { useState } from 'react'
import ItemList from './components/ItemList.jsx'
import './App.css'

function App() {
  const [siteType, setSiteType] = useState('store');
  return (
    <>
      <div className="parent">
        <header className="header">
          <div className='header-title'>Boooook site</div>
          <button className='header-item'>menu1</button>
          <button className='header-item'>menu2</button>
          <button className='header-item'>menu3</button>
        </header>

        {siteType === 'store' ? (
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
