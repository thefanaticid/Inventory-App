import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { stockFormSchema } from "@/lib/validations/stock";

export async function GET() {
    try {
        const stocks = await db.stock.findMany({
            include: {
                item: {
                    select: {
                        name: true
                    }
                }
            },
        });

        return NextResponse.json({data: stocks, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function POST(req: Request) {
    try {
        // const session = await getServerSession(authOption) ;
        const session = {
            user: {
                id: '1'
            }
        } ;
        const body = await req.json() ;
        
        body.dateIn = new Date(body.dateIn) ;

        const {item, stock, dateIn } = stockFormSchema.parse(body) ; 

        // Start a transaction
        const result = await db.$transaction([
            // Insert new Stock record
            db.stock.create({
                data: {
                    itemId: item,
                    createdBy: parseInt(session?.user.id) ,
                    stockIn: stock,
                    dateIn: dateIn
                }
            }),

            // Update related Item's stock attribute
            db.item.update({
                where: { id: item },
                    data: {
                        stock: {
                            increment: stock,
                        },
                    }
                }),
        ]);
  
  
        return NextResponse.json({data: result[0], status: true}, {status: 201}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}