import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Topbar = () => {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="./logo.svg" alt="logo" width={28} height={28}/>
                <p className="text-heading3-bold text-dark max-xs:hidden">Barokah Inventory</p>
            </Link>
            
            {/* <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image 
                                    src="assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                    appearance={
                        {
                            elements: {
                                organizationSwitcherTrigger: "py-2 px-4"
                            }
                        }
                    }
                />
            </div> */}
        </nav>
    )
}
