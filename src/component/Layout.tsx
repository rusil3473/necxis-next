"use client"
import { useAuth } from '@/provider/AuthProvider'
import React, { PropsWithChildren, useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getToken } from 'firebase/messaging';
import { getMessaging, isSupported,onMessage} from "firebase/messaging";
import { app } from "@/lib/firebase/firebase"

function RootLayout({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const router = useRouter();
  

  const pathName = usePathname();
  /* Page check for auth & non auth users  */
  useEffect(() => {
    const authPage = pathName === "/signIn" || pathName === "/signUp"
    if (!user && !authPage) {
      router.push("/signIn");
    }
    if (user && authPage) {
      router.push("/");
    }

  }, [router, user, pathName]);
  
  
  /*Handles Registration of service worker for firebase clould messaging*/
  
 useEffect(() => {
 	
      
        const messaging = getMessaging(app);
        /*const register = () => {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/firebase-messaging-sw.js").then(async (reg) => {
                    console.log("firebase Reg :", reg)
                    await requestNotificationPermission();
                }).catch(err => {
                    console.log(err);
                })
            }
        }
*/
        async function requestNotificationPermission() {
            try {
                const per = await Notification.requestPermission();
                if (per === "granted") {
                    const support = await isSupported();
                    if (support) {
                    	
                        const token = await getToken(messaging, { vapidKey: process.env.NEXT_FIREBASE_VAPID_KEY! });
                        if(token){
                            console.log("FCM token :",token)
                        }
                        else{
                            console.log("Something is fishy")
                        }
        
                    }
                    else {
                        console.log("so many errors")
                    }
                }
                else{
                console.log("Give permission");
                }
            } catch (error) {
                console.log(error)
            }

        }
    	requestNotificationPermission();
    	onMessage(messaging,()=>{});
        /*register();*/
    }, []);

  return (
    <>{children}</>
  )
}

export default RootLayout
