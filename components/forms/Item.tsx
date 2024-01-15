"use client"

import * as z from "zod";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import { zodResolver } from '@hookform/resolvers/zod';
import { Unit, itemValidation } from '@/lib/validations/item';
import React, { ReactNode, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
    item?: {
      id: number;
      name: string;
      min: number;
      max: number;
      stock: number;
      unit: Unit;
    };
    btnTitle: string;
    children: ReactNode,
    submitHandler: Function,
}


const Item = ({ item, btnTitle, children, submitHandler }: Props) => {
  const router = useRouter() ;
  const [open, setopen] = useState(false);
  const { toast } = useToast()

  const handleDialogChange = () => {
    setopen(!open);
  };

  const form = useForm({
        resolver: zodResolver(itemValidation),
        defaultValues: {
            name: item?.name ?? '',
            min: item?.min ?? 0,
            max: item?.max ?? 0,
            stock: item?.stock ?? 0,
            unit: item?.unit ?? Unit.kg
        }
    }) ;

    async function onSubmit(values : z.infer<typeof itemValidation>) {
      const response = await submitHandler(values) ;
      
      if(response.ok) {
        form.reset();
        setopen(false);

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
      <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                {/* <Button className="bg-red-600 hover:bg-red-700 text-white">{btnTitle}</Button> */}
                { children }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{btnTitle}</DialogTitle>
                </DialogHeader>
                  <Form {...form}>
                  <form
                    className='flex flex-col justify-start gap-10'
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
            
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                          <FormLabel className='text-base-semibold text-dark-1'>
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              className='account-form_input no-focus'
                              placeholder="Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
            
                    <FormField
                      control={form.control}
                      name='min'
                      render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                          <FormLabel className='text-base-semibold text-dark-1'>
                            Min
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              className='account-form_input no-focus'
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='max'
                      render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                          <FormLabel className='text-base-semibold text-dark-1'>
                            Max
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              className='account-form_input no-focus'
                              placeholder="max"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='stock'
                      render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                          <FormLabel className='text-base-semibold text-dark-1'>
                            Stock
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              className='account-form_input no-focus'
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='unit'
                      render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                          <FormLabel className='text-base-semibold text-dark-1'>
                            Unit
                          </FormLabel>
                          <FormControl>
                            <Select defaultValue={field.value}>
                              <SelectTrigger className="w-full">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between items-center">
                      <DialogClose asChild>
                        <Button type="button" variant={'outline'}>
                          Close
                        </Button>
                      </DialogClose>
                      <Button type='submit' className='bg-red-500'>
                        {btnTitle}
                      </Button>

                    </div>
                  </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default Item