import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAdRSJ2PKQdrs9AP0szkMr8aKpOaUGvINs",
    authDomain: "clothing-db-1d7a1.firebaseapp.com",
    projectId: "clothing-db-1d7a1",
    storageBucket: "clothing-db-1d7a1.appspot.com",
    messagingSenderId: "781579233862",
    appId: "1:781579233862:web:e46edd1a26744871b0f847"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const spanShot = await userRef.get()

    if (!spanShot.exists) {
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
            console.log('error creating user', 'error.message')
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;