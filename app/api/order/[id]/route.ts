import { db } from "@/lib/prisma";
import { orderFormSchema } from "@/lib/validations/order";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: number }}) {
    try {
        params.id = parseInt(`${params.id}`) ; 
        const body = await req.json() ;
        const  { buyer, order, date } = orderFormSchema.parse(body) ;
        
        const dataOrder = await db.order.findUniqueOrThrow({
            where: { id: params.id}, // Ganti dengan ID order yang ingin diperbarui
            include: { detail: true },
        });

        // Memperbarui data order
        await db.order.update({
            where: { id: params.id },
                data: {
                buyer: buyer, 
                orderDate: date
            },
        });
          
        // Menghapus semua detail order lama dan mengembalikan stok
        await Promise.all(
            dataOrder.detail.map(async (detail) => {
                // Mencari item berdasarkan ID
                const item = await db.item.findUniqueOrThrow({
                    where: { id: detail.itemId },
                });
            
                // Mengembalikan stok item
                await db.item.update({
                    where: { id: item.id },
                    data: { stock: item.stock + detail.quantity },
                });
            
                // Menghapus detail order
                return db.detailOrder.delete({
                    where: { id: detail.id },
                });
            })
        );
        
        // Membuat detail order baru
        const newDetails = order.map((item) => ({
            itemId: item.item,
            quantity: item.qty
        })) ;
        
        await Promise.all(
            newDetails.map((detail) =>
                db.detailOrder.create({
                    data: {
                        ...detail,
                        orderId: dataOrder.id,
                    },
                })
            )
        );
        
        // Memperbarui stok item berdasarkan detail order baru
        newDetails.forEach(async (detail) => {
            const item = await db.item.findUniqueOrThrow({
                where: { id: detail.itemId },
            });
        
            await db.item.update({
                where: { id: item.id },
                data: { stock: item.stock - detail.quantity },
            });
        });
    
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