import { firebaseConfig } from "@/lib/firebase/config";
import "firebase/compat/auth";

import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    type User,
    UserCredential, onAuthStateChanged as _onAuthStateChanged,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, signInWithPopup
} from "firebase/auth";
import { AuthCredentials } from "../schemas/auth";
import { Error, Ok, Result } from "../utils/algebraic";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
}

export const signUp = async ({ email, password }: AuthCredentials): Promise<Result<UserCredential>> => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(user => Ok(user))
        .catch(error => Error(error))
}

export const signIn = async ({ email, password }: AuthCredentials): Promise<Result<UserCredential>> => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(user => Ok(user))
        .catch(error => Error(error))
}

export const signInWithGoogle = async (): Promise<Result<UserCredential>> => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })

    return signInWithPopup(auth, provider)
        .then(user => Ok(user))
        .catch(error => Error(error))
}

export const signOut = async (): Promise<void> => {
    auth.signOut()
}