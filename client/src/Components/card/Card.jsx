import React from "react";
import styles from './Card.module.css'

function Card({title, content}){
    return(
        <div className={styles.container}>
            <div className={styles.inner}>
                <p className={styles.title}>
                    {title}
                </p>
                <p className={styles.content}>
                    {content}
                </p>
            </div>
        </div>
            
    )
}

export default Card;