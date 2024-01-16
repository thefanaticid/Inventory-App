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
import { itemSchema } from "./schema";
import DialogItemUpdate from "@/components/dialogs/DialogItemUpdate";
import DialogItemDelete from "@/components/dialogs/DialogItemDelete";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}
  
export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const item = itemSchema.parse(row.original)
    
    const handleEditClick = () => {
        setDialogContent(
            <DialogItemUpdate
                item={item}
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
                {/* <ItemUpdate item={item} /> */}
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
            <DialogItemDelete 
                item={item} 
                isOpen={showDeleteDialog} 
                showActionToggle={setShowDeleteDialog} 
            />
        </Dialog>
    );
}