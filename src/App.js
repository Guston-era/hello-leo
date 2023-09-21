import { useSelector } from 'react-redux'
import './App.css'
import { selectToys } from './redux_setup/slices/toysSlice'
import { useState } from 'react'
import { selectUser } from './redux_setup/slices/userSlice'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import HomeIntro from './HomeIntro'

function App() {
  const user = useSelector(selectUser)

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<HomeIntro />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default App
