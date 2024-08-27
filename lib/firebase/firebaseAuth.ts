import {
    type User,
    onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { auth } from './firebaseConfig';
import {
    signInWithEmailAndPassword as _signInWithEmailAndPassword,
    onIdTokenChanged as _onIdTokenChanged
} from 'firebase/auth';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
}

export function onIdTokenChanged(callback: (authUser: User | null) => void) {
    return _onIdTokenChanged(auth, callback);
}

export async function signInWithEmailAndPassword(tenantId: string, email: string, password: string) {
    auth.tenantId = tenantId
    try {
        const result = await _signInWithEmailAndPassword(auth, email, password);

        if (!result || !result.user) {
            throw new Error('Email sign in failed');
        }
        return result.user.uid;
    } catch (error) {
        console.error('Error signing in with Email', error);
    }
}



