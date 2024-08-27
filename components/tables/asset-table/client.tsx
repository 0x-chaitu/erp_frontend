'use client';
import { DataTable } from '@/components/ui/data-table';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Asset } from '@/constants/asset';

interface AssetClientProps {
    data: Asset[];
    dataCount: string;
    per_page: string
}

export const AssetClient: React.FC<AssetClientProps> = ({ data, dataCount, per_page }) => {
    return (
        <>
            <DataTable columns={columns} data={data} pageCount={Number(dataCount) / Number(per_page)} />
        </>
    );
};