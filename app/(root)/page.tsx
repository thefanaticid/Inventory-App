import { CardAlertStock } from "@/components/cards/alertstock";
import { authOption } from "@/lib/auth"
import { getServerSession } from "next-auth"

async function getDataAlertStock() {
  const res = await fetch('http://localhost:3000/api/alertstock');

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.data;
}
export default async function Home() {
  const session = await getServerSession(authOption) ;
  const alertStock = await getDataAlertStock() ;
  return (
    <>
      <h1 className="head-text">Dashboard</h1>
      <p>Welcome {`${ session?.user.username }`}</p>
      <section className={'grid gap-3 mt-3 grid-cols-4 items-center'}> 
        <CardAlertStock data={alertStock}/>
      </section>
    </>
  )
}
