"use client"

import { User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { onIdTokenChanged } from '../firebase/firebaseAuth';
import { SESSION_COOKIE_NAME } from '@/constants';
import { auth } from '../firebase/firebaseConfig';
import nookies from "nookies";

export const AuthContext = createContext<{ user: User | null }>({
    user: null,
});

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            (window as any).nookies = nookies;
        }
        return onIdTokenChanged(async (user) => {
            console.log(`token changed!`);
            nookies.destroy(null, SESSION_COOKIE_NAME);

            if (!user) {
                console.log(`no token found...`);
                setUser(null);
                return;
            } else {

                console.log(`updating token...`);
                const token = await user.getIdToken();
                setUser(user);
                nookies.set(null, SESSION_COOKIE_NAME, token, { path: '/' });
            }
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            console.log(`refreshing token...`);
            const user = auth.currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
        return () => clearInterval(handle);
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

