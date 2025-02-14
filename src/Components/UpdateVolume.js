import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {db} from '../Config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../AppUI/updatevolume.css'

export default function UpdateVolume() {
    const {volid}=useParams();
    const [part, setPart]=useState("");
    const [content, setContent]=useState("");
    const [belongsto, setBelongsto]=useState("");
    const GetVolData=async()=>{
        const object=doc(db, "Volumes", volid);
        const trueobject=await getDoc(object);
        if (trueobject.exists())
        {
            setPart(trueobject.data().Part);
            setContent(trueobject.data().Content);
            setBelongsto(trueobject.data().BelongsTo);
        }
    }
    useEffect(()=>{
        GetVolData();
    }, [])
    const Update=async()=>{
        const object=doc(db, "Volumes", volid);
        await updateDoc(object, {
            Part: part,
            BelongsTo: belongsto,
            Content: content
        })
    }
  return (
    <div className="update-volume-container">
        <h1 className='uv-h1'>UPDATE VOLUME</h1>
        <label className='uv-label'>Part Name</label>
        <input className='uv-input' value={part} onChange={(e)=>setPart(e.target.value)}></input>
        <label className='uv-label'>Belongs To</label>
        <input className='uv-input' value={belongsto} onChange={(e)=>setBelongsto(e.target.value)}></input>
        <label className='uv-label'>Content</label>
        <textarea className='uv-text-area' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        <button className='uv-button' onClick={()=>Update()}>Submit</button>
    </div>
  )
}
