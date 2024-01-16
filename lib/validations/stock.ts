import * as z from 'zod' ;
import { db } from '../prisma';


export const stockFormSchema = z.object({
    item: z.coerce.number().nonnegative().refine(async (data) => {
        const check = await db.item.findUnique({where: {id: data}}) ;

        return !check ? false : true ;
    }, { path: ['item'], message: 'Item invalid' }),
    stock: z.coerce.number().nonnegative(),
    date: z.date()
})
.refine(async (data) => {
    const item = await db.item.findUnique({where: { id: data.item }}) ;

    return (data.stock + (item?.stock ?? 0) > (item?.max ?? 0)) ? false : true ;
}, { path: ['stock'], message: 'Stock cant gratter than item max' })
;