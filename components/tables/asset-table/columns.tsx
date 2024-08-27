import { Asset } from "@/constants/asset";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Asset>[] = [
    {
        accessorKey: "serial_number",
        header: "Serial Number"
    },
    {
        accessorKey: "asset_name",
        header: "Asset Name"
    },
    {
        accessorKey: "asset_model",
        header: "Asset Model"
    },

]