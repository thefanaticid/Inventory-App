import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from "@/components/ui/toaster"

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
      <html lang="en">
        <body className={`${inter.className} bg-gray-50`}>
          <main className='flex h-screen flex-col justify-center items-center'>
            {children}
          </main>
          <Toaster />
        </body>
      </html>
  )
}
