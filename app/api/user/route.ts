import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt' ;
import { loginValidation as userSchema } from "@/lib/validations/login";

export async function POST(req: Request) {    
    try {
        const body = await req.json() ;
        const {username, password} = userSchema.parse(body) ; 
        
        
        const existsByUsername = await db.user.findUnique({
            where: {username: username}
        }) ;
        
        if(existsByUsername) {
            return NextResponse.json({user: null, message: 'Username already exist'}, {status: 409}) ;
        }

        const hashedPassword = await hash(password, 10) ;
        const newUser = await db.user.create({
            data: {
                username: username,
                password: hashedPassword,
            }
        });

        const {password: newUserPassword, ...res} = newUser ;
        return NextResponse.json({user: res, message: 'User created successfully'}, {status: 201}) ;
    } catch(error) {

        return NextResponse.json({error: error, message: 'Somethig wrong'}, {status: 422}) ;
    }
}