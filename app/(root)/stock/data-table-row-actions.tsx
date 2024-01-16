import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { stockSchema } from "./schema";
import DialogStockDelete from "@/components/dialogs/DialogStockDelete";
import DialogStockUpdate from "@/components/dialogs/DialogStockUpdate";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}
  
export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const stock = stockSchema.parse(row.original)
    
    const handleEditClick = () => {
        setDialogContent(
            <DialogStockUpdate
                stock={stock}
                showActionToggle={setShowDialog}
            />
        );
    };

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
                <DialogTrigger asChild>
                    <DropdownMenuItem onClick={() => handleEditClick()}>
                    Edit
                    </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {dialogContent && <DialogContent>{dialogContent}</DialogContent> }
            <DialogStockDelete 
                stock={stock} 
                isOpen={showDeleteDialog} 
                showActionToggle={setShowDeleteDialog} 
            />
        </Dialog>
    );
}