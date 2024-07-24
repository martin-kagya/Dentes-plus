import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './Components/hero/Hero';
import Menu from './Components/menu/Menu';
import Services from './Components/services/Services';
import Login from './Components/login/Login';
import Hamburger from './Components/hamburger/Hamburger';
import Procedure from './Components/procedure/Procedure';
import Shop from './Components/shop/Shop';
import Appointment from './Components/appointment/Appointment'
import SignUp from './Components/signup/SignUp';
import About from './Components/about/About';
import PrivateRoutes from './Components/PrivateRoutes';
import LoginHero from './Components/loggedInPages/LoginHero';

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClick = () => {
    setClicked(prev => !prev);
  };
  useEffect(() => {
    if(window.innerWidth > 768){
      document.querySelector('.nav').style.display = 'none';
      setClicked(true);
    }
  }, []);
  
  return (
    <>
      <div onClick={toggleClick} className='nav'>
        <Hamburger clicked={clicked} />
      </div>
      <Menu clicked={clicked} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/procedure' element={<Procedure />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/shop' element={<Shop />} />
            <Route path="/Hero" element={<LoginHero />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
