'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, MessageCircle, Calendar, Download, MapPin, ArrowRight, ArrowUpRight,
  CheckCircle2, Award, Building2, Leaf, Trees, Home, Landmark, Shield,
  Sparkles, Star, ChevronRight, Menu, X, PlayCircle, TrendingUp, Users,
  Clock, BadgeCheck, Mail, ChevronDown, Quote, Compass, Wallet, LineChart,
  Plane, GraduationCap, Train, Hospital
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { toast } from 'sonner'

// ------------------- DATA -------------------
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1635111057505-3b7dcc2b72fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1756435292384-1bf32eff7baf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
]

const PROJECTS = [
  {
    id: 'kp-emerald-county',
    name: 'KP Emerald County',
    category: 'HMDA',
    status: 'Ongoing',
    type: 'HMDA Plots',
    location: 'Shadnagar, Hyderabad',
    distance: '5 km from ORR',
    price: '₹ 18,500 / sq.yd onwards',
    possession: 'Dec 2025',
    rera: 'P02400003251',
    image: 'https://images.pexels.com/photos/34823937/pexels-photo-34823937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    highlights: ['Gated Community', 'Clubhouse', '40 ft Roads', 'Avenue Plantation'],
  },
  {
    id: 'kp-grand-villas',
    name: 'KP Grand Villas',
    category: 'Villas',
    status: 'Upcoming',
    type: 'Luxury Villas',
    location: 'Kollur, Hyderabad',
    distance: '2 km from Outer Ring Road',
    price: '₹ 3.85 Cr onwards',
    possession: 'Jun 2026',
    rera: 'P02400004122',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
    highlights: ['4 & 5 BHK Villas', 'Smart Homes', 'Private Pool', 'Concierge'],
  },
  {
    id: 'kp-greens-retreat',
    name: 'KP Greens Retreat',
    category: 'Farm Lands',
    status: 'Ongoing',
    type: 'Managed Farm Lands',
    location: 'Sadasivpet, Telangana',
    distance: '45 min from Gachibowli',
    price: '₹ 8,99,000 onwards',
    possession: 'Ready to Register',
    rera: 'P02400005099',
    image: 'https://images.unsplash.com/photo-1635111057505-3b7dcc2b72fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
    highlights: ['Mango Orchards', 'Caretaker Service', 'Farm Stay', 'Solar Powered'],
  },
  {
    id: 'kp-royal-meadows',
    name: 'KP Royal Meadows',
    category: 'DTCP',
    status: 'Completed',
    type: 'DTCP Plots',
    location: 'Yadadri, Telangana',
    distance: '60 km from Airport',
    price: '₹ 9,250 / sq.yd',
    possession: 'Handover Done',
    rera: 'P02300001847',
    image: 'https://images.unsplash.com/photo-1756435292384-1bf32eff7baf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
    highlights: ['Temple Town', 'Resale 2.3x', 'Clear Titles', 'Bank Loans'],
  },
  {
    id: 'kp-skyline-residences',
    name: 'KP Skyline Residences',
    category: 'Villas',
    status: 'Ongoing',
    type: 'High-Rise Villas',
    location: 'Tellapur, Hyderabad',
    distance: '6 km from Financial District',
    price: '₹ 2.45 Cr onwards',
    possession: 'Mar 2026',
    rera: 'P02400006611',
    image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fGJsYWNrfDE3ODE4MTMxMDR8MA&ixlib=rb-4.1.0&q=85',
    highlights: ['Rooftop Sky Lounge', 'Italian Marble', 'EV Charging', '24/7 Security'],
  },
  {
    id: 'kp-airport-heights',
    name: 'KP Airport Heights',
    category: 'HMDA',
    status: 'Upcoming',
    type: 'HMDA Plots',
    location: 'Shamshabad, Hyderabad',
    distance: '3 km from Airport',
    price: '₹ 24,000 / sq.yd onwards',
    possession: 'Sep 2026',
    rera: 'P02400007223',
    image: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85',
    highlights: ['Airport View', 'SEZ Proximity', 'Premium Boulevard', 'High Appreciation'],
  },
]

const TIMELINE = [
  { year: '2003', title: 'Foundation', desc: 'KP Infra founded with a vision to redefine Telangana real estate.' },
  { year: '2008', title: 'First Township', desc: 'Delivered our first 120-acre integrated township in Shadnagar.' },
  { year: '2014', title: 'Land Bank 1000+ Acres', desc: 'Strategic land acquisitions along the Hyderabad growth corridors.' },
  { year: '2019', title: 'Luxury Vertical Launch', desc: 'Entered the premium villa and gated community segment.' },
  { year: '2023', title: '20 Years of Trust', desc: 'Celebrated two decades with 12,000+ delighted families.' },
  { year: '2025', title: 'The Next Chapter', desc: 'Pioneering AI-led property advisory and managed farm-land assets.' },
]

const TESTIMONIALS = [
  { name: 'Ravi Teja', role: 'NRI Investor, Dubai', rating: 5, quote: 'KP Infra made my investment journey effortless from across continents. Their transparency and execution are second to none. My plot value doubled in 4 years.' },
  { name: 'Sandhya Reddy', role: 'IT Professional, Hyderabad', rating: 5, quote: 'From the first site visit to registration, the KP team treated us like family. The villa quality is comparable to international standards.' },
  { name: 'Arjun Khanna', role: 'Entrepreneur, Bangalore', rating: 5, quote: 'I have invested in three KP projects. Every commitment was honoured, every document was clean. That is rare in this industry.' },
  { name: 'Dr. Meera Iyer', role: 'NRI, San Francisco', rating: 5, quote: 'The drone walkthroughs and virtual tours sealed it for me. KP Infra is the gold standard of Hyderabad real estate.' },
]

const BLOGS = [
  { title: 'Why Shadnagar is the Next Real Estate Goldmine', tag: 'Market Insights', date: 'Jun 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85' },
  { title: 'Hyderabad 2030: Infrastructure Megatrends Investors Must Watch', tag: 'Investment', date: 'May 2025', read: '8 min', img: 'https://images.unsplash.com/photo-1637340139454-35be65edf2bb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fGJsYWNrfDE3ODE4MTMxMDR8MA&ixlib=rb-4.1.0&q=85' },
  { title: 'HMDA vs DTCP Approvals \u2014 The Complete Buyer Guide', tag: 'Guide', date: 'May 2025', read: '5 min', img: 'https://images.unsplash.com/photo-1525367922492-f15fe7b709cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fGJsYWNrfDE3ODE4MTMxMDR8MA&ixlib=rb-4.1.0&q=85' },
]

const TRUST_STATS = [
  { value: 22, suffix: '+', label: 'Years of Legacy', icon: Award },
  { value: 12000, suffix: '+', label: 'Happy Families', icon: Users },
  { value: 48, suffix: '', label: 'Projects Delivered', icon: Building2 },
  { value: 3200, suffix: '+', label: 'Acres Developed', icon: Trees },
]

const APPROVALS = ['HMDA', 'DTCP', 'RERA Certified', 'ISO 9001:2015', 'CRISIL Rated', 'Bank Approved']

// ------------------- HELPERS -------------------
function useCountUp(target, inView, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [target, inView, duration])
  return val
}

const formatINR = (n) => {
  if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} L`
  return `₹ ${n.toLocaleString('en-IN')}`
}

// ------------------- COMPONENTS -------------------
function TopBar() {
  return (
    <div className="hidden md:block bg-navy-deep text-white/80 text-xs">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-gold" /> +91 98480 00000</span>
          <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-gold" /> sales@kpinfra.com</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gold" /> Hyderabad, Telangana</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gold tracking-widest font-numbers">RERA • HMDA • DTCP APPROVED</span>
        </div>
      </div>
    </div>
  )
}

function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'About', 'Projects', 'Land Bank', 'Investor Relations', 'Blogs', 'Contact']

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
      <TopBar />
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-sm border-2 border-gold flex items-center justify-center bg-navy/30 group-hover:bg-gold/10 transition">
            <span className="font-heading text-gold text-xl font-bold tracking-tighter">KP</span>
          </div>
          <div className="leading-tight">
            <div className="font-heading text-white text-lg tracking-wide">KP INFRA</div>
            <div className="text-[10px] tracking-[0.3em] text-gold uppercase font-numbers">Projects since 2003</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`}
              className="text-white/90 text-sm tracking-wide hover:text-gold transition relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button onClick={onCTA} className="bg-gold hover:bg-gold-dark text-navy font-semibold tracking-wide gold-shadow">
            <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
          </Button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-deep border-t border-gold/20 px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} onClick={() => setOpen(false)}
              className="block text-white/90 hover:text-gold py-2">{l}</a>
          ))}
          <Button onClick={() => { onCTA(); setOpen(false) }} className="w-full bg-gold text-navy font-semibold">
            <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
          </Button>
        </div>
      )}
    </header>
  )
}

function Hero({ onCTA, onBrochure }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      {HERO_IMAGES.map((src, i) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-[1800ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
          <img src={src} alt="luxury estate" className="w-full h-full object-cover ken-burns" />
        </div>
      ))}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 vignette" />

      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-numbers uppercase">Telangana&apos;s Premier Real Estate</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[88px] leading-[1.05] font-medium mb-6">
            Building <span className="text-gradient-gold italic">Telangana&apos;s</span><br />
            Future <span className="text-white/95">Since 2003</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 font-light leading-relaxed">
            Premium HMDA &amp; DTCP plots, ultra-luxury villas, managed farm lands and landmark
            infrastructure developments crafted for discerning investors and families.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button onClick={onCTA} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold tracking-wide h-14 px-8 gold-shadow text-base">
              <Calendar className="w-5 h-5 mr-2" /> Schedule Site Visit
            </Button>
            <Button onClick={onBrochure} size="lg" variant="outline" className="h-14 px-8 bg-white/5 backdrop-blur-md border-white/40 text-white hover:bg-white/15 hover:text-white text-base">
              <Download className="w-5 h-5 mr-2" /> Download Brochure
            </Button>
            <a href="https://wa.me/919848000000" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="h-14 px-8 text-white hover:bg-white/10 text-base">
                <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> Chat on WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-16 flex items-center gap-6 flex-wrap">
            {APPROVALS.slice(0, 4).map(a => (
              <div key={a} className="flex items-center gap-2 text-sm text-white/80">
                <BadgeCheck className="w-4 h-4 text-gold" /> {a}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 float-slow">
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      <div className="absolute right-6 bottom-10 flex flex-col gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`w-1 h-8 rounded-full transition-all ${i === idx ? 'bg-gold h-12' : 'bg-white/40'}`} />
        ))}
      </div>
    </section>
  )
}

function MarqueeApprovals() {
  return (
    <div className="bg-navy-deep border-y border-gold/20 overflow-hidden py-4">
      <div className="flex whitespace-nowrap marquee">
        {[...APPROVALS, ...APPROVALS, ...APPROVALS].map((a, i) => (
          <div key={i} className="flex items-center gap-3 mx-8 text-gold/80 font-numbers tracking-[0.3em] text-sm uppercase">
            <Sparkles className="w-4 h-4" /> {a}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const v = useCountUp(stat.value, inView)
  const Icon = stat.icon
  return (
    <div ref={ref} className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-gold/40 flex items-center justify-center bg-navy/5 group-hover:bg-gold/10 transition">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <div className="font-heading text-5xl md:text-6xl text-navy font-medium">
        <span className="font-numbers">{v.toLocaleString('en-IN')}</span>
        <span className="text-gold">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm tracking-[0.25em] uppercase text-muted-foreground">{stat.label}</div>
    </div>
  )
}

function TrustSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Trusted by Generations</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">A Legacy Carved in Numbers</h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUST_STATS.map(s => <StatCard key={s.label} stat={s} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className="group bg-white border border-border hover:border-gold/40 luxe-shadow rounded-sm overflow-hidden transition"
    >
      <div className="relative h-72 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-gold text-navy hover:bg-gold border-0 font-semibold tracking-wide">{p.category}</Badge>
          <Badge variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/30">{p.status}</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="text-xs tracking-[0.2em] uppercase text-gold/90">{p.type}</div>
          <h3 className="font-heading text-2xl mt-1">{p.name}</h3>
          <div className="flex items-center gap-2 text-sm text-white/85 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gold" /> {p.location}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Pricing</div>
            <div className="font-numbers font-semibold text-navy mt-1">{p.price}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Possession</div>
            <div className="font-numbers font-semibold text-navy mt-1">{p.possession}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Distance</div>
            <div className="text-sm text-navy mt-1">{p.distance}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">RERA</div>
            <div className="font-numbers text-xs text-navy mt-1">{p.rera}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {p.highlights.map(h => (
            <span key={h} className="text-xs px-2.5 py-1 bg-navy/5 text-navy border border-navy/10 rounded-sm">{h}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onBook(p)} className="flex-1 bg-navy hover:bg-navy-deep text-white">
            <Calendar className="w-4 h-4 mr-2" /> Book Visit
          </Button>
          <Button variant="outline" className="border-gold text-gold-dark hover:bg-gold hover:text-navy" onClick={() => onBook(p)}>
            <Download className="w-4 h-4" />
          </Button>
          <a href={`https://wa.me/919848000000?text=I'm interested in ${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedProjects({ onBook }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'HMDA', 'DTCP', 'Farm Lands', 'Villas']
  const list = useMemo(() => filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter), [filter])

  return (
    <section id="projects" className="py-24 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Signature Portfolio</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy max-w-xl leading-tight">Featured Projects, <span className="italic text-gradient-gold">Crafted to Inspire</span></h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase border transition ${
                  filter === f ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-border hover:border-gold hover:text-gold-dark'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map(p => <ProjectCard key={p.id} p={p} onBook={onBook} />)}
        </div>

        {list.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No projects in this category yet. Check back soon.</div>
        )}
      </div>
    </section>
  )
}

function WhyKP() {
  return (
    <section id="about" className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fGJsYWNrfDE3ODE4MTMxMDR8MA&ixlib=rb-4.1.0&q=85" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Why KP Infra</div>
          <h2 className="font-heading text-4xl md:text-5xl">Two Decades. <span className="italic text-gradient-gold">One Promise.</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-5 font-light">
            From a single layout in 2003 to one of Telangana&apos;s most respected developers,
            our journey has been built on transparency, design excellence and an obsession with delivery.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />
          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 md:px-10">
                  <div className={`p-6 border border-gold/30 bg-navy-deep/60 backdrop-blur-sm hover:border-gold transition ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="font-numbers text-gold text-3xl font-bold">{t.year}</div>
                    <h3 className="font-heading text-xl mt-2">{t.title}</h3>
                    <p className="text-white/70 text-sm mt-2 font-light">{t.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block w-4 h-4 rounded-full bg-gold ring-4 ring-gold/20 relative z-10" />
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 6500)
    return () => clearInterval(t)
  }, [])
  const t = TESTIMONIALS[i]
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Voices of Trust</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">Customer Stories</h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Quote className="w-20 h-20 text-gold/20 absolute -top-6 -left-2" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center px-6"
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-heading text-2xl md:text-3xl text-navy leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-8">
                <div className="font-semibold text-navy">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-10">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)}
                className={`h-1 transition-all ${k === i ? 'w-10 bg-gold' : 'w-5 bg-navy/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function InvestmentCalculator() {
  const [investment, setInvestment] = useState(2500000)
  const [appreciation, setAppreciation] = useState(14)
  const [years, setYears] = useState(7)

  const data = useMemo(() => {
    const arr = []
    let v = investment
    for (let y = 0; y <= years; y++) {
      arr.push({ year: `Y${y}`, value: Math.round(v) })
      v *= 1 + appreciation / 100
    }
    return arr
  }, [investment, appreciation, years])

  const future = data[data.length - 1].value
  const gain = future - investment
  const multiple = (future / investment).toFixed(2)

  const submit = async () => {
    try {
      await fetch('/api/calculator', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ investment, appreciation, years }),
      })
      toast.success('Personalized investment report saved. Our advisor will reach out.')
    } catch { toast.error('Could not save. Try again.') }
  }

  return (
    <section id="investor-relations" className="py-24 bg-gradient-to-b from-muted/40 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Investor Confidence</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">Visualise Your <span className="italic text-gradient-gold">Wealth Growth</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">A transparent estimator powered by historic Telangana plot appreciation data.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <Card className="lg:col-span-2 p-8 border-navy/10 luxe-shadow">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-navy font-medium">Investment Amount</Label>
                  <span className="font-numbers font-bold text-gold-dark">{formatINR(investment)}</span>
                </div>
                <Slider value={[investment]} min={500000} max={50000000} step={100000}
                  onValueChange={(v) => setInvestment(v[0])} />
                <div className="flex justify-between text-[10px] tracking-widest text-muted-foreground mt-2">
                  <span>5 L</span><span>5 Cr</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-navy font-medium">Expected Appreciation</Label>
                  <span className="font-numbers font-bold text-gold-dark">{appreciation}% / yr</span>
                </div>
                <Slider value={[appreciation]} min={5} max={28} step={1} onValueChange={v => setAppreciation(v[0])} />
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-navy font-medium">Holding Period</Label>
                  <span className="font-numbers font-bold text-gold-dark">{years} years</span>
                </div>
                <Slider value={[years]} min={1} max={15} step={1} onValueChange={v => setYears(v[0])} />
              </div>

              <Button onClick={submit} className="w-full bg-navy hover:bg-navy-deep text-white h-12">
                Get Personalised Report <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-3 p-8 border-navy/10 luxe-shadow bg-navy text-white">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold">Future Value</div>
                <div className="font-numbers text-2xl md:text-3xl font-bold mt-1">{formatINR(future)}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold">Net Gain</div>
                <div className="font-numbers text-2xl md:text-3xl font-bold mt-1 text-emerald-300">{formatINR(gain)}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold">Multiple</div>
                <div className="font-numbers text-2xl md:text-3xl font-bold mt-1">{multiple}x</div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 11 }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 11 }}
                    tickFormatter={(v) => v >= 10000000 ? `${(v/10000000).toFixed(1)}Cr` : `${(v/100000).toFixed(0)}L`} />
                  <Tooltip
                    contentStyle={{ background: '#061425', border: '1px solid #D4AF37', borderRadius: 4 }}
                    formatter={(v) => formatINR(v)} />
                  <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2.5} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function LandmarksStrip() {
  const items = [
    { icon: Plane, label: 'Airport', value: '3 km' },
    { icon: Train, label: 'Metro', value: '12 km' },
    { icon: GraduationCap, label: 'Top Schools', value: '5+' },
    { icon: Hospital, label: 'Multi-Specialty', value: '4 km' },
    { icon: Compass, label: 'ORR Access', value: '7 km' },
    { icon: Landmark, label: 'IT Corridor', value: '15 min' },
  ]
  return (
    <section className="py-16 bg-navy-deep text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Strategic Connectivity</div>
          <h3 className="font-heading text-3xl md:text-4xl">A Lifestyle Within Reach</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {items.map((it, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="text-center p-5 border border-gold/20 hover:border-gold transition group">
              <it.icon className="w-7 h-7 mx-auto text-gold mb-3 group-hover:scale-110 transition" />
              <div className="font-numbers text-2xl font-bold">{it.value}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-white/60 mt-1">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScheduleVisitForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', project: '', date: '', time: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Please share your name and phone.'); return }
    setLoading(true)
    try {
      const r = await fetch('/api/visits', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await r.json()
      if (data.success) {
        toast.success('Visit booked! Our relationship manager will call you within 30 minutes.')
        setForm({ name: '', phone: '', email: '', project: '', date: '', time: '', notes: '' })
      } else { toast.error('Could not book. Please try again.') }
    } catch { toast.error('Network error.') }
    setLoading(false)
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Concierge Visit</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy leading-tight">Walk the Land. <span className="italic text-gradient-gold">Feel the Vision.</span></h2>
            <p className="text-muted-foreground mt-5 font-light leading-relaxed">
              Schedule a curated site visit with our senior advisor. We arrange transportation
              from Hyderabad city centre, a private property walkthrough, and a no-pressure consultation.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Clock, t: 'Within 30 mins', d: 'Confirmation call from your relationship manager' },
                { icon: Shield, t: 'Zero Pressure', d: 'No aggressive sales tactics. Honest property guidance.' },
                { icon: Award, t: 'Premium Hospitality', d: 'Curated tour with refreshments and concierge service.' },
              ].map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{b.t}</div>
                    <div className="text-sm text-muted-foreground">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 luxe-shadow border-navy/10">
            <h3 className="font-heading text-2xl text-navy mb-6">Book Your Private Visit</h3>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs uppercase tracking-widest text-navy">Full Name *</Label>
                  <Input className="mt-1.5 h-11" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-widest text-navy">Phone *</Label>
                  <Input className="mt-1.5 h-11" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-navy">Email</Label>
                <Input className="mt-1.5 h-11" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-navy">Project of Interest</Label>
                <Select value={form.project} onValueChange={v => setForm({...form, project: v})}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Choose a project" /></SelectTrigger>
                  <SelectContent>
                    {PROJECTS.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                    <SelectItem value="Open Consultation">Open Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs uppercase tracking-widest text-navy">Preferred Date</Label>
                  <Input className="mt-1.5 h-11" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-widest text-navy">Time Slot</Label>
                  <Select value={form.time} onValueChange={v => setForm({...form, time: v})}>
                    <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Pick time" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-navy">Notes</Label>
                <Textarea className="mt-1.5" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Anything specific you'd like us to prepare for your visit?" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-gold hover:bg-gold-dark text-navy font-semibold text-base">
                {loading ? 'Booking…' : <>Confirm Site Visit <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
              <p className="text-xs text-center text-muted-foreground">Your details are confidential and used only by our sales team.</p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Blogs() {
  return (
    <section id="blogs" className="py-24 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Insights &amp; Intelligence</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy">Stories from the <span className="italic text-gradient-gold">Growth Corridor</span></h2>
          </div>
          <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">All Articles <ArrowUpRight className="w-4 h-4 ml-2" /></Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {BLOGS.map((b, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white group cursor-pointer border border-border hover:border-gold/40 transition">
              <div className="h-56 overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  <span className="text-gold-dark">{b.tag}</span> • <span>{b.date}</span> • <span>{b.read}</span>
                </div>
                <h3 className="font-heading text-xl text-navy group-hover:text-gold-dark transition leading-snug">{b.title}</h3>
                <div className="mt-5 inline-flex items-center text-sm text-navy group-hover:text-gold-dark">
                  Read more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABand({ onCTA }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1635111057505-3b7dcc2b72fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBlc3RhdGV8ZW58MHx8fHwxNzgxODEzMTExfDA&ixlib=rb-4.1.0&q=85" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-navy/85" />
      </div>
      <div className="relative container mx-auto px-6 text-center text-white">
        <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Limited Inventory</div>
        <h2 className="font-heading text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">Your address of distinction <span className="italic text-gradient-gold">awaits.</span></h2>
        <p className="text-white/80 max-w-2xl mx-auto mt-5 font-light">
          Join 12,000+ families who trusted KP Infra with the most important decision of their lives.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button onClick={onCTA} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold h-14 px-10 gold-shadow">
            Schedule Site Visit <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <a href="tel:+919848000000">
            <Button variant="outline" size="lg" className="h-14 px-10 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Phone className="w-5 h-5 mr-2" /> +91 98480 00000
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy-deep text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-sm border-2 border-gold flex items-center justify-center">
                <span className="font-heading text-gold text-xl font-bold">KP</span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-lg">KP INFRA</div>
                <div className="text-[10px] tracking-[0.3em] text-gold uppercase font-numbers">Since 2003</div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Telangana&apos;s most trusted real estate brand, building landmark addresses and lifelong relationships.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {['About', 'Projects', 'Land Bank', 'Gallery', 'Investor Relations', 'Careers', 'Blogs'].map(x =>
                <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-gold transition">{x}</a></li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Reach Us</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" /> KP House, Banjara Hills, Road No. 12, Hyderabad — 500034</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> +91 98480 00000</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> sales@kpinfra.com</div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Get curated market insights and project launch alerts.</p>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="bg-navy border-white/20 text-white placeholder:text-white/40" />
              <Button className="bg-gold hover:bg-gold-dark text-navy"><ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} KP Infra Projects Pvt. Ltd. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a className="hover:text-gold" href="#">Privacy</a>
            <a className="hover:text-gold" href="#">Terms</a>
            <a className="hover:text-gold" href="#">RERA Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FloatingActions({ onCTA }) {
  return (
    <>
      <a href="https://wa.me/919848000000?text=Hi%20KP%20Infra%20Team" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl transition group">
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute right-16 bg-white text-navy text-xs px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap font-medium">Chat with us</span>
      </a>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy text-white border-t border-gold/20 grid grid-cols-3">
        <a href="tel:+919848000000" className="py-3 text-center text-xs flex flex-col items-center gap-1 hover:bg-navy-deep">
          <Phone className="w-4 h-4 text-gold" /> Call
        </a>
        <a href="https://wa.me/919848000000" target="_blank" rel="noopener noreferrer" className="py-3 text-center text-xs flex flex-col items-center gap-1 bg-green-600">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <button onClick={onCTA} className="py-3 text-center text-xs flex flex-col items-center gap-1 bg-gold text-navy font-semibold">
          <Calendar className="w-4 h-4" /> Visit
        </button>
      </div>
    </>
  )
}

function LeadDialog({ open, onOpenChange, project }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!form.name || !form.phone) { toast.error('Please share your name and phone'); return }
    setLoading(true)
    try {
      const r = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, project: project?.name || '', interest: 'Site Visit', source: 'dialog' }),
      })
      const d = await r.json()
      if (d.success) {
        toast.success('Thank you! Our advisor will call you in the next 30 minutes.')
        onOpenChange(false)
        setForm({ name: '', phone: '', email: '' })
      }
    } catch { toast.error('Could not submit. Try again.') }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="grid grid-cols-1">
          <div className="bg-navy text-white p-8">
            <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-2">Private Consultation</div>
            <DialogTitle className="font-heading text-2xl">{project ? `Enquire: ${project.name}` : 'Schedule Your Site Visit'}</DialogTitle>
            <DialogDescription className="text-white/70 mt-2">
              Share your details and our senior advisor will arrange a curated visit within 24 hours.
            </DialogDescription>
          </div>
          <div className="p-8 space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-widest text-navy">Full Name *</Label>
              <Input className="mt-1.5 h-11" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-navy">Phone *</Label>
              <Input className="mt-1.5 h-11" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-navy">Email</Label>
              <Input className="mt-1.5 h-11" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <Button onClick={submit} disabled={loading} className="w-full h-12 bg-gold hover:bg-gold-dark text-navy font-semibold">
              {loading ? 'Submitting…' : <>Request Callback <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
            <p className="text-xs text-center text-muted-foreground">By submitting, you agree to be contacted by our sales team.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ------------------- ROOT -------------------
export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogProject, setDialogProject] = useState(null)

  const openCTA = () => { setDialogProject(null); setDialogOpen(true) }
  const onBook = (p) => { setDialogProject(p); setDialogOpen(true) }

  return (
    <main className="min-h-screen bg-background">
      <Nav onCTA={openCTA} />
      <Hero onCTA={openCTA} onBrochure={openCTA} />
      <MarqueeApprovals />
      <TrustSection />
      <FeaturedProjects onBook={onBook} />
      <WhyKP />
      <LandmarksStrip />
      <InvestmentCalculator />
      <Testimonials />
      <ScheduleVisitForm />
      <Blogs />
      <CTABand onCTA={openCTA} />
      <Footer />
      <FloatingActions onCTA={openCTA} />
      <LeadDialog open={dialogOpen} onOpenChange={setDialogOpen} project={dialogProject} />
      <div className="md:hidden h-14" />
    </main>
  )
}
