import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import './globals.css'

const bodyfont = Source_Serif_4({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Jesper Strange Klitgaard',
  description: 'Freelance frontend developer with a passion for UI/UX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const style = {
    '--headerfont': bodyfont.style.fontFamily,
  } as React.CSSProperties

  return (
    <html lang="en">
      <body style={style}>{children}</body>
    </html>
  )
}
