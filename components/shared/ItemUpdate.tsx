import React, { useState } from 'react'
import Item from '../forms/ItemForm'
import Link from 'next/link'
import { Unit, itemValidation } from '@/lib/validations/item';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import * as z from 'zod' ;
import { Button } from '../ui/button';
import { DropdownMenuItem } from '../ui/dropdown-menu';

interface Props {
    item: {
      id: number
      name: string
      min: number
      max: number
      stock: number
      unit: Unit
    }
    onChangeOpen: (open: boolean) => void
    isOpen: boolean
};

const ItemUpdate = ({ item, isOpen, onChangeOpen }: Props) => {    
    console.log({ from: 'ItemUpdate', ...item })
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

        return response; 
    }

  return (
    <Item isOpen={isOpen} handleOpenChange={onChangeOpen} btnTitle='Update item' item={item} submitHandler={updateHandle} />
  )
}

export default ItemUpdate