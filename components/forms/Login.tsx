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
import { signIn} from 'next-auth/react' ;

import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidation } from '@/lib/validations/login';
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const Login = () => {
    const router = useRouter() ;
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            username: '',
            password: ''
        }
    }) ;

    async function onSubmit(values : z.infer<typeof loginValidation>) {
      const loginData = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      }) ;

      if(loginData?.error) {
          toast({
            title: "Opss",
            description: "Username or password wrong",
            variant: 'destructive'
          })
      } else {
        router.push('/')
      };

      // const response = await fetch('/api/user',
      // {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(
      //     {
      //       username: values.username,
      //       password: values.password
      //     }
      //   )
      //  });

      // if(response.ok) {
      //   router.push('/') ;
      // } else {
      //   console.log('Error: Login valied')
      // }
    }

    return (
        <Form {...form}>
        <form
          className='flex flex-col justify-start gap-6 '
          onSubmit={form.handleSubmit(onSubmit)}
        >
  
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-1'>
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
              <FormItem className='flex w-full flex-col gap-1'>
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
  
          <Button type='submit' className='bg-red-500 hover:bg-red-600'>
            Login
          </Button>
        </form>
      </Form>
    )
}

export default Login