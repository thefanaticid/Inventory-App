import { CardAlertStock } from "@/components/cards/CardAlertStock";
import { CardRankItemOrdered } from "@/components/cards/CardRankItemOrdered";
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

async function getDataItemRanking() {
  const res = await fetch('http://localhost:3000/api/itemrankordered');

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.data;
}
export default async function Home() {
  const session = await getServerSession(authOption) ;
  const alertStock = await getDataAlertStock() ;
  const itemRanking = await getDataItemRanking() ;
  return (
    <>
      <h1 className="head-text">Dashboard</h1>
      <p>Welcome {`${ session?.user.username }`}</p>
      <section className={'grid gap-3 mt-3 grid-cols-4 '}> 
        
        <CardAlertStock data={alertStock}/>
        <CardRankItemOrdered data={itemRanking}/>
      </section>
    </>
  )
}
