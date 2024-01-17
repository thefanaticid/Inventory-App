import * as z from 'zod' ;

export const orderFormSchema = z.object({
    buyer: z.string().min(1, {message: 'Buyer required'}),
    order: z.array(
      z.object({
        item: z.coerce.number().nonnegative(),
        qty: z.coerce.number().nonnegative(),
      })
    ).min(1),
    date: z.coerce.date(),
});

export type OrderFormType = z.infer<typeof orderFormSchema>