import * as z from 'zod' ;

export enum Unit {
    kg = "kg",
    box = "box",
    gram = "gram",
    liter = "liter",
    pack = "pack",
}

export const itemValidation = z.object({
    name: z.string().min(1),
    min: z.coerce.number().nonnegative(),
    max: z.coerce.number().nonnegative(),
    stock: z.coerce.number().nonnegative(),
    unit: z.nativeEnum(Unit)
})
.refine((data) => data.max > data.min, {
    path: ['max'],
    message: 'Max should be gratter than min'
} )
;