import * as z from 'zod'

export const stockSchema = z.object({
    id: z.number(),
    itemId: z.coerce.number().nonnegative(),
    stockIn: z.coerce.number().nonnegative(),
    dateIn: z.coerce.date()
});


export type StockType = z.infer<typeof stockSchema>