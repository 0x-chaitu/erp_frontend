import serviceAccount from '@/lib/firebase/secret.json';
import admin, { apps } from 'firebase-admin'


export const adminSdk = apps.length !== 0 ? apps[0] : admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email
    })
})
