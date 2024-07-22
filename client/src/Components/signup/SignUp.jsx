import React, { useState, useRef } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from "/images/undraw_medicine_b-1-ol.svg";
import styles from "./SignUp.module.css";
import Button from "../button/Button";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("")
  const passwordRef = useRef();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/account/signup/", {
      email: email,
      username: username,
      password: password
    },
  {
    withCredentials: true
  })
    .then((response) => {console.log(response)
      navigate('/login')
    }
  )
    .catch((error) => console.log(error))
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
              value={email}
              onChange={handleEmailChange}
            /><label>EMAIL</label>
            <p style={{color: 'red'}}>{emailError}</p>
        </div>
        <div className={styles.userBox}>
            <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>USERNAME</label>
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
        <Button text="Sign Up" />
      </form>
    </div>
  );
}
