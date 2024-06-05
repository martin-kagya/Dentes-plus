import React from "react";
import styles from './Login.module.css'
import Button from '../button/Button'

export default function Login(){
    return(
        <div className={styles.container}>
            <img src="/Dentist Project/undraw_medicine_b-1-ol.svg"></img>
            <form>
                <input type="text" placeholder="EMAIL" />
                <input type="password" placeholder="PASSWORD" />
                <Button text="Login" />
            </form>
        </div>
    )
}