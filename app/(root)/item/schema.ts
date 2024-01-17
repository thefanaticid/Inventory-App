import { Unit } from '@/lib/validations/item';
import * as z from 'zod'

export const itemSchema = z.object({
    id: z.number(),
    name: z.string().min(1, {message: 'Name required'}),
    min: z.coerce.number().nonnegative(),
    max: z.coerce.number().nonnegative(),
    stock: z.coerce.number(),
    unit: z.nativeEnum(Unit)
});


export type ItemType = z.infer<typeof itemSchema>