import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {db} from '../Config/firebase'
import { useNavigate } from 'react-router-dom';
import '../AppUI/deletevolumeornovel.css'

export default function Deletevolumeornovel() {
    const novelcollectionref=collection(db, "Novels");
    const volumecollectionref=collection(db, "Volumes");
    const [novellist, setNovellist]=useState([]);
    const [volumelist, setVolumelist]=useState([]);
    const navigate=useNavigate();
    const GetNovelList=async ()=>{
        const rawnovellist=await getDocs(novelcollectionref);
        const filterednovellist=rawnovellist.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id
        }))
        setNovellist(filterednovellist);
    }
    const GetVolumeList=async ()=>{
        const rawvolumelist=await getDocs(volumecollectionref);
        const filteredvolumelist=rawvolumelist.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id
        }))
        setVolumelist(filteredvolumelist);
    }
    useEffect(()=>{
        GetNovelList();
        GetVolumeList();
    }, [])
    const DeleteNovel=async (id)=>{
        const deletenovel=doc(db, "Novels", id);
        await deleteDoc(deletenovel);
        navigate("/");
    }
    const DeleteVolume=async (id)=>{
        const deletevolume=doc(db, "Volumes", id);
        await deleteDoc(deletevolume);
        navigate("/");
    }
    return (
        <div className="delete-container">
            <h1 className="delete-title">DELETE NOVEL OR VOLUME</h1>
            <p className="delete-warning">
                *Delete all volumes belonging to a novel before deleting the novel*
            </p>
            <div className="delete-section">
                <h3 className="delete-section-title">List Of Novels</h3>
                {novellist.map((novel) => (
                    <div key={novel.id} className="delete-item">
                        <p className="delete-item-title">{novel.Title}</p>
                        <button className="delete-button" onClick={() => DeleteNovel(novel.id)}>
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
            <div className="delete-section">
                <h3 className="delete-section-title">List Of Volumes</h3>
                {volumelist.map((vol) => (
                    <div key={vol.id} className="delete-item">
                        <p className="delete-item-title">{vol.Part}</p>
                        <button className="delete-button" onClick={() => DeleteVolume(vol.id)}>
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
