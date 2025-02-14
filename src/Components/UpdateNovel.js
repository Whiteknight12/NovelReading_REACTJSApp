import React, { useEffect, useState } from 'react'
import {db} from '../Config/firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../AppUI/updatenovel.css'

export default function UpdateNovel() {
    const navigate=useNavigate();
    const [name, setName]=useState("");
    const [status, setStatus]=useState("");
    const [author, setAuthor]=useState("");
    const [date, setDate]=useState("");
    const [imgurl, setImgurl]=useState("");
    const [summary, setSummary]=useState("");
    const {novelid}=useParams();
    const GetNovelData=async()=>{
        const object=doc(db, "Novels", novelid);
        const trueobject=await getDoc(object);
        if (trueobject.exists()) 
        {
            setName(trueobject.data().Title);
            setAuthor(trueobject.data().Author);
            setStatus(trueobject.data().Status);
            setDate(trueobject.data().ReleasedDate);
            setImgurl(trueobject.data().ImgURL);
            setSummary(trueobject.data().Summary);
        }
    }
    const UpdateNovel=async()=>{
        const object=doc(db, "Novels", novelid);
        await updateDoc(object, {
            Title: name,
            Status: status,
            Author: author,
            ReleasedDate: date,
            ImgURL: imgurl,
            Summary: summary
        })
        navigate(0);
    }
    useEffect(()=>{
        GetNovelData();
    }, [])
    return (
        <div className="update-container">
            <h1 className="update-title">UPDATE NOVEL</h1>
            <div className="update-form">
                <label className="update-label">Name Of Novel</label>
                <input 
                    className="update-input"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />         
                <label className="update-label">Author Of Novel</label>
                <input 
                    className="update-input"
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <label className="update-label">Released Date Of Novel</label>
                <input 
                    className="update-input"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                />
                <label className="update-label">Status Of Novel</label>
                <input 
                    className="update-input"
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                />
                <label className="update-label">Summary Of Novel</label>
                <textarea 
                    className="update-textarea"
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)}
                ></textarea>
                <label className="update-label">Illustration Link Of Novel</label>
                <input 
                    className="update-input"
                    value={imgurl} 
                    onChange={(e) => setImgurl(e.target.value)}
                /> 
                <button className="update-button" onClick={() => UpdateNovel()}>Submit</button>
            </div>
        </div>
    )    
}
