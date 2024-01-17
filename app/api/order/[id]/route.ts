import { db } from "@/lib/prisma";
import { orderFormSchema } from "@/lib/validations/order";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: number }}) {
    try {
        const body = await req.json() ;
        const  { buyer, order, date } = orderFormSchema.parse(body) ; 
        // Gunakan transaksi Prisma
        
        // Gunakan transaksi Prisma
        const updatedOrders = await db.$transaction([
            db.order.update({
                where: { id: params.id },
                data: {
                    buyer,
                    orderDate: date,
                },
                include: {
                    detail: true, // Tambahkan ini untuk mendapatkan id dari order yang diperbarui
                },
            }),
        ]);
        
        order.map(async ({  item: itemId, qty: quantity }) => {
            await db.$transaction([
                db.detailOrder.update({
                where: { id: params.id },
                data: {
                    itemId,
                    quantity,
                },
                }),
                db.item.update({
                    where: { id: itemId },
                    data: { stock: { decrement: quantity } },
                }),
            ])
        }) ;
        
        return NextResponse.json({status: true, data: 'o' }, {status: 200}) ;

    } catch(error) {
        return NextResponse.json({status: false, error: error }, {status: 500}) ;
    }
}

export async function DELETE(req: Request, { params }: { params: { id: number }}) {
    try {
        params.id = parseInt(`${params.id}`) ; 
        const deleteOrder = await db.$transaction([
            db.order.findFirstOrThrow({
                where: {
                    id: params.id
                },
                include: {
                    detail: {
                        include: {
                            item: true
                        }
                    }
                }
            }),
            db.detailOrder.deleteMany({
                where: {
                    orderId: params.id
                }
            }),
            db.order.delete({
                where: {
                    id: params.id
                }
            }),
        ]);

        for(let i = 0 ; i < deleteOrder[0].detail.length ; i++) {
            const detail = deleteOrder[0].detail[i] ;
            const item = deleteOrder[0].detail[i].item ;

            await db.item.update({
                where: {id:  detail.itemId},
                data: {
                    stock: {
                        increment: detail.quantity
                    }
                }
            })
        }
        
        return NextResponse.json({status: true, data: deleteOrder[2] }, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: true, error: error }, {status: 500}) ;
    }   
}