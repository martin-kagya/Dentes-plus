import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdMenu } from 'react-icons/io';
import styles from './Hamburger.module.css';
import { motion } from "framer-motion";



function Hamburger({ clicked}) {
  const icon = clicked ? (
    <RxCross2 size={45} color="black" />
  ) : (
    <IoMdMenu className={styles.IoMenu} size={45} color="black" />
  );

  return (
    <div className={styles.icon}>{icon}</div>   
  );
}

export default Hamburger;
