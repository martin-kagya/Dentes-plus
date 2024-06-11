import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { motion } from 'framer-motion'
import styles from './About.module.css'
function About(){
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting)
        },
        {
            root:null,
            rootMargin:'0px',
            threshold:0.1
        })
        if(ref.current){
            observer.observe(ref.current)
        }
        return () => {
            if(ref.current){
                observer.unobserve(ref.current)
            }
        }
    })
    useEffect(() => {
        if (isVisible && ref.current) {
          ref.current.classList.add(styles.animate);

        }
      }, [isVisible]);
      const text = 'BEHIND EVERY SMILE, THERE IS TEETH'.split(' ')
    return(
        <div className={styles.container}>
            <img ref={ref} className={styles.image} src="/Dentist Project/A3.png"></img>
            <p className={styles.header}>
               {text.map((el, index) => {
                return(
                    <motion.span
                    className={styles.span}
                    key={index}
                    initial={{
                        opacity: 0,
                        x: -100,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 3
                        }
                    }}
                    viewport={{once: false}}
                    >
                    {el}{' '}
                    </motion.span>
                )
               })} 
            </p>
                
                <p className={styles.paragraph}>
                 Welcome to Dentes Plus, your go-to platform for booking dental appointments online.
                 With Dentes Plus, scheduling your next dentist visit is quick and effortless.
                 Browse through our network of trusted dentists, choose a convenient appointment slot,
                 and say hello to hassle-free dental care.
                 Start booking your appointments with ease on <motion.span
                    className={styles.Dentes}
                    initial={{
                        y: 100,
                    }}
                    whileInView={{
                        y: 0,
                        transition: {
                            duration: 3
                        }
                    }}
                    viewport={{once: false}}
                 >
                    Dentes Plus
                 </motion.span> today!
                </p>
        </div>
    )
}

export default About;