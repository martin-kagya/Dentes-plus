import React from "react";
import styles from './Hero.module.css'
import { useEffect } from "react";
import { useRef } from "react";
import Button from '../button/Button'

function Hero(){
    const ref = useRef(null)
    useEffect(() =>{
        const span = ref.current
        span.classList.add("hidden")
    })
    return(
        <div ref={ref} className={styles.container}>
            <h1>Your smile comes first</h1>
            <img src="/Dentist Project/the-humble-co-cADflhZzgyo-unsplash.jpg" alt="toothbrush" />
            <div className={styles.button}>
                <Button text="Sign up" />
                <Button text="LOGIN" />
            </div>
        </div>
    )
}
export default Hero;