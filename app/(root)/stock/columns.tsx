"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import {
    CaretSortIcon,
} from "@radix-ui/react-icons"
import { StockType } from "./schema"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<StockType>[] = [
  {
    id: "item",
    accessorKey: "item.name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "dateIn",
    header: "Date",
    cell: ({ row }) =>  format(row.getValue('dateIn'), "PPP") 
  },
  {
    accessorKey: "stockIn",
    header: "Stock in",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row}/>
  }
]
