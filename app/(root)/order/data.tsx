import { DataTable } from "./data-table";
import { columns } from "./columns";
import { OrderType } from "./schema";

async function getData(): Promise<OrderType[]> {
  const res =  await fetch('http://localhost:3000/api/order',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache:"no-cache"
    }) ;

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.data;
}


const TableOrder = async () => {
  const data = await getData() ;
  // const [itemData, setItemData] = useState<ItemType[]>([]);
  // useEffect(() => {
  //   const data = async () => {
  //     const result = await getData();
  //     setItemData(result);
  //   };
  //   data();
  // }, []);
  
  return <DataTable data={data} columns={columns} />
}

export default TableOrder