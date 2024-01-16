import * as z from 'zod' ;

export enum Unit {
    kg = "kg",
    box = "box",
    gram = "gram",
    liter = "liter",
    pack = "pack",
}

export const itemFormSchema = z.object({
    name: z.string().min(1, {message: 'Name required'}),
    min: z.coerce.number().nonnegative(),
    max: z.coerce.number().nonnegative(),
    stock: z.coerce.number().nonnegative(),
    unit: z.nativeEnum(Unit)
})
.refine((data) => data.max > data.min, {
    path: ['max'],
    message: 'Max should be gratter than min'
} )
.refine((data) => data.stock <= data.max, {
    path: ['stock'],
    message: 'Stock should be lower than max'
} )
;


export type ItemFormType = z.infer<typeof itemFormSchema>