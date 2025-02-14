import React, { useState } from 'react';
import { auth, googleauthprovider } from '../Config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../AppUI/signin.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [signinemail, setSigninemail] = useState("");
    const [signinpassword, setSigninpassword] = useState("");
    const navigate=useNavigate();
    const NormalSignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, signinemail, signinpassword);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    const GoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleauthprovider);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <input 
                type="email" 
                placeholder="Your Email..." 
                onChange={(e) => setSigninemail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Your Password..." 
                onChange={(e) => setSigninpassword(e.target.value)} 
            />
            <button className="normal-signin" onClick={NormalSignIn}>Sign in</button>
            <button className="google-signin" onClick={GoogleSignIn}>Log in with Google</button>
        </div>
    );
}
