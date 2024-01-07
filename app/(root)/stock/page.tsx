import { Stock, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Stock[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      item: "Beras",
      stockIn: 10,
      date: new Date(),
    },
    
  ]
}

const page = async () => {
  const data = await getData()

  return (
    <section>
      <h1 className='head-text'>Stock</h1>
      <section className="mt-3">
        <DataTable columns={columns} data={data} />
      </section>
    </section>
  )
}

export default page