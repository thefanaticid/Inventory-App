"use client"

import { OrderType } from '@/app/(root)/order/schema';
import React from 'react'
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { format } from "date-fns"
import { Separator } from '../ui/separator';


type OrderViewProps = {
    order: OrderType
};

const DialogOrderView = ({ order }: OrderViewProps) => {
  return (
    <div>
        <DialogHeader>
            <DialogTitle>Order View</DialogTitle>
        </DialogHeader>
        <section>
            <div className="flex flex-col py-2 ">
                <h4 className={'text-base-regular font-bold'}>Buyer</h4>
                <span>{ order.buyer }</span>
            </div>
            <div className="flex flex-col py-2 ">
                <h4 className={'text-base-regular font-bold'}>Date</h4>
                <span>{ format(order.date, "PPP")  }</span>
            </div>
        </section>
        <h4 className={'font-bold'}>List order</h4>
        {
            order.order.map((item, index) => {
                return (
                    <div key={index} >
                        <span className='grid grid-cols-2 my-2 items-center'>
                            <h5>{item.item}</h5>
                            <p className='grid grid-cols-2 items-center'>{item.qty} {item.unit}</p>
                        </span>
                        <Separator />
                    </div>
                )
            })
        }
    </div>
  )
}

export default DialogOrderView