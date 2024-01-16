import { db } from "@/lib/prisma";
import { itemFormSchema } from "@/lib/validations/item";
import { NextResponse } from "next/server";
 
export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;

        const item = await db.item.findFirstOrThrow({
            where: { id: parseInt(`${id}`) }
        })

        return NextResponse.json({data: item, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;
        const body = await req.json() ;
        const {name, min, max, stock, unit} = itemFormSchema.parse(body) ; 

        const itemUpdated = await db.item.update({
            where: { id: parseInt(`${id}`) },
            data: {
                name: name,
                min: min,
                max: max,
                stock: stock,
                unit: unit
            }
        }) ;
        
        return NextResponse.json({data: itemUpdated, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;
        const itemDeleted = await db.item.delete({
            where: { id: parseInt(`${id}`) },
        }) ;
        
        return NextResponse.json({data: itemDeleted}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: 'false', error : error }, {status: 500}) ;
    }
}