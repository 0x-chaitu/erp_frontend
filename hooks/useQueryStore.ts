import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { create } from 'zustand';

interface Query {
    page?: number;
    pageSize?: number;
}

interface QueryStore {
    page: number;
    pageSize: number;
    setQuery: ({ page, pageSize }: Query) => void;
}

export const useQueryStore = create<QueryStore>((set) => ({
    page: 1, pageSize: 10,
    setQuery: (query: Query) => set((state) => {
        return ({ ...state, ...query })
    })

}));

