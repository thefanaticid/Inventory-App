"use client"

import React, { useState } from 'react'

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { StockFormType } from '@/lib/validations/stock';
import OrderForm from '../forms/OrderForm';
import { OrderFormType } from '@/lib/validations/order';

const DialogOrderInsert = () => { 
    const [open, setOpen] = useState(false) ;

    async function insertHandler(values : OrderFormType) {
        const response = await fetch('http://localhost:3000/api/order',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        return response ;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Add new order</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form add order</DialogTitle>
            </DialogHeader>
            
            <OrderForm showActionToggle={setOpen}  btnTitle='Add new order' submitHandler={insertHandler} />
        </DialogContent>
    </Dialog>
  )
}

export default DialogOrderInsert