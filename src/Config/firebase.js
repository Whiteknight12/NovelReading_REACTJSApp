import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAYB4pyWosyWSm_8CYaICMipqCMhybqv8w",
  authDomain: "overlordproject-3c2e7.firebaseapp.com",
  projectId: "overlordproject-3c2e7",
  storageBucket: "overlordproject-3c2e7.firebasestorage.app",
  messagingSenderId: "150720259847",
  appId: "1:150720259847:web:11c21cd54384ca458e87a2",
  measurementId: "G-T95VQBW7VC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleauthprovider=new GoogleAuthProvider();
export const db=getFirestore(app);