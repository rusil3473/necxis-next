/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider,signInWithCredential,signInWithPopup, onAuthStateChanged, User, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";



type authData = {
    user: User | null | undefined;
    handleSignIn: () => void;
    handleSignOut: () => void;
    handleSignInWithPassword: (userData: { email: string; password: string }) => void;
    handleSignUpWithPassword: (userData: { email: string; password: string }) => void;
    handleSignInWithCred:(cred:any)=>void;
}


const AuthContext = createContext<authData>({
    user: null,
    handleSignIn: async () => { },
    handleSignOut: async () => { },
    handleSignInWithPassword: async () => { },
    handleSignUpWithPassword: async () => { },
    handleSignInWithCred:async()=>{}
});




const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>();
   
    useEffect(() => {
       
        const stateChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        })
        return () => stateChange();
     
    }, []);

    useEffect(() => {


    }, []);

    const handleSignInWithCred=async(cred:any)=>{
        try {
            signInWithCredential(auth,cred);
        } catch (error) {
            console.log(error);
        }

    }

    const handleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Error during sign-in:", err);
        }
    }
    const handleSignOut = async () => {
        setUser(null);
        await signOut(auth);
    }

    const handleSignInWithPassword = async (userData: { email: string; password: string }) => {
        try {
            await signInWithEmailAndPassword(auth, userData.email, userData.password);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignUpWithPassword = async (userData: { email: string; password: string }) => {
        try {
            await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <AuthContext.Provider value={{ user, handleSignIn, handleSignOut, handleSignInWithPassword, handleSignUpWithPassword,handleSignInWithCred}}>
            {children}
        </AuthContext.Provider>

    )
}


const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
