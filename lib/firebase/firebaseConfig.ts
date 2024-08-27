import { getApps, initializeApp } from 'firebase/app';
import { getAuth, } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCUq13iO9txT7hGlNJknFCgyAOt1s6EU4U",
    authDomain: "rag-erp.firebaseapp.com",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);