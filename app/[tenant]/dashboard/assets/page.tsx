"use client"

import PageContainer from "@/components/layout/page-container";
import { AssetClient } from "@/components/tables/asset-table/client";
import { Suspense, useEffect, useState } from "react";
import nookies from 'nookies';
import { SESSION_COOKIE_NAME } from "@/constants";
import axios from 'axios';
import { useQueryStore } from "@/hooks/useQueryStore";



export default function AssetsPage({ params, searchParams }: {
    params: { tenant: string }, searchParams: {
        page: number,
        page_size: number
    }
}) {

    const [assets, setAssets] = useState([])
    const [count, setCount] = useState(0)

    const { page, pageSize } = useQueryStore()

    useEffect(() => {
        const assetsData = axios.get(
            `https://api.pudgelabs.in.net/v1/assets?offset=${(Number(page) - 1) * Number(pageSize)}&limit=${pageSize}`, {
            headers: {
                'Authorization': nookies.get(null, SESSION_COOKIE_NAME)?.user_session
            }
        })
        const assetCountData = axios.get(
            `https://api.pudgelabs.in.net/v1/assets/count`, {
            headers: {
                'Authorization': nookies.get(null, SESSION_COOKIE_NAME)?.user_session
            }
        }
        )

        Promise.all([assetsData, assetCountData]).then((res) => {

            setAssets(res?.[0]?.data?.data);

            setCount(res?.[1]?.data?.data)
        })
    }, [page, pageSize])


    return (
        <PageContainer>
            <div className="space-y-2">
                <AssetClient data={assets || []} dataCount={count} per_page={pageSize || 10} />
            </div>
        </PageContainer>
    )
}