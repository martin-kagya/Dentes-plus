import { useRef, useEffect, useState } from 'react'
import Hero from './Components/hero/Hero'
import Menu from './Components/menu/Menu'
import Services from './Components/services/Services'
import Login from './Components/login/Login'
import Hamburger from './Components/hamburger/Hamburger'
import Procedure from './Components/procedure/Procedure'
import './styles/global.css'
import {  Route, Routes } from 'react-router-dom'
import Shop from './Components/shop/Shop'
import SignUp from './Components/signup/SignUp'
import About from './Components/about/About'


function App() {
  const [clicked, setClicked] = useState(false)
  const toggleClick = () => {
    setClicked(prev => !prev)
    console.log(clicked)
  }
  useEffect(() => {
    if(window.innerWidth > 768){
      document.querySelector('.nav').style.display = 'none'
      setClicked(true)
    }
  }, [])
  return (
    <>
      <div onClick={toggleClick} className='nav'>
         <Hamburger clicked={clicked}/>
      </div>
        <Menu clicked={clicked}/>
      <div className='container'>
        <Routes>
          <Route path='/' Component={Hero}/>
          <Route path='/login' Component={Login}/>
          <Route path='/SignUp' Component={SignUp} />
          <Route path='/procedure' Component={Procedure}/>
          <Route path='/services' Component={Services} />
          <Route path='/about' Component={About} />
          <Route path='/shop' Component={Shop} />
        </Routes>
      </div>
    </>
  )
}

export default App
