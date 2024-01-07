import * as z from 'zod' ;

export const itemValidation = z.object({
    name: z.string().min(1),
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    stock: z.number().nonnegative(),
    unit: z.string().min(1)
}
);