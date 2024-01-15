import React, { useState } from 'react'
import Item from '../forms/Item'
import Link from 'next/link'
import { Unit, itemValidation } from '@/lib/validations/item';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import * as z from 'zod' ;
import { Button } from '../ui/button';

interface Props {
    item: {
      id: number;
      name: string;
      min: number;
      max: number;
      stock: number;
      unit: Unit;
    }
};

const ItemUpdate = ({ item }: Props) => {    
    
    async function updateHandle(values : z.infer<typeof itemValidation>) {
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

        console.log(item.id, values)
        return response; 
    }

  return (
    <Item btnTitle='Update item' item={item} submitHandler={updateHandle}>
        <Link href={''}>Edit</Link>
    </Item>
  )
}

export default ItemUpdate