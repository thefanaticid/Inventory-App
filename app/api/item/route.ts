import { db } from "@/lib/prisma";
import { itemFormSchema } from "@/lib/validations/item";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const items = await db.item.findMany();

        return NextResponse.json({data: items, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json() ;
        const {name, min, max, stock, unit} = itemFormSchema.parse(body) ; 

        const newItem = await db.item.create({
            data: {
                name: name,
                min: min,
                max: max,
                stock: stock,
                unit: unit
            }
        });

        return NextResponse.json({data: newItem, status: true}, {status: 201}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}