import React, { useState, useRef } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import axios from 'axios'
import logo from "/images/undraw_medicine_b-1-ol.svg";
import styles from "./Login.module.css";
import Button from "../button/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("")
  const passwordRef = useRef();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleEmailChange(e) {
    const newUsername = e.target.value;
    setUsername(newUsername);
  }

  function handleSubmit(e){
    e.preventDefault()
    axios.post("http://127.0.0.1:8000/account/login/", {
      username: username,
      password: password
    },
    {
      withCredentials: true,
    }
  )
    
    .then((response) => {
      console.log(response)
    })
  }


  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <form id="form" onSubmit={handleSubmit}>
      <div className={styles.userBox}>
            <input
              type="text"
              required
              value={username}
              onChange={handleEmailChange}
            /><label>USERNAME</label>
            <p style={{color: 'red'}}>{emailError}</p>
        </div>
        <div className={styles.userBox}>
          <input
            type="password"
            ref={passwordRef}
            className={styles.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><label>PASSWORD</label>
          <span className={styles.eyelid} onClick={togglePasswordVisibility}>
            {showPassword ? <PiEye /> : <PiEyeClosed />}
          </span>
        </div>
        <Button text="Login" />
      </form>
    </div>
  );
}
