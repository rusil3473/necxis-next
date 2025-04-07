importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyA-EtQNfryO7f2KwaVgTZo7iAQxzHY1KqY",
  authDomain: "necxis-b0c7b.firebaseapp.com",
  projectId:"necxis-b0c7b",
  storageBucket:"necxis-b0c7b.firebasestorage.app",
  messagingSenderId:"454626850308",
  appId:"1:454626850308:web:707733f387d193055aa751",
  measurementId:"G-YP1P90LXJV"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://lorempicsum", // Optional icon
    data: payload.data,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

