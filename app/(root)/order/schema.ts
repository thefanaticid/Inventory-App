import { Unit } from '@/lib/validations/item';
import * as z from 'zod'

export const orderSchema = z.object({
  id: z.number(),
  buyer: z.string(),
  date: z.coerce.date(),
  order: z.array(
    z.object({
      id: z.coerce.number() ,
      item: z.coerce.string() ,
      unit: z.nativeEnum(Unit),
      qty: z.coerce.number(),
    })
  ),
  totalQuantity: z.number()
});

export type OrderType = z.infer<typeof orderSchema>

