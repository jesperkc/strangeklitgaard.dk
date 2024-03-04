import type { Metadata } from 'next'
import { Source_Serif_4, Ultra } from 'next/font/google'
import './globals.css'

const headerfont = Ultra({ subsets: ['latin'], weight: '400' })
const bodyfont = Source_Serif_4({ subsets: ['latin'], weight: '200' })

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
    '--bodyfont': bodyfont.style.fontFamily,
    '--headerfont': headerfont.style.fontFamily,
  } as React.CSSProperties

  return (
    <html lang="en">
      <body style={style}>{children}</body>
    </html>
  )
}
