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
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ItemType } from "@/app/(root)/item/schema";


interface Props {
    isOpen: boolean
    showActionToggle: (open: boolean) => void
    item: ItemType

}

const DialogItemDelete = ({ isOpen, showActionToggle, item }: Props) => {
  
  const router = useRouter() ;
  const { toast } = useToast()

  const handleDelete = async (id: number) => {
      const response = await fetch(`http://localhost:3000/api/item/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }) ;
        
        if(response.ok) {
          
          showActionToggle(false)
          
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
      <AlertDialog open={isOpen} onOpenChange={showActionToggle}  >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. You are about to delete Item of <b>{item.name}</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(item.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
    
}

export default DialogItemDelete