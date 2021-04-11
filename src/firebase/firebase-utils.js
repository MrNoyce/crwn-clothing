import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDTpC5h5WK8FaQM6mJ8CcMck_Sf8wTf0Go",
    authDomain: "crwn-db-6b89d.firebaseapp.com",
    projectId: "crwn-db-6b89d",
    storageBucket: "crwn-db-6b89d.appspot.com",
    messagingSenderId: "43085308506",
    appId: "1:43085308506:web:daaa78886c9e0c222c2e63",
    measurementId: "G-F34CDPJ6D0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // console.log('add data:', additionalData);
    // console.log('userAuth', userAuth);

    if (!userAuth) return;

    // console.log(userAuth.uid, additionalData);

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get()
    console.log(snapshot);

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user:', error.message)
        }
    }


    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;