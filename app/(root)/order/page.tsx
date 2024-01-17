import { columns } from "./columns"
import TableOrder from "./data"
 

const page = async () => {
  return (
    <section>
      <h1 className='head-text'>Order</h1>
      <section className="mt-3">
        <TableOrder />
      </section>
    </section>
  )
}

export default page