import React, { useState, useEffect } from "react";
import styles from './Menu.module.css';
import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  closed: {
    
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5
    }
  }
};


function Menu({clicked}) {
 const items = ['home', 'about', 'login', 'contact', 'services'];
 
  return (
    <div>
      <motion.ul className={styles.menu}
        style={{display: clicked ? 'flex' : 'none'}}
        variants={variants} 
        animate={clicked ? 'open' : 'closed'}>
        {items.map((item, i) => (
          <motion.li
            key={i}
            className={styles.menuItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default Menu;
