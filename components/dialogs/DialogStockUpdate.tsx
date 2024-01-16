
import { DialogHeader, DialogTitle } from "../ui/dialog"
import { StockFormType } from "@/lib/validations/stock";
import StockForm from "../forms/StockForm";
import { StockType } from "@/app/(root)/stock/schema";
import { ItemType } from "@/app/(root)/item/schema";

type EditProps = {
    stock: StockType;
    showActionToggle: (open: boolean) => void
};


const DialogStockUpdate =  ({ stock, showActionToggle }: EditProps) => {
    async function updateHandle(values : StockFormType) {
        const response = await fetch(`http://localhost:3000/api/stock/${stock.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            item: values.item,
            stock: values.stock,
            dateIn: values.dateIn,
          })
        }) ;
    
        return response; 
    }

  return (

    <div>
        <DialogHeader>
            <DialogTitle>Form Edit Item</DialogTitle>
        </DialogHeader>
        <StockForm 
            stock={stock}
            btnTitle={"Edit Stock"}  
            submitHandler={updateHandle}
            showActionToggle={showActionToggle}
        />   
    </div>
  )
}

export default DialogStockUpdate