import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCJyb6tRqZ6RpPn8BCBYdP8tru91VnuZcE",
  authDomain: "netflix-clone-c2508.firebaseapp.com",
  projectId: "netflix-clone-c2508",
  storageBucket: "netflix-clone-c2508.appspot.com",
  messagingSenderId: "890202286478",
  appId: "1:890202286478:web:c8f5a87e1b4bbeb32f9cdf"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
}

const login = async(email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};