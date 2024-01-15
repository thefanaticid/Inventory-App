import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { stockValidation } from "@/lib/validations/stock";
import { NextApiRequest } from "next";

export async function POST() {
    try {
        const items = await db.stock.findMany();

        return NextResponse.json({data: items, status: true}, {status: 200}) ;
    } catch(error) {
        return NextResponse.json({status: false, error : error }, {status: 500}) ;
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOption) ;
    return NextResponse.json({data: session?.user.id}) ;
    try {
        const session = await getServerSession(authOption) ;
        const body = await req.json() ;
        const {item, stock } = stockValidation.parse(body) ; 

        // Start a transaction
        const result = await db.$transaction([
            // Insert new Stock record
            db.stock.create({
                data: {
                    itemId: item,
                    createdBy: session?.user.id ? parseInt(session?.user.id) : 0,
                    stockIn: stock,
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