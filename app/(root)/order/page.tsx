import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      buyer: "Jin kazama",
      item: "Beras",
      date: new Date(),
      qty: 10
    },
    
  ]
}

const page = async () => {
  const data = await getData()

  return (
    <section>
      <h1 className='head-text'>Order</h1>
      <section className="mt-3">
        <DataTable columns={columns} data={data} />
      </section>
    </section>
  )
}

export default page