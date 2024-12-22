import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDO_DLrMzI1HJOeVlv4T1avFZE81oiPJqM",
  authDomain: "netflix-clone-326b1.firebaseapp.com",
  projectId: "netflix-clone-326b1",
  storageBucket: "netflix-clone-326b1.firebasestorage.app",
  messagingSenderId: "987500282873",
  appId: "1:987500282873:web:baa08e1c549614ba02b328"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{

    try {
        const res = await createUserWithEmailAndPassword(auth, email,password);
        const user = res.user;
        await addDoc(collection(db,user),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {

        console.log(error);
        // alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        // alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout};