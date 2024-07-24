import React from "react";
import styles from './Menu.module.css';
import { Link as ScrollLink } from 'react-scroll';
import { useAuth } from "../AuthProvider";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
    },
  },
};

function Menu({ clicked }) {
  const { user, logout } = useAuth();

  const items = [
    {
      name: 'home',
      location: '/',
      id: 1,
    },
    {
      name: 'contact',
      location: 'contact',
      id: 2,
    },
    {
      name: 'services',
      location: 'services',
      id: 3,
    },
    {
      name: 'about',
      location: 'about',
      id: 4,
    },
    {
      name: '',
      location: 'cart',
      id: 5,
    },
  ];

  return (
    <div>
      <motion.ul
        className={styles.menu}
        style={{ display: clicked ? 'flex' : 'none' }}
        variants={variants}
        animate={clicked ? 'open' : 'closed'}
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            className={styles.menuItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ScrollLink to={item.location} smooth={true} duration={200} offset={-50}>
              {item.name}
            </ScrollLink>
          </motion.li>
        ))}
        {user?.isAuthenticated ? (
          <motion.li
            className={styles.menuItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
          >
            Logout
          </motion.li>
        ) : (
          <motion.li
            className={styles.menuItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login">Login</Link>
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}

export default Menu;
