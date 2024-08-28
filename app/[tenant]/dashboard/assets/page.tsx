"use client"

import PageContainer from "@/components/layout/page-container";
import { AssetClient } from "@/components/tables/asset-table/client";
import { Suspense, useContext, useEffect, useState } from "react";
import { getAssetCount, getAssets } from "./utils";
import { AuthContext } from "@/lib/auth/auth";



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

            const assetsData = getAssets(user?.tenantId, searchParams?.per_page, searchParams?.page)
            const assetCountData = getAssetCount(user?.tenantId)

            Promise.all([assetsData, assetCountData]).then((res) => {

                setAssets(res?.[0] || [])

                setCount(res[1])
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