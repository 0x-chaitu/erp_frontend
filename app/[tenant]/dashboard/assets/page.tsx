import PageContainer from "@/components/layout/page-container";
import { AssetClient } from "@/components/tables/asset-table/client";
import { headers } from "next/headers";
import { Suspense } from "react";
import { getAssetCount, getAssets } from "./utils";



async function Assets({ page, per_page, tenantId }: {
    per_page?: string,
    page?: string,
    tenantId: string,
}) {

    const assetsData = getAssets(tenantId, per_page, page)
    const assetCountData = getAssetCount(tenantId)

    const [assets, assetCount] = await Promise.all([assetsData, assetCountData])
    return <AssetClient data={assets || []} dataCount={assetCount} per_page={per_page || "10"} />;
}

export default function Page({ params, searchParams }: {
    params: { tenant: string }, searchParams?: {
        per_page?: string,
        page?: string,
    },
}) {


    const tenantId = headers().get("X-Tenant");

    if (!tenantId) {
        return
    }
    return (
        <PageContainer>
            <div className="space-y-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <Assets per_page={searchParams?.per_page} page={searchParams?.page} tenantId={tenantId} />
                </Suspense>
            </div>
        </PageContainer>
    )
}