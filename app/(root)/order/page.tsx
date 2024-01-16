import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      buyer: "Faldito",
      date: new Date(),
      order: [
        {
          item: 'Gula',
          qty: 2
        },
        {
          item: 'Beras',
          qty: 11
        },
        {
          item: 'Cuka',
          qty: 11
        },
      ] 
    },
    {
      id: "728ed52f",
      date: new Date(),
      buyer: "Syabil",
      order: [
        {
          item: 'Mie',
          qty: 10
        },
        {
          item: 'Cuka',
          qty: 9
        },
      ] 
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