import Login from "@/components/forms/Login"

const page = () => {
  return (
    <section className="p-10 bg-white rounded ">
      <h1 className="head-text mb-5">Barokah Inventory</h1>
      <Login />
    </section>
    // <main className="mx-auto flex max-w-xl flex-col justify-start px-10 py-20">
    //     <h1 className="head-text">Barokah Inventory</h1>
    //    <p className="mt-3 text-base-regular text-dark-1">An app monitor barokah inventory.</p>

    //   <section className="mt-9 bg-white p-10">
    //    </section>
    //  </main>
  )
}

export default page