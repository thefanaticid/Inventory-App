"use client"

import { DialogHeader, DialogTitle } from "../ui/dialog"
import OrderForm from "../forms/OrderForm";
import { OrderFormType } from "@/lib/validations/order";

type EditProps = {
    order: {
      id: number
      buyer: string
      date: Date
      order: {
        item: number
        qty: number
      }[]
    }
    showActionToggle: (open: boolean) => void
};


const DialogStockUpdate =  ({ order, showActionToggle }: EditProps) => {
    async function updateHandle(values : OrderFormType) {
        const response = await fetch(`http://localhost:3000/api/order/${order.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }) ;
    
        return response; 
    }

  return (

    <div>
        <DialogHeader>
            <DialogTitle>Form Edit Order</DialogTitle>
        </DialogHeader>
        <OrderForm 
            order={order}
            btnTitle={"Edit Stock"}  
            submitHandler={updateHandle}
            showActionToggle={showActionToggle}
        />   
    </div>
  )
}

export default DialogStockUpdate