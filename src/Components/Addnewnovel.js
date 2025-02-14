import React, { useState } from 'react'
import {db} from '../Config/firebase'
import { addDoc, collection } from 'firebase/firestore';
import '../AppUI/addnewnovel.css'
import { useNavigate } from 'react-router-dom';

export default function Addnewnovel() {
    const [author, setAuthor]=useState("");
    const [date, setDate]=useState("");
    const [status, setStatus]=useState("");
    const [summary, setSummary]=useState("");
    const [title, setTitle]=useState("");
    const [imgurl, setImgurl]=useState("");
    const navigate=useNavigate();
    const Addnewnovel=async ()=> {
        const novelcollectionref=collection(db, "Novels");
        try {
            await addDoc(novelcollectionref, {
                Title: title,
                Author: author,
                Summary: summary,
                Status: status,
                ReleasedDate: date,
                ImgURL: imgurl
            })
            navigate("/");
        }
        catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="addnovel-container">
            <h1 className="addnovel-title">Add New Novel</h1>
            <input className="addnovel-input" placeholder='Novel Title' onChange={(e) => setTitle(e.target.value)} />
            <input className="addnovel-input" placeholder='Novel Author' onChange={(e) => setAuthor(e.target.value)} />
            <input className="addnovel-input" placeholder='Novel Released Date' onChange={(e) => setDate(e.target.value)} />
            <input className="addnovel-input" placeholder='Novel Summary' onChange={(e) => setSummary(e.target.value)} />
            <input className="addnovel-input" placeholder='Novel Status' onChange={(e) => setStatus(e.target.value)} />
            <input className="addnovel-input" placeholder='Novel Illustration Link' onChange={(e) => setImgurl(e.target.value)} />
            <button className="addnovel-button" onClick={() => Addnewnovel()}>Submit</button>
        </div>
    )    
}
