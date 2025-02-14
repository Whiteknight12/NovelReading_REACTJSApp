import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCQ5GW3-QRvkTDdrkoKns6RMKgyUyhium8",
  authDomain: "overread-12.firebaseapp.com",
  projectId: "overread-12",
  storageBucket: "overread-12.firebasestorage.app",
  messagingSenderId: "598990010163",
  appId: "1:598990010163:web:77b9f536766593c6517046",
  measurementId: "G-D2SP82D3ZX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleauthprovider=new GoogleAuthProvider();
export const db=getFirestore(app);