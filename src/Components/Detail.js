import React, { useEffect, useState } from 'react'
import {db, auth} from '../Config/firebase'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../AppUI/detail.css'
import { onAuthStateChanged } from 'firebase/auth';

export default function Detail() {
    const navigate=useNavigate();
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
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);
    const novelcollectionref=collection(db, "Novels");
    const [novelauthor, setNovelauthor]=useState("");
    const [noveldate, setNoveldate]=useState("");
    const [novelstatus, setNovelstatus]=useState("");
    const [novelimgurl, setNovelimgurl]=useState("");
    const [novelsummary, setNovelsummary]=useState("");
    const [novelid, setNovelid]=useState("");
    const Getnoveldata=async ()=>{
        const q=query(novelcollectionref, where("Title", "==", decodedTitle));
        const qsnapshot=await getDocs(q);
        if (!qsnapshot.empty) 
        {
            setNovelauthor(qsnapshot.docs[0].data().Author);
            setNoveldate(qsnapshot.docs[0].data().ReleasedDate);
            setNovelimgurl(qsnapshot.docs[0].data().ImgURL);
            setNovelstatus(qsnapshot.docs[0].data().Status);
            setNovelsummary(qsnapshot.docs[0].data().Summary);
            setNovelid(qsnapshot.docs[0].id);
        }
    }
    useEffect(()=>{
        Getnoveldata();
    }, [])
    const volumescollectionref=collection(db, "Volumes");
    const [vollist, setVollist]=useState([]);
    const GetVolList=async ()=>{
        const q=query(volumescollectionref, where("BelongsTo", "==", decodedTitle));
        const qsnapshot=await getDocs(q);
        if (!qsnapshot.empty) 
        {
            setVollist(qsnapshot.docs);
        }
    }
    useEffect(()=>{
        GetVolList();
    }, [])
    return (
        <div className="detail-container">
            <h1 className="detail-title">{decodedTitle}</h1>
            <img src={novelimgurl} alt="Novel Cover" className="detail-img"/>
            <p className="detail-info"><strong>Author:</strong> {novelauthor}</p>
            <p className="detail-info"><strong>Released Date:</strong> {noveldate}</p>
            <p className="detail-info"><strong>Status:</strong> {novelstatus}</p>
            {(user && role=="Admin")? (
                <button onClick={()=>navigate(`/edit/${novelid}`)}>EDIT</button>
            ) : (
                <></>
            )}
            <p className="detail-summary"><strong>Summary:</strong> {novelsummary}</p>
            <div className="detail-chapter-container">
                <p className="chapter-title">List Of Chapters</p>
                <ul className="chapter-list">
                    {vollist.map((vol, index) => (
                        <li key={index} className="chapter-item">
                        <Link to={`/detail/${encodeURIComponent(decodedTitle)}/${encodeURIComponent(vol.data().Part)}`}>
                            {vol.data().Part}
                        </Link>
                    </li>                    
                    ))}
                </ul>
            </div>
        </div>
    )
}
