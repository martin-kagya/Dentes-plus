import React, {useState} from "react";
import axios from "axios";
import styles from './Login.module.css'
import Button from '../button/Button'

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8000/api/auth/login", {
            email: email,
            password: password,
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            window.location = "/home";
        }).catch((err) => {
            console.log(err);
        });
    }
    return(
        <div className={styles.container}>
            <img src="/Dentist Project/undraw_medicine_b-1-ol.svg"></img>
            <form id="form" onSubmit={handleSubmit}>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="EMAIL" />
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD" />
                <Button text="Login" />
            </form>
        </div>
    )
}