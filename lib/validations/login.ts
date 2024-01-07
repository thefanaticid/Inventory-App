import * as z from 'zod' ;

export const loginValidation = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
}
);