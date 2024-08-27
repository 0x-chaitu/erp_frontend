import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME } from '@/constants';
import { adminSdk } from '@/lib/firebase/firebaseAdmin';

export async function GET(request: Request) {
    const cookie = cookies().get(SESSION_COOKIE_NAME)

    try {
        const token = await adminSdk?.auth().verifyIdToken(cookie?.value || "")

        const tenAuth = adminSdk?.auth().tenantManager().authForTenant(token?.firebase?.tenant || "")

        tenAuth?.setCustomUserClaims(token?.uid || "", null)

        console.log(token);
    } catch (error) {
        console.log(error);

    }




    return new Response("ds", {
        status: 200,
        // headers: { 'Set-Cookie': `token=${token.value}` },
    })
}