import { useState } from "react";
import { Item, columns } from "./columns"
import { DataTable } from "./data-table"
 
// async function getData(): Promise<Item[]> {
async function getData(): Promise<Item[]> {
  // Fetch data from your API here.
  const response = await fetch('http://localhost:3000/api/item',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache:"no-cache"
  }) ;
  const result = await response.json() ;

  return result.data ;
}

const page = async () => {
  const data = await getData();

  return (
    <section>
      <h1 className='head-text'>Items</h1>
      <section className="mt-3">
        <DataTable columns={columns} data={data} />
      </section>
    </section>
  )
}

export default page