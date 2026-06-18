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
  title: 'Kings Pride Infra — A Bridge to Your Dream Home | Est. 2003',
  description: 'K.P. Infra Projects Pvt. Ltd. — Telangana\'s trusted real estate developer since 2003. Explore Golden Palm City (NH-44, Macharam), Vantage Farms, Chandan Valley and our delivered portfolio of HMDA, DTCP & MUDA approved layouts.',
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
