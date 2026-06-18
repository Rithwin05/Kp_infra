import { Playfair_Display, Inter, Montserrat } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  title: 'KP Infra Projects — Building Telangana\'s Future Since 2003',
  description: 'Premium HMDA & DTCP approved plots, luxury villas, farm lands and infrastructure developments across Hyderabad and Telangana. Schedule a site visit today.',
  keywords: 'HMDA plots Hyderabad, farm lands Shadnagar, investment plots Telangana, luxury villas, DTCP approved layouts, KP Infra',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="font-body bg-background text-foreground antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
