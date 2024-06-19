import React, { useEffect, useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { animate, delay, motion } from 'framer-motion'
import styles from './Services.module.css'

function Services() {
    const fadeIn = {
        initial: {
            opacity: 0,
            y: 80
        },
        animate: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.05 * index,
                duration: 1
            }
        })
    }
    const services = [{
        id: 1,
        name: 'EXTRACTION',
        img: '/Dentist Project/caroline-lm-8BkF0sTC6Uo-unsplash.jpg',
    },
    {
        id: 2,
        name: 'IMPLANTS',
        img: '/Dentist Project/nhia-moua-jQYofLnS0TI-unsplash.jpg',
    },
    {
        id: 3,
        name: 'SHOP WITH US',
        img: '/Dentist Project/candid-WFsNCIn8OF4-unsplash.jpg',
    
    }
]

const servicesList = services.map(service => 
    <motion.li key={service.id} className={styles.polaroid}
        variants={fadeIn}
        initial='initial'
        whileInView='animate'
        viewport={{
            once: false
        }}
        custom={ service.id }
    >
        <img className={styles.img} src={service.img} alt={service.name} />
        <p className={styles.para}>{service.name} <span className={styles.icon}><IoMdArrowForward size={30}/></span></p>
    </motion.li>   
)
    return (
        <div className={styles.container}>
            <h2>Services</h2>
                <ul className={styles.services}>{servicesList}</ul>
        </div>
    );
}

export default Services;