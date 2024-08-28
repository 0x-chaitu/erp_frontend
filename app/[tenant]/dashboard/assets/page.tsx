"use client"

import PageContainer from "@/components/layout/page-container";
import { AssetClient } from "@/components/tables/asset-table/client";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/auth/auth";
import nookies from 'nookies';
import { SESSION_COOKIE_NAME } from "@/constants";
import axios from 'axios';



// async function Assets({ page, per_page, tenantId }: {
//     per_page?: string,
//     page?: string,
//     tenantId: string,
// }) {



//     return <AssetClient data={assets || []} dataCount={assetCount} per_page={per_page || "10"} />;
// }

export default function AssetsPage({ params, searchParams }: {
    params: { tenant: string }, searchParams?: {
        per_page?: string,
        page?: string,
    },
}) {

    let { user } = useContext(AuthContext);
    const [assets, setAssets] = useState([])
    const [count, setCount] = useState(0)



    useEffect(() => {
        if (user?.tenantId != null) {
            console.log(322);

            const assetsData = axios.get(
                `https://api.pudgelabs.in.net/v1/assets?offset=${(Number(searchParams?.page) - 1) * Number(searchParams?.per_page)}&limit=${searchParams?.per_page}`, {
                headers: {
                    'Authorization': nookies.get(null, SESSION_COOKIE_NAME)?.user_session
                }
            }
            )
            const assetCountData = axios.get(
                `https://api.pudgelabs.in.net/v1/assets/count`, {
                headers: {
                    'Authorization': nookies.get(null, SESSION_COOKIE_NAME)?.user_session
                }
            }
            )

            Promise.all([assetsData, assetCountData]).then((res) => {

                // setAssets(res?.[0]. || [])
                setAssets(res?.[0]?.data?.data);


                setCount(res?.[1]?.data?.data)
            })
        }
    }, [user, searchParams])

    return (
        <PageContainer>
            <div className="space-y-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <AssetClient data={assets || []} dataCount={count} per_page={Number(searchParams?.per_page) || 10} />
                </Suspense>
            </div>
        </PageContainer>
    )
}