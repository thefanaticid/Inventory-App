import TableStock from "./data"

const page = async () => {

  return (
    <section>
      <h1 className='head-text'>Stock</h1>
      <section className="mt-3">
        <TableStock />
      </section>
    </section>
  )
}

export default page