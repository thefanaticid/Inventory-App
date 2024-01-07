import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Topbar } from '@/components/shared/Topbar'
import Buttombar from '@/components/shared/Buttombar'
import { LeftSidebar } from '@/components/shared/LeftSidebar'
import { RightSidebar } from '@/components/shared/RightSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Barokah Inventory',
  description: 'An App Monitor Barokah Inventory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-50`}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            {/* <RightSidebar /> */}
          </main>
          <Buttombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
