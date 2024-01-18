import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try { 
        const items = await db.item.findMany({
            select: {
              name: true,
              orders: {
                select: {
                  quantity: true
                }
              }
            }
          });
          
          const itemList = items.map(item => ({
            name: item.name,
            totalQuantity: item.orders.reduce((acc, order) => acc + order.quantity, 0)
          }));
          
          itemList.sort((a, b) => b.totalQuantity - a.totalQuantity);

        return NextResponse.json({status: true, data: itemList}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error: error}, {status: 500}) ;
    }
}