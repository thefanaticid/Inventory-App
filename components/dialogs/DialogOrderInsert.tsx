
import React, { useState } from 'react'

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { StockFormType } from '@/lib/validations/stock';

const DialogOrderInsert = () => { 
    const [open, setOpen] = useState(false) ;

    async function insertHandler(values : StockFormType) {
        const response = await fetch('http://localhost:3000/api/stock',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item: values.item,
                stock: values.stock,
                dateIn: values.dateIn
            })
        });

        return response ;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Add new stock</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form add stock</DialogTitle>
            </DialogHeader>
            
        </DialogContent>
        {/* <Item isOpen={open} handleOpenChange={setOpen} btnTitle='Add new item' submitHandler={insertHandle} /> */}
    </Dialog>
  )
}

export default DialogOrderInsert