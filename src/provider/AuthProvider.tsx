"use client"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, User, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getRedirectResult } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { useRouter, useSearchParams } from "next/navigation";

type authData = {
    user: User | null | undefined;
    handleSignIn: () => void;
    handleSignOut: () => void;
    handleSignInWithPassword: (userData: { email: string; password: string }) => void;
    handleSignUpWithPassword: (userData: { email: string; password: string }) => void;
}


const AuthContext = createContext<authData>({
    user: null,
    handleSignIn: async () => { },
    handleSignOut: async () => { },
    handleSignInWithPassword: async () => { },
    handleSignUpWithPassword: async () => { }
});


const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>();
    const router = useRouter();
    const useSearchPara = useSearchParams();
    const redirectTo=useSearchPara.get("redirect") || "/ruuuuu";
    ; useEffect(() => {
        getRedirectResult(auth).then((result) => {
            if (result && result.user) {
                console.log("login success ")
                setUser(result.user);
                router.push(redirectTo);
            }
            else {
                setUser(null);
            }
        }).catch((err) => { console.log(err) })



        const stateChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        })
        return () => stateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {


    }, []);

    const handleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
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
        <AuthContext.Provider value={{ user, handleSignIn, handleSignOut, handleSignInWithPassword, handleSignUpWithPassword }}>
            {children}
        </AuthContext.Provider>

    )
}


const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
