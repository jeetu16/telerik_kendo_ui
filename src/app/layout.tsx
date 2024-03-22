import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@progress/kendo-theme-default/dist/all.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head >
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css"
      />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
