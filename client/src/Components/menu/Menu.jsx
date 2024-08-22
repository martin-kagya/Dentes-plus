import React, {useState, useEffect} from "react";
import styles from './Menu.module.css';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { useAuth } from "../AuthProvider";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

function Menu({ clicked, closeMenu }) {
  const { user, logout, username } = useAuth();
  const firstLetter = username ? username['username'].charAt(0).toUpperCase() : '';
  const [status, setStatus] = useState('')
  const location = useLocation();
  const navigate = useNavigate();

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
  useEffect(() => {
    user?.isAuthenticated ? setStatus(username) : setStatus("Login")
    console.log(status)
  }, [username])
  const handleClick = (item) => {
    closeMenu();
    if (location.pathname === '/' && item.location !== '/') {
      // Scroll to section if on the same page
      scroller.scrollTo(item.location, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    } else {
      // Navigate to the page if not on the home page
      navigate(item.location);
    }
  };

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
            <p className={styles.menuButton} onClick={() => handleClick(item)}>
              {item.name}
            </p>
          </motion.li>
        ))}
        {user?.isAuthenticated ? (
          <motion.li
            className={styles.menuItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              logout();
              closeMenu();
            }}
          >
          </motion.li>
        ) : (
          <motion.li
            className={styles.menuItem}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login" onClick={closeMenu} className={styles.login}>{status}</Link>
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}

export default Menu;
