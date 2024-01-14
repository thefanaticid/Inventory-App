import * as z from 'zod' ;

enum Unit {
    kg = "kg",
    box = "box",
    gram = "gram",
    liter = "liter",
    pack = "pack",
}

export const itemValidation = z.object({
    name: z.string().min(1),
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    stock: z.number().nonnegative(),
    unit: z.nativeEnum(Unit)
});