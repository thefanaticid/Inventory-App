import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ItemType } from "./schema";

async function getData(): Promise<ItemType[]> {
  const res =  await fetch('http://localhost:3000/api/item',
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


const TableItem = async () => {
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

export default TableItem