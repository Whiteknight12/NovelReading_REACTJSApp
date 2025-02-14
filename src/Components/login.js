import React, { useState } from 'react'
import {auth, googleauthprovider} from '../Config/firebase'
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import '../AppUI/login.css'

export default function Login() {
  const [loginemail, setLoginemail]=useState("");
  const [loginpassword, setLoginpassword]=useState("");
  const navigate=useNavigate();
  const NormalLogIn=async ()=>{
    try {
      await signInWithEmailAndPassword(auth, loginemail, loginpassword);
      navigate("/");
    }
    catch(err) {
      console.log(err);
    }
  }
  const GoogleLogIn=async ()=>{
    try {
      await signInWithPopup(auth, googleauthprovider);
      navigate("/");
    } 
    catch(err) {
      console.log(err);
    }
  }
  return (
    <div className="login-container">
            <h2>Log In</h2>
            <input 
                type="email" 
                placeholder="Your Email..." 
                onChange={(e) => setLoginemail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Your Password..." 
                onChange={(e) => setLoginpassword(e.target.value)} 
            />
            <button className="normal-login" onClick={NormalLogIn}>Log in</button>
            <button className="google-login" onClick={GoogleLogIn}>Log in with Google</button>
        </div>
  )
}
