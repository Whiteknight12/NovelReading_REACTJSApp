import React, { useEffect, useState } from 'react'
import {db} from '../Config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useLocation, useNavigate } from 'react-router-dom';
import '../AppUI/home.css'

export function Home() {
  const location=useLocation();
  const [novellist, setNovellist]=useState([]);
  const GetNovelList=async ()=>{
    const novelcollectionref=collection(db, "Novels");
    try {
      const rawnovellist=await getDocs(novelcollectionref);
      const filterednovellist=rawnovellist.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
      setNovellist(filterednovellist);
    }
    catch(err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    GetNovelList();
  }, [location])
  const navigate=useNavigate();
  return (
    <div className="home-container">
      <ul className="novel-list">
        {novellist.map((novel) => (
          <li key={novel.id} className="novel-item">
            <img src={novel.ImgURL} alt={novel.Title} className="novel-image" />
            <div className="novel-title">{novel.Title}</div>
            <button className="read-button" onClick={()=>{
              navigate(`/detail/${encodeURIComponent(novel.Title)}`);
            }}>READ</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
