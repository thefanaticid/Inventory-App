import { authOption } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { stockValidation } from "@/lib/validations/stock";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

 
export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;

        const stock = await db.stock.findFirstOrThrow({
            where: { id: parseInt(`${id}`) }
        })

        return NextResponse.json({data: stock, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    try {
        const session = await getServerSession(authOption) ;
        const { id } = params ;
        const body = await req.json() ;
        const {item, stock} = stockValidation.parse(body) ; 

        // Start a transaction
        const result = await db.$transaction([
            db.stock.findFirstOrThrow({
                where: { id: id },
                
            }),
            // Insert new Stock record
            db.stock.update({
                where : { id: id },
                data: {
                    itemId: item,
                    createdBy: session?.user.id ? parseInt(session?.user.id) : 0,
                    stockIn: stock,
                }
            }),
        ]);
        
        await db.item.update( {
            where: {id: item },
            data: {
                stock: {
                    decrement: result[0].stockIn,
                    increment: result[1].stockIn,
                },
            }
        }) ;

        return NextResponse.json({data: result[0], status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;

        const stockDeleted= await db.stock.delete({
            where : { id: id },
        }) ;

        // Update related Item's stock attribute
        await db.item.update({
        where: { id: stockDeleted.itemId },
            data: {
                stock: {
                    decrement: stockDeleted.stockIn,                   
                },
            }
        })

        return NextResponse.json({data: stockDeleted}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: 'false', error : error }, {status: 500}) ;
    }
}