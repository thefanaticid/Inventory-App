import { db } from "@/lib/prisma";
import { orderFormSchema } from "@/lib/validations/order";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import { NextResponse } from "next/server";

export async function  GET(req: Request) {
    try {
        const ordersWithDetails = await db.order.findMany({
            select: {
                id: true,
                buyer: true,
                orderDate: true,
                detail: {
                    select: {
                        item: {
                            select: {
                                id: true,
                                name: true,
                                unit: true
                            }
                        },
                        quantity: true,
                    }
                }
            }
        });

        // Flatten the details        
        const flattenedOrders = ordersWithDetails.map(order => {
            const orderDetails = order.detail.map(detail => ({
              id: detail.item.id,
              item: detail.item.name,
              unit: detail.item.unit,
              qty: detail.quantity
            }));
          
            const totalQuantity = orderDetails.reduce((total, detail) => total + detail.qty, 0);
          
            return {
              id: order.id,
              buyer: order.buyer,
              date: order.orderDate,
              order: orderDetails,
              totalQuantity
            };
        });
 
        return NextResponse.json({ status: true, data: flattenedOrders }) ;
    } catch(error) {
        return NextResponse.json({ status: true, error: error }) ;
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json() ;
        const  { buyer, order, date } = orderFormSchema.parse(body) ; 
    
        // Mulai transaksi
        const newOrder = await db.order.create({
            data: {
                buyer,
                orderDate: date,
                // asumsikan createdBy adalah ID pengguna yang sedang login
                createdBy: 1,
                detail: {
                    create: [
                      ...order.map((order) => (
                        {
                            itemId: order.item,
                            quantity: order.qty
                        }
                      )),
                    ],
                }
            },
            include: {
                detail: true,
            }
        }) ;

        // Memperbarui stock setiap item yang diorder
        newOrder.detail.forEach(async (detail) => {

            await db.item.update({
                where: { id: detail.itemId },
                data: { stock : {
                    decrement: detail.quantity
                } },
            });
        
        });

       return NextResponse.json({status: true, data: newOrder }, {status: 201}) ;
       
    } catch(error) {

        return NextResponse.json({status: false, error: error }, {status: 500}) ;
    }
}