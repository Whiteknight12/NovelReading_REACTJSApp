import { collection, getDocs, query, where } from 'firebase/firestore'
import {db, auth} from '../Config/firebase'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import '../AppUI/partdetail.css'
import { onAuthStateChanged } from 'firebase/auth';

export default function Partdetail() {
    const {part}=useParams();
    const [user, setUser]=useState(null);
    const [role, setRole]=useState("");
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentuser)=>{
            setUser(currentuser);
        })
        return ()=>unsubscribe();
    }, [])
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
                setRole(userdoc.data().Role);
            }
            else setRole("");
        }
    }
    useEffect(()=>{
        GetCurrentUserRole();
    }, [user])
    const navigate=useNavigate();
    const [content, setContent]=useState("");
    const [volid, setVolid]=useState("");
    const decodedpart=decodeURIComponent(part);
    const volumescollectionref=collection(db, "Volumes");
    const GetVolumeContent=async ()=>{
        const q=query(volumescollectionref, where("Part", "==", decodedpart));
        const qsnapshot=await getDocs(q);
        if (!qsnapshot.empty)
        {
            setContent(qsnapshot.docs[0].data().Content);
            setVolid(qsnapshot.docs[0].id);
        }
    }
    useEffect(()=>{
        GetVolumeContent();
    }, [])
    return (
        <div className="partdetail-container">
            <h1 className="partdetail-title">{decodedpart}</h1>
            <pre className="partdetail-content">{content}</pre>
            {(user && role=="Admin")? (
                <button onClick={()=>navigate(`${volid}`)}>EDIT</button>
            ) : (
                <></>
            )}
            <Outlet/>
        </div>
    )
}
