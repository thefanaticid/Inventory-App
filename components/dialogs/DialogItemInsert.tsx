import React, { useState } from 'react'
import {  ItemFormType } from '@/lib/validations/item';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import ItemForm from '../forms/ItemForm';

const DialogItemInsert = () => { 
    const [open, setOpen] = useState(false) ;

    async function insertHandler(values : ItemFormType) {
        const response = await fetch('http://localhost:3000/api/item',
        {
            method: 'POST',
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
        });

        return response ;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Add new item</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form add Item</DialogTitle>
            </DialogHeader>
            <ItemForm 
                submitHandler={insertHandler}
                btnTitle='Add new item'
                showActionToggle={setOpen}
            />
        </DialogContent>
        {/* <Item isOpen={open} handleOpenChange={setOpen} btnTitle='Add new item' submitHandler={insertHandle} /> */}
    </Dialog>
  )
}

export default DialogItemInsert