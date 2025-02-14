import { useEffect, useState } from 'react';
import './App.css';
import {auth, db} from './Config/firebase'
import {getDocs, collection, query, where} from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom';
import RoutesDefine from './Components/routes';
import {onAuthStateChanged, signOut} from 'firebase/auth'

function App() {
  const [user, setUser]=useState(null);
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (currentuser)=>{
      setUser(currentuser);
    })
    return ()=>unsubscribe();
  }, [])
  const [currentuserrole, setCurrentuserrole]=useState("");
  const GetCurrentUserRole=async ()=>{
    if (user)
    {
      const currentuser=auth.currentUser;
      const userid=currentuser.uid;
      const RolesRef=collection(db, "Roles");
      const q=query(RolesRef, where("UserID", "==", userid));
      const qsnapshot=await getDocs(q);
      if (!qsnapshot.empty)
      {
        const userdoc=qsnapshot.docs[0];
        setCurrentuserrole(userdoc.data().Role);
      }
      else setCurrentuserrole("");
    }
  }
  useEffect(()=>{
    GetCurrentUserRole();
  }, [user])
  const navigate=useNavigate();
  const HandleLogOut=async ()=>{
    try {
      await signOut(auth);
      navigate("/");
    }
    catch(err) {
      console.log(err);
    }
  }
  return (
    <div className='App'>
      <nav>
        <a href="/" className="logo">OVERREAD</a>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          {user?
          (
            <>
              <li><Link to="account">Your Account</Link></li>
              <li><button onClick={HandleLogOut} className="logout-btn">Log Out</button></li>
              {
                currentuserrole=="Admin"? (
                  <ul>
                    <li><Link to="/add-new-novel">Add New Novel</Link></li>
                    <li><Link to="/add-new-volume">Add New Volume</Link></li>
                    <li><Link to="/delete">Delete Novel Or Volume</Link></li>
                  </ul>
                ) : (
                  <></>
                )
              }
            </>
          ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/login">Log In</Link></li>
            </>
          )}
        </ul>
      </nav>
      <RoutesDefine/>
    </div>
  );
}

export default App;