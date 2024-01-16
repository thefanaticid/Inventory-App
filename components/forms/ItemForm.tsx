"use client"

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
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import { zodResolver } from '@hookform/resolvers/zod';
import { ItemFormType, Unit, itemFormSchema } from '@/lib/validations/item';
import React, { ReactNode } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { ItemType } from '@/app/(root)/item/schema';

interface Props {
    item?: ItemType;
    btnTitle: string;
    children?: ReactNode,
    submitHandler: Function,
    showActionToggle: (open: boolean) => void
}

const ItemForm = ({ item, btnTitle, submitHandler, showActionToggle }: Props) => {
  const router = useRouter() ;
  const { toast } = useToast()

  const form = useForm({
      resolver: zodResolver(itemFormSchema),
      defaultValues: {
          name: item?.name ?? '',
          min: item?.min ?? 0,
          max: item?.max ?? 0,
          stock: item?.stock ?? 0,
          unit: item?.unit ?? Unit.kg
      }
  }) ;

  async function onSubmit(values : ItemFormType) {
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
            name='name'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-right text-dark-1'>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='col-span-3'
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='col-span-4 text-right' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='min'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Min
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='col-span-3'
                    placeholder="min"
                    {...field}
                  />
                </FormControl>
                <FormMessage className='col-span-4 text-right' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='max'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Max
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='col-span-3'
                    placeholder="max"
                    {...field}
                  />
                </FormControl>
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

          <FormField
            control={form.control}
            name='unit'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-dark-1 text-right'>
                  Unit
                </FormLabel>
                <FormControl>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      <SelectLabel>Unit</SelectLabel>
                      {Object.values(Unit).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                              {unit}
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

export default ItemForm