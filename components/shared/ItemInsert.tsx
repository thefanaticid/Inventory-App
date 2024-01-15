import React, { useState } from 'react'
import Item from '../forms/Item'
import {  itemValidation } from '@/lib/validations/item';

import * as z from 'zod' ;
import { Button } from '../ui/button';

const ItemInsert = () => {    
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
    <Item btnTitle='Add new item' submitHandler={insertHandle}>
        <Button className="bg-red-600 hover:bg-red-700 text-white">Add new Item</Button>
    </Item>
  )
}

export default ItemInsert