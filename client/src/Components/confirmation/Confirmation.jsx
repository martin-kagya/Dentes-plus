import React from "react";
import styles from './Confirmation.module.css'
import {motion} from 'framer-motion'
import { FaCheckCircle } from "react-icons/fa";
function Confirmation({isVisible, header, text}){
    return(
        <>
        <div className={styles.contain}>
            <motion.div
                className={styles.check}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isVisible ? 1 : 0,
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                <FaCheckCircle size={40} color="green" />
            </motion.div>
            <p className={styles.text}><span className={styles.booking}>{header}</span><br></br>
                {text}
            </p>
        </div>
        </>
  );
}
export default Confirmation