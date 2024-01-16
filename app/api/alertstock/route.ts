import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const result = await db.$queryRaw`SELECT name, stock FROM item where stock - min <= 5 order by stock asc`;
        
        return NextResponse.json({status: false, data: result}) ;
    } catch(error) {
        return NextResponse.json({status: false, error: error}) ;
    }
}