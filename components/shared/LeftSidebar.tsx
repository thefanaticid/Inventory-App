"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { sidebarLinks } from "@/constants";
import SignOutButton from "./SignOutButton";

export const LeftSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();


    return (
        <section className='custome-scrollbar leftsidebar'>
            <div className="flex w-full flex-2  flex-col gap-6 px-6">
            { sidebarLinks.map((link) => {
                const isActive =
                (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route;

                return (
                    <Link
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link ${isActive && "bg-gray-200 "}`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                        />
                        <p className={`max-lg:hidden`}>{link.label}</p>
                    </Link>
                ) ;

            })

            }
            </div>

            <div className='mt-10 px-6'>
                <SignOutButton />
               
                {/* <SignedIn>
                <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                    <div className='flex cursor-pointer gap-4 p-4'>
                    <Image
                        src='/assets/logout.svg'
                        alt='logout'
                        width={24}
                        height={24}
                    />

                    <p className='text-dark-1 max-lg:hidden'>Logout</p>
                    </div>
                </SignOutButton>
                </SignedIn> */}
            </div>
        </section>
    )
}
