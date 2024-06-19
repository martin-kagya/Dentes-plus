import { useRef, useEffect, useState } from 'react'
import Hero from './Components/hero/Hero'
import Menu from './Components/menu/Menu'
import About from './Components/about/About'
import Login from './Components/login/Login'
import Hamburger from './Components/hamburger/Hamburger'

import './styles/global.css'
import Procedure from './Components/procedure/Procedure'
import {  Route, Routes } from 'react-router-dom'


function App() {
  const [clicked, setClicked] = useState(false)
  const toggleClick = () => {
    setClicked(prev => !prev)
    console.log(clicked)
  }
  
  return (
    <>
      <div onClick={toggleClick}>
         <Hamburger clicked={clicked}/>
      </div>
      <Menu clicked={clicked}/>
      <div>
        <Routes>
          <Route path='/' Component={Hero}/>
          <Route path='/login' Component={Login}/>
        </Routes>
        <About />
        <Procedure />
      </div>
    </>
  )
}

export default App
