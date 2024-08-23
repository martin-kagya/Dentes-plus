import React, { useEffect, useState } from "react";
import styles from './Confirmation.module.css';
import { motion } from 'framer-motion';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Confirmation({ isVisible, header, text }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isVisible) {
      // Start the countdown
      const countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      // Set the timeout to redirect after 5 seconds
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      // Cleanup the timeout and interval on unmount or if isVisible changes
      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [isVisible, navigate]);

  return (
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
      <p className={styles.text}>
        <span className={styles.booking}>{header}</span><br />
        {text}
      </p>
      {isVisible && (
        <p className={styles.redirectNotice}>
          You will be redirected to the home page in {countdown} seconds.
        </p>
      )}
    </div>
  );
}

export default Confirmation;
