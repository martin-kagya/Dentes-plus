import React from "react";
import styles from './Button.module.css'

function Button({ text, handle }) {
    return (
        <button onSubmit={handle} className={styles.buttons}>{text}</button>
    )
}

export default Button;