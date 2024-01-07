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
import { loginValidation } from '@/lib/validations/login';

const Login = () => {
    const form = useForm({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            username: '',
            password: ''
        }
    }) ;

    function onSubmit(values : z.infer<typeof loginValidation>) {
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
            name='username'
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
            name='password'
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
            Login
          </Button>
        </form>
      </Form>
    )
}

export default Login