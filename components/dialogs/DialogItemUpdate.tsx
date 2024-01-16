"use client"


import { DialogHeader, DialogTitle } from "../ui/dialog"
import ItemForm from "../forms/ItemForm"
import { ItemType } from "@/app/(root)/item/schema";

type EditProps = {
    item: ItemType;
    showActionToggle: (open: boolean) => void
};


const DialogItemUpdate = ({ item, showActionToggle }: EditProps) => {
    async function updateHandle(values : ItemType) {
        const response = await fetch(`http://localhost:3000/api/item/${item.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: values.name,
            min: values.min,
            max: values.max,
            stock: values.stock,
            unit: values.unit,
          })
        }) ;
    
        return response; 
    }

  return (
    <div>
        <DialogHeader>
            <DialogTitle>Form Edit Item</DialogTitle>
        </DialogHeader>
        <ItemForm 
            item={item}
            btnTitle={"Edit Item"}  
            submitHandler={updateHandle}
            showActionToggle={showActionToggle}
        />   
    </div>
  )
}

export default DialogItemUpdate