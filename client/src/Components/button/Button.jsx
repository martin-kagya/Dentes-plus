import React from "react";
import styles from './Button.module.css'

function Button({ text, handle, enabled }) {
    
    return (
        <button onSubmit={handle} disabled={enabled} className={styles.buttons}>{text}</button>
    )
}

export default Button;