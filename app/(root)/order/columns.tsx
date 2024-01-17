"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DataTableRowActions } from "./data-table-row-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string
  buyer: string
  order: {
    item: string
    qty: number
  }[],
  date: Date,
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "buyer",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Buyer
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>  format(row.getValue('date'), "PPP") 
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row}/>
  }
]
