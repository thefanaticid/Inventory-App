import { authOption } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { stockFormSchema } from "@/lib/validations/stock";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

 
export async function GET(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;

        const stock = await db.stock.findFirstOrThrow({
            where: { id: parseInt(`${id}`) },
            include: {
                item: {
                    select: {
                        name: true
                    }
                }
            },
        })

        return NextResponse.json({data: stock, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    try {
        // const session = await getServerSession(authOption) ;
        const session = {
            user: {
                id: '1'
            }
        };

        const { id } = params ;
        const body = await req.json() ;
        body.dateIn = new Date(body.dateIn) ;

        const {item, stock, dateIn} = stockFormSchema.parse(body) ; 

        // Start a transaction
        const result = await db.$transaction([
            db.stock.findFirstOrThrow({
                select: {
                    item: {
                        select: {
                            stock: true
                        }
                    },
                    stockIn: true,
                },
                where: { id: parseInt(`${id}`) },        
            }),
            // Update stock record
            db.stock.update({
                where : { id: parseInt(`${id}`) },
                data: {
                    itemId: item,
                    createdBy: parseInt(session?.user.id) ,
                    dateIn: dateIn,
                    stockIn: stock,
                }
            }),
        ]);
        
        const newStock = (result[0].item.stock - result[0].stockIn)  + result[1].stockIn ;
        await db.item.update( {
            where: {id: item },
            data: {
                stock: newStock
            }
        }) ;

        return NextResponse.json({data: result[1], status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params ;

        const stockDeleted= await db.stock.delete({
            where : { id: parseInt(`${id}`) },
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