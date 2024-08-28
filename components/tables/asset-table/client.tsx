'use client';
import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Asset } from '@/constants/asset';

interface AssetClientProps {
    data: Asset[];
    dataCount: number;
    per_page: number
}

export const AssetClient: React.FC<AssetClientProps> = ({ data, dataCount, per_page }) => {
    return (
        <>
            <DataTable columns={columns} data={data} pageCount={Number(dataCount) / Number(per_page)} />
        </>
    );
};