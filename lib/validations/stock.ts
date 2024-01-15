import * as z from 'zod' ;
import { db } from '../prisma';


export const stockValidation = z.object({
    item: z.number().nonnegative()
    .refine(async (data) => {
        const check = await db.item.findUnique({where: {id: data}}) ;

        return !check ? false : true ;
    }, { path: ['item'], message: 'Item invalid' }),
    stock: z.number().nonnegative(),
})
.refine(async (data) => {
    const item = await db.item.findUnique({where: { id: data.item }}) ;

    return (data.stock + (item?.stock ?? 0) > (item?.max ?? 0)) ? false : true ;
}, { path: ['stock'], message: 'Stock cant gratter than item max' })
;