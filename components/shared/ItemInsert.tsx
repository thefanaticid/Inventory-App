import React, { useState } from 'react'
import Item from '../forms/Item'
import {  itemValidation } from '@/lib/validations/item';

import * as z from 'zod' ;
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';

const ItemInsert = () => { 
    const [open, setOpen] = useState(false) ;
    async function insertHandle(values : z.infer<typeof itemValidation>) {
        console.log(values);

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
        <Item isOpen={open} handleOpenChange={setOpen} btnTitle='Add new item' submitHandler={insertHandle} />
    </Dialog>
  )
}

export default ItemInsert