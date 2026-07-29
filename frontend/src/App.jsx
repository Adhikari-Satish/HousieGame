import React, { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import Setting from './Setting.jsx'
import Forgot from './Forgot.jsx'
import Home from './Home.jsx'
import Register from './Register.jsx'
import Game from './Game.jsx'
import Game1 from './Game1.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('Home')
  const closeMenu = () => {setMenuOpen(false);};

  return (
    <BrowserRouter className="maii">
      <div className="header" style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            fontSize: '30px',
            background: 'none',
            paddingRight: '20px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
        <h3 style={{ fontSize: '24px', margin: 0 }}>Housie</h3>
      </div>

      {menuOpen && (
        <div className='sidebar'
          style={{
            // background: '#cac8c8',
            // paddingLeft: '20px',
            // paddingTop: '20px',
            width: '200px',
            borderRadius: '0px 0px 10px 10px',
            position: 'absolute',
          }}
        >
          <p style={{ cursor: 'pointer', position: 'relative' }}>
            <Link onClick={closeMenu} to="/profile">Profile</Link>
          </p>
          <p style={{ cursor: 'pointer', position: 'relative' }}>
            <Link onClick={closeMenu} to="/game1">Auto-gen</Link>
          </p>
          <p style={{ cursor: 'pointer', position: 'relative'}}>
            <Link onClick={closeMenu} to="/login">Login</Link>
          </p>
          <p style={{ cursor: 'pointer', position: 'relative'}}>
            <Link onClick={closeMenu} to="/register">Register</Link>
          </p>
          <p style={{ cursor: 'pointer', position: 'relative' }}>
            <Link onClick={closeMenu} to="/forgot">Forgot Password</Link>
          </p>
          {/* <p style={{ cursor: 'pointer', position: 'relative'}}>
            <Link to="/game">Game</Link>
          </p> */}
        </div>
      )}

      <div style={{ padding: '20px', marginBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game1" element={<Game1 />} />
        </Routes>
      </div>

      <div className='bottom-nav'
        // style={{
        //   position: 'fixed',
        //   bottom: 0,
        //   width: '100%',
        //   // background: '#cac8c8',
        //   // color: 'white',
        //   display: 'flex',
        //   cursor: 'pointer',
        //   justifyContent: 'space-around',
        //   // padding: '15px',
        // }}
      >
        <Link onClick={closeMenu} className='a' to="/">Home</Link>
        <Link onClick={closeMenu} to="/profile" >Profile</Link>
        {/* <Link to="/setting" >Setting</Link> */}
        <Link onClick={closeMenu} to="/register" >Register</Link>
        <Link onClick={closeMenu} to="/login">Login</Link>
      </div>
    </BrowserRouter>
  )
}

export default App
