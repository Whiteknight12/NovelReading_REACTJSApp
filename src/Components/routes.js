import React, { Suspense } from 'react'
import {Route, Routes} from 'react-router-dom'
import {Home} from '../Components/Home.js'
import SignIn from '../Components/signin.js'
import Login from './login.js'
import Addnewnovel from './Addnewnovel.js'
import Addnewvolume from './Addnewvolume.js'
import Deletevolumeornovel from './Deletevolumeornovel.js'
import Pagenotfound from './Pagenotfound.js'
import Detail from './Detail.js'
import Partdetail from './Partdetail.js'
import Account from './Account.js'
import UpdateNovel from './UpdateNovel.js'
import UpdateVolume from './UpdateVolume.js'
const Privacy=React.lazy(()=>import("./Privacy.js"))

export default function RoutesDefine() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='signin' element={<SignIn/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='add-new-novel' element={<Addnewnovel/>}></Route>
        <Route path='add-new-volume' element={<Addnewvolume/>}></Route>
        <Route path='delete' element={<Deletevolumeornovel/>}></Route>
        <Route path='*' element={<Pagenotfound/>}></Route>
        <Route path='privacy' element={<Privacy/>}></Route> 
        <Route path='/detail/:title' element={<Detail/>}></Route>
        <Route path='/detail/:title/:part' element={<Partdetail/>}>
          <Route path=':volid' element={<UpdateVolume/>}></Route>
        </Route>
        <Route path='account' element={<Account/>}></Route>
        <Route path='/edit/:novelid' element={<UpdateNovel/>}></Route>
      </Routes>
    </Suspense>
  )
}
