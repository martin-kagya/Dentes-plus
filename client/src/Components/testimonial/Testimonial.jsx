import { useState, useEffect } from 'react'
import React from 'react'
import styles from './Testimonial.module.css'

function Testimonial(){
    let [counter, setCounter] = useState(0)
    const [animationClass, setAnimationClass] = useState(styles.testimonialAnimation)

    const testimonialTexts = [
        { person: "Jesse Doe", text: "My dental health has never been better" },
        { person: "Runny Smith", text: "I love the way they work, they are so professional" },
        { person: "Shankara Thomas", text: "Appointment booking is so easy" },
        { person: "Seedorf Lamar", text: "Affordable products in their shops" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationClass('') // Reset animation class
            setTimeout(() => {
                setCounter(counter => (counter + 1) % testimonialTexts.length)
                setAnimationClass(styles.testimonialAnimation) // Reapply animation class
            }, 100); // Brief delay to allow the reset
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    function showTestimonial(){
        return (
            <div key={counter} className={`${styles.testimonial} ${animationClass}`} id="testimonial">
                <h3 className={styles.testimonialTexts}>{testimonialTexts[counter].text}</h3>
                <p className={styles.testimonialPerson}>- {testimonialTexts[counter].person}</p>
            </div>
        )
    }

    return (
        <div className={styles.testimonialContainer}>
            {showTestimonial()}
        </div>
    );
}

export default Testimonial;
