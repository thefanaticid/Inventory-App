import { Item, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Item[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "Beras",
      min: 10,
      max: 100,
      unit: "kg",
      stock: 24
    },
    {
      id: "2",
      name: "Gula pasir",
      min: 10,
      max: 50,
      unit: "kg",
      stock: 31
    },
    {
      id: "3",
      name: "Gula aren",
      min: 10,
      max: 70,
      unit: "kg",
      stock: 67
    },
    
  ]
}

const page = async () => {
  const data = await getData()

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