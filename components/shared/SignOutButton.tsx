"use client";

import { signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link';

function handleClick () {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`
    })
}

const SignOutButton = () => {
  const {data: session} = useSession() ;
  return ( 
    (session && <Link href={''} onClick={handleClick}>
    <div className='flex cursor-pointer gap-4 p-4'>
      <Image
        src='/assets/logout.svg'
        alt='logou t'
        width={24}
        height={24}
      />

      <p className='text-dark-1 max-lg:hidden'>Logout</p>
    </div>
  </Link> )
   )
}

export default SignOutButton