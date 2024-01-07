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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { zodResolver } from '@hookform/resolvers/zod';
import { itemValidation } from '@/lib/validations/item';

interface Props {
    item: {
      id: string;
      name: string;
      min: number;
      max: number;
      stock: number;
      unit: string;
    };
    btnTitle: string;
  }

const Item = ({ item, btnTitle }: Props) => {
    const form = useForm({
        resolver: zodResolver(itemValidation),
        defaultValues: {
            name: item?.name ?? '',
            min: item?.min ?? '',
            max: item?.max ?? '',
            stock: item?.stock ?? '',
            unit: item?.unit ?? ''
        }
    }) ;

    function onSubmit(values : z.infer<typeof itemValidation>) {
        console.log(values)
    }

    return (
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
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='account-form_input no-focus'
                    placeholder="Username"
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
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='account-form_input no-focus'
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type='submit' className='bg-red-500'>
            {btnTitle}
          </Button>
        </form>
      </Form>
    )
}

export default Item