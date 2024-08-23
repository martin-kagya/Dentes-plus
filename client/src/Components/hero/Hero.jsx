import React, { useContext } from "react";
import styles from './Hero.module.css'
import { useEffect, useState } from "react";
import About from '../about/About'
import { Link } from "react-router-dom";
import { useRef } from "react";
import Procedure from "../procedure/Procedure";
import Button from '../button/Button'
import Services from "../services/Services";
import { useAuth } from "../AuthProvider";
import Footer from "../footer/Footer"
import Testimonial from "../testimonial/Testimonial";
import Gallery from "../gallery/Gallery";

function Hero(){
    const ref = useRef(null)
    const {username, user} = useAuth()
    const [enable, setEnable] = useState(true)
    useEffect(() =>{
        const span = ref.current
        span.classList.add("hidden")
        setEnable(!user?.isAuthenticated)
        if(window.innerWidth > 768){
          document.querySelector('.nav').style.display = 'none'
          setClicked(true)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
          window.removeEventListener("scroll", handleScroll)
        }
    }, [username])
  const [clicked, setClicked] = useState(false)
  const [visible, setisVisible] = useState(false);

function handleScroll(){
  const amountScrolled = document.documentElement.scrollTop;
  setisVisible (amountScrolled > 100)
}


    return(
        <>
        <div ref={ref} className={styles.container}>
            <h1 style={{display: `${window.innerWidth > 768 ? 'none' : null}`}}>
              Your smile comes first
            </h1>
            <div className={styles.flexItem}>
                <img src="../dist/images/the-humble-co-cADflhZzgyo-unsplash.jpg" alt="toothbrush"/>
                <div className={styles.responsive}>
                {
                  user?.isAuthenticated ? (
                    <h1 style={{display: `${window.innerWidth < 768 ? 'none' : null}`}}>Welcome {username["username"]}</h1>
                  ) :
                  <h1 style={{display: `${window.innerWidth < 768 ? 'none' : null}`}}>Your smile comes first</h1>
                }
                    <div className={styles.heroPara}>
                        <p>Get the best dental care from our team of experts and professionals.
                            Our services are curated for every dental need you may have.
                            Sign up with Us <span>Now</span>
                        </p>
                    </div>
                    <div className={styles.button}>
                        <Link to="/SignUp"><Button text="Sign up" /></Link>
                        <Link to="/login"><Button text="LOGIN" /></Link>
                    </div>
                </div>
            </div>
        </div>
            <About />
            <Procedure />
            <Gallery />
            <Services />
            <Testimonial />
        <footer>
          <Footer />
        </footer>
        </>
    )
}
export default Hero;