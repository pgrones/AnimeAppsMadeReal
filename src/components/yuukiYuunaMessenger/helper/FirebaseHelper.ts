import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { child, connectDatabaseEmulator, Database, getDatabase, onValue, push, ref, serverTimestamp, update, increment, set, onDisconnect } from "firebase/database";
import { Messages, singleMessage } from "./Helper";

const firebaseConfig = {
    apiKey: "AIzaSyCgnWaBgOB9BcErEbDl5ktIkX9VcVsYhCk",
    authDomain: "aniapps-40fe8.firebaseapp.com",
    projectId: "aniapps-40fe8",
    storageBucket: "aniapps-40fe8.appspot.com",
    messagingSenderId: "267977278899",
    appId: "1:267977278899:web:33e86d1b26c2742c13f7c6",
    measurementId: "G-7XLE09J75T"
};

let app: FirebaseApp;
let db: Database;

export const initDB = async () => {
    app ||= initializeApp(firebaseConfig);
    await signInAnonymously(getAuth(app));
    db ||= getDatabase(app);

    if (location.hostname === "localhost") {
        // Point to the RTDB emulator running on localhost
        connectDatabaseEmulator(db, "localhost", 9000);
    }

    // Increment the user count
    set(ref(db, 'users'), { count: increment(1) });
    // and decrement it again once the user leaves
    onDisconnect(ref(db, 'users')).set({ count: increment(-1) });
}

export const onUserCountChanged = async (callback: (newCount: number) => void) => {
    onValue(ref(db, 'users/count'), (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export const onNewMessage = async (callback: (newData: Messages) => void) => {
    onValue(ref(db, 'messages'), (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

export const addMessage = async (updatedMessages: Messages, removedMessageKeys: string[], newMessage: singleMessage) => {
    const updateData: { [key: string]: singleMessage | null } = {};

    // Update messages if necessary
    for (const key in updatedMessages) {
        if (Object.prototype.hasOwnProperty.call(updatedMessages, key)) {
            const updatedMessage = updatedMessages[key];
            updateData[`/messages/${key}`] = updatedMessage;
        }
    }

    // Remove messages if necessary
    for (const removedMessageKey of removedMessageKeys) {
        updateData[`/messages/${removedMessageKey}`] = null;
    }

    // Create the new message
    newMessage.timestamp = serverTimestamp();
    const key = push(child(ref(db), 'messages')).key;
    updateData[`/messages/${key}`] = newMessage;

    // Update the db
    update(ref(db), updateData);
}
