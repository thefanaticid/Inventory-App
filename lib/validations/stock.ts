import * as z from 'zod' ;
import { db } from '../prisma';

interface StockForm {
    item: number;
    stock: number;
    dateIn: Date;
}

export const stockFormSchema = z.object({
    item: z.coerce.number().nonnegative()
    // .refine( async (data) => {
    //     const check = await db.item.findFirst({where: {id: 2}}) ;
        
    //     return check?.id ;
        
    // }, { path: ['item'], message: 'Item invalid' })
    ,
    stock: z.coerce.number().nonnegative(),
    dateIn: z.date()
})
// .refine(async (data) => {
//     const item = await db.item.findUnique({where: { id: parseInt(`${data.item}`) }}) ;

//     return (data.stock + (item?.stock ?? 0) > (item?.max ?? 0)) ? false : true ;
// }, { path: ['stock'], message: 'Stock cant gratter than item max' })
;

export type StockFormType = z.infer<typeof stockFormSchema>