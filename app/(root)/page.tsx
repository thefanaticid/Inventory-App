import { authOption } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOption) ;


  return (
    <>
      <h1 className="head-text">Dashboard</h1>
      <p>Welcome {`${ session?.user.username }`}</p>
    </>
  )
}
