import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {db} from '../Config/firebase'
import { useLocation, useNavigate } from 'react-router-dom';
import '../AppUI/addnewvolume.css'

export default function Addnewvolume() {
    const location=useLocation();
    const volumecollectionref=collection(db, "Volumes");
    const novelcollectionref=collection(db, "Novels");
    const [novellist, setNovellist]=useState([]);
    const GetNovelList=async ()=>{
        const rawnovellist=await getDocs(novelcollectionref);
        const filterednovellist=rawnovellist.docs.map((novel)=>(novel.data().Title));
        setNovellist(filterednovellist);
    }
    useEffect(()=>{
        GetNovelList();
    }, [location])
    const [part, setPart]=useState("");
    const [belongsto, setBelongsto]=useState("");
    const [content, setContent]=useState("");
    const navigate=useNavigate();
    const AddNewVolume=async ()=> {
        try {
            await addDoc(volumecollectionref, {
                Part: part,
                BelongsTo: belongsto,
                Content: content,
            })
            navigate("/");
        }
        catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="addnewvolume-container">
            <h1 className="addnewvolume-title">Add New Volume</h1>
            <input placeholder='Name of part' onChange={(e)=>setPart(e.target.value)} className="addnewvolume-input"></input>
            <br/>
            <label className="addnewvolume-label">Novel</label>
            <select onChange={(e)=>setBelongsto(e.target.value)} className="addnewvolume-select">
                <option>Choose a novel</option>
                {
                    novellist.map((noveltitle)=>(
                        <option>{noveltitle}</option>
                    ))
                }
            </select>
            <br/>
            <textarea placeholder='Contents' onChange={(e)=>setContent(e.target.value)} className="addnewvolume-textarea" ></textarea>
            <br/>
            <button className="addnewvolume-button" onClick={AddNewVolume}>Submit</button>
        </div>
    )
}
