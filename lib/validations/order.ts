import * as z from 'zod' ;

const orderInfoSchema = z.object({
    item: z.number(),
    qty: z.number().nonnegative(),
})
  
// Now add this object into an array
const orderFormSchema = z.array(orderInfoSchema)


export type OrderFormType = z.infer<typeof orderFormSchema>