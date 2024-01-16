
import { useForm } from 'react-hook-form' ; 
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
import { StockFormType, stockFormSchema } from '@/lib/validations/stock';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { StockType } from '@/app/(root)/stock/schema';


interface Props {
    stock?: StockType;
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

const StockForm =  ({ stock, btnTitle, submitHandler, showActionToggle }: Props) => {
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
      resolver: zodResolver(stockFormSchema),
      defaultValues: {
          item: stock?.itemId ?? 1,
          stock: stock?.stockIn ?? 0,
          dateIn: stock?.dateIn ?? new Date(),
      }
  }) ;


  async function onSubmit(values : StockFormType) {
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
            name='item'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Item
                </FormLabel>
                <FormControl>
                  <Select defaultValue={`${field.value}`} onValueChange={field.onChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a unit" />
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
            )}
          />
          
          <FormField
            control={form.control}
            name='dateIn'
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
                          "w-[240px] pl-3 text-left font-normal",
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

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Stock
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='col-span-3'
                    placeholder="Stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='col-span-4 text-right' />
              </FormItem>
            )}
          />

          
        </form>
      </Form>
      <DialogFooter className='flex justify-end gap-3 items-center'>
        <DialogClose asChild>
          <Button type="button" variant={'outline'}>
            Close
          </Button>
        </DialogClose>
        <Button type='submit' onClick={form.handleSubmit(onSubmit)} className='bg-red-600 hover:bg-red-700'>
          {btnTitle}
        </Button>
      </DialogFooter>
    </>
  )
}

export default StockForm