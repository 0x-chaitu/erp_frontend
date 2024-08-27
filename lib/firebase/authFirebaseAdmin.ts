import { getFirebaseAuth } from "next-firebase-auth-edge";
import serviceAccount from '@/lib/firebase/secret.json';

export const {
    getCustomIdAndRefreshTokens,
    verifyIdToken,
    createCustomToken,
    handleTokenRefresh,
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    verifyAndRefreshExpiredIdToken,
    setCustomUserClaims
} = getFirebaseAuth({
    apiKey: "AIzaSyCUq13iO9txT7hGlNJknFCgyAOt1s6EU4U",
    serviceAccount: {
        projectId: serviceAccount.project_id,
        clientEmail:
            serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
    },
});