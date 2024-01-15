"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from  "@/components/ui/dropdown-menu"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface Props {
    id: number;
}

const ItemDelete = ({ id }: Props) => {
    const router = useRouter() ;
    const { toast } = useToast()
    const [open, setopen] = useState(false);

    const handleAlertChange = () => {
        setopen(!open);
    };

    const handleDelete = async (id: number) => {
        const response = await fetch(`http://localhost:3000/api/item/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          }) ;
          
          if(response.ok) {
            setopen(false);
    
            router.refresh() ;
    
          } else {
            toast({
              title: "Opss",
              description: "Something wrong",
              variant: 'destructive'
            })
          }
    }

    return (
        <AlertDialog open={open} onOpenChange={handleAlertChange} >
          <AlertDialogTrigger asChild>
            <Link href={''}>Delete</Link>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
    
}

export default ItemDelete