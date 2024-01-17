"use client"

import { useFieldArray, useForm } from 'react-hook-form' ; 
import {
    Form,   
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form' ;
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode, useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { ItemType } from '@/app/(root)/item/schema';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

import { format } from "date-fns"
import { OrderFormType, orderFormSchema } from '@/lib/validations/order';
import { OrderType } from '@/app/(root)/order/schema';
import { cn } from '@/lib/utils';
import { objectUtil } from 'zod';


interface Props {
    order?: OrderFormType;
    btnTitle: string;
    children?: ReactNode,
    submitHandler: Function,
    showActionToggle: (open: boolean) => void
}

async function getItems(): Promise<ItemType[]> {
  const res =  await fetch('http://localhost:3000/api/item',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache:"no-cache"
  }) ;

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return data.data;
}

const OrderForm =  ({ order, btnTitle, submitHandler, showActionToggle }: Props) => {
  const router = useRouter() ;
  const { toast } = useToast()

  const [items, setItems] = useState<ItemType[]>([]);
  useEffect(() => {
    const data = async () => {
      const result = await getItems();
      setItems(result);
    };
    data();
  }, []);

  const form = useForm({
      resolver: zodResolver(orderFormSchema),
      defaultValues: {
        buyer: order?.buyer ?? '',
        order: order?.order ?? [{item: 0, qty: 0}],
        date: order?.date ?? new Date(),
      }
  }) ;

  const { register, control } = form ;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'order',
  });


  async function onSubmit(values : OrderFormType) {
    const response = await submitHandler(values) ;

    if(response.ok) {
      form.reset();

      showActionToggle(false);

      router.refresh() ;

    } else {
      toast({
        title: "Opss",
        description: "Something wrong",
        variant: 'destructive'
      })
    }
  }

    return (
      <>
      <Form {...form}>
        <form
          className='grid gap-4 py-4'
        >
          <FormField
            control={form.control}
            name='buyer'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Buyer
                </FormLabel>
                <FormControl>
                  <Input
                    type='string'
                    className='col-span-3'
                    placeholder="Buyer"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='col-span-4 text-right' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full col-span-3 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className='col-span-4 text-right' />
              </FormItem>
            )}
          />
          
          <h3>Order list</h3>
          {fields.map((field, index) => (
            <div key={field.id} className='grid grid-cols-6 gap-3 '>
              <FormField
                control={form.control}
                name={`order.${index}.item`} 
                render={({ field }) => (
                  <FormItem className='col-span-3' >
                    <FormControl >
                      <Select  defaultValue={`${field.value}`} onValueChange={field.onChange}>
                        <SelectTrigger >
                          <SelectValue placeholder="Select a item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                          <SelectLabel>Item</SelectLabel>
                          {items.map((item) => (
                              <SelectItem key={item.id} value={`${item.id}`}>
                                  {item.name}
                              </SelectItem>
                          ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select> 
                    </FormControl>
                    <FormMessage className='col-span-4 text-right'/>
                  </FormItem>
                )}/>
                
                <FormField
                  control={form.control}
                  name={`order.${index}.qty`}
                  render={({ field }) => (
                    <FormItem className='col-span-2' >
                      <FormControl>
                        <Input
                          type='number'
                          className=''
                          placeholder="Stock"
                          min={1}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='w-full text-right' />
                    </FormItem>
                  )}
                />

              <Button onClick={() => remove(index)} variant={'outline'} disabled={(index < 1 )}>X</Button>
            
            </div>
          ))} 
          
          

          <Button type="button" className='w-1/3 float-end' disabled={(items.length === fields.length)} onClick={() => append({ item: 0, qty: 0 })}>
            Add new item
          </Button> 

          
        </form>
      </Form>
      <DialogFooter className='flex justify-end gap-3 items-center'>
        <DialogClose asChild>
          <Button type="button" variant={'outline'}>
            Close
          </Button>
        </DialogClose>
        <Button type='submit' 
        onClick={form.handleSubmit(onSubmit)} 
        className='bg-red-600 hover:bg-red-700'>
          {btnTitle}
        </Button>
      </DialogFooter>
    </>
  )
}

export default OrderForm