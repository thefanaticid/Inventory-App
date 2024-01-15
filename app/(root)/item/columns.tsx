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
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import ItemDelete from "@/components/shared/ItemDelete"
import ItemUpdate from "@/components/shared/ItemUpdate"
import { Unit } from "@/lib/validations/item"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import Item from "@/components/forms/Item"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  id: number
  name: string
  min: number
  max: number
  unit: Unit
  stock: number
}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "min",
    header: "Min",
    cell: ({ row }) => {
        return  `${row.getValue('min')}${row.original.unit}`
    }
  },
  {
    accessorKey: "max",
    header: "Max",
    cell: ({ row }) => {
        return  `${row.getValue('max')}${row.original.unit}`
    }
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
        return  `${row.getValue('stock')}${row.original.unit}`
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original ;
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
      const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

      return (
        <>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <ItemUpdate item={item} /> */}
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteAlertOpen(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ItemUpdate isOpen={isEditDialogOpen} onChangeOpen={setIsEditDialogOpen} item={item} />
        </Dialog>
        <ItemDelete isOpen={isDeleteAlertOpen} onChangeOpen={setIsDeleteAlertOpen} id={item.id} />
      </>
      )
    }
    }
]
