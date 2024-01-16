'use client'

import React from 'react'
import { ItemType } from '@/app/(root)/item/schema';
 

async function getData(): Promise<ItemType[]> {
    const res =  await fetch('http://localhost:3000/api/item',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache:"no-cache"
      }) ;
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
  
    return data.data;
}

const ItemSelect = async () => {
    const items = await getData() ;

    return (
        <h1>Ialos</h1>
    )
}

export default ItemSelect