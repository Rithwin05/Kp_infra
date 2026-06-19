'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, MessageCircle, Calendar, Download, MapPin, ArrowRight, ArrowUpRight,
  Award, Building2, Trees, Home, Landmark, Shield, Sparkles, Star, ChevronRight,
  Menu, X, TrendingUp, Users, Clock, BadgeCheck, Mail, ChevronDown, Quote,
  Compass, LineChart, Plane, GraduationCap, Train, Hospital, FileText,
  Layers, Ruler, KeyRound, Briefcase, CheckCircle2, Globe, Hammer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { toast } from 'sonner'
import { BRAND, STATS, PROJECTS, TIMELINE, TESTIMONIALS, BLOGS, FILTERS, HERO_RENDERS } from '@/lib/projects'

const FLAGSHIP = PROJECTS.find(p => p.isFlagship)
const HERO_IMAGES = [
  HERO_RENDERS.goldenPalmTower,
  HERO_RENDERS.goldenPalmEntrance,
  HERO_RENDERS.goldenPalmGate,
  HERO_RENDERS.vantageFarms,
  HERO_RENDERS.chandanValley,
]

const APPROVALS = ['HMDA', 'DTCP', 'MUDA', 'TG RERA', 'ISO 9001:2015', 'Bank Approved']

function useCountUp(target, inView, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
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

// ============================================================
// NAV
// ============================================================
function TopBar() {
  return (
    <div className="hidden md:block bg-navy-deep text-white/80 text-xs">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-gold" /> {BRAND.phoneIntl}</span>
          <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-gold" /> {BRAND.email}</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gold" /> {BRAND.office.area}, {BRAND.office.city}</span>
        </div>
        <div className="text-gold tracking-widest font-numbers">TG RERA • DTCP • HMDA • MUDA APPROVED PROJECTS</div>
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

  const links = [
    { l: 'Home', h: '#home' },
    { l: 'Projects', h: '#projects' },
    { l: 'Flagship', h: '#flagship' },
    { l: 'Legacy', h: '#legacy' },
    { l: 'Investor', h: '#investor' },
    { l: 'Blogs', h: '#blogs' },
    { l: 'Contact', h: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'}`}>
      <TopBar />
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-sm border-2 border-gold flex items-center justify-center bg-navy/30 group-hover:bg-gold/10 transition relative">
            <span className="font-heading text-gold text-xl font-bold tracking-tighter">KP</span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-gold rounded-full" />
          </div>
          <div className="leading-tight">
            <div className="font-heading text-white text-lg tracking-wide">{BRAND.displayName}</div>
            <div className="text-[10px] tracking-[0.3em] text-gold uppercase font-numbers">Est. {BRAND.established} • Hyderabad</div>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-7">
          {links.map(({ l, h }) => (
            <a key={l} href={h}
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

        <button className="xl:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-navy-deep border-t border-gold/20 px-6 py-4 space-y-3">
          {links.map(({ l, h }) => (
            <a key={l} href={h} onClick={() => setOpen(false)}
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

// ============================================================
// HERO
// ============================================================
function Hero({ onCTA, onBrochure }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 6500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative h-screen min-h-[760px] w-full overflow-hidden">
      {HERO_IMAGES.map((src, i) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-[1800ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
          <img src={src} alt="" className="w-full h-full object-cover ken-burns" loading={i === 0 ? 'eager' : 'lazy'} />
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
            <span className="text-gold text-xs tracking-[0.4em] font-numbers uppercase">{BRAND.displayName} • Since {BRAND.established}</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[88px] leading-[1.05] font-medium mb-6">
            A Bridge to Your<br />
            <span className="text-gradient-gold italic">Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 font-light leading-relaxed">
            Twenty-two years of crafting Telangana&apos;s most trusted addresses — from integrated
            townships and managed farm lands to our flagship NH-44 highway city,
            <span className="text-gold"> Golden Palm City.</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button onClick={onCTA} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold tracking-wide h-14 px-8 gold-shadow text-base">
              <Calendar className="w-5 h-5 mr-2" /> Schedule Site Visit
            </Button>
            <a href="#flagship">
              <Button size="lg" variant="outline" className="h-14 px-8 bg-white/5 backdrop-blur-md border-white/40 text-white hover:bg-white/15 hover:text-white text-base">
                Discover Golden Palm City <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="h-14 px-8 text-white hover:bg-white/10 text-base">
                <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-16 flex items-center gap-6 flex-wrap">
            {APPROVALS.slice(0, 5).map(a => (
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
          <button key={i} onClick={() => setIdx(i)} aria-label="hero slide"
            className={`w-1 rounded-full transition-all ${i === idx ? 'bg-gold h-12' : 'bg-white/40 h-8'}`} />
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

// ============================================================
// TRUST
// ============================================================
function StatCard({ value, suffix, label, icon: Icon }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const v = useCountUp(value, inView)
  return (
    <div ref={ref} className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-gold/40 flex items-center justify-center bg-navy/5 group-hover:bg-gold/10 transition">
        <Icon className="w-7 h-7 text-gold" />
      </div>
      <div className="font-heading text-5xl md:text-6xl text-navy font-medium">
        <span className="font-numbers">{v.toLocaleString('en-IN')}</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="mt-2 text-sm tracking-[0.25em] uppercase text-muted-foreground">{label}</div>
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
          <StatCard value={STATS.yearsOfLegacy} suffix="+" label="Years of Legacy" icon={Award} />
          <StatCard value={STATS.happyFamilies} suffix="+" label="Happy Families" icon={Users} />
          <StatCard value={STATS.projectsDelivered} suffix="+" label="Ventures Delivered" icon={Building2} />
          <StatCard value={STATS.acresDeveloped} suffix="+" label="Acres Developed" icon={Trees} />
        </div>
      </div>
    </section>
  )
}

// ============================================================
// PROJECTS
// ============================================================
function ProjectCard({ p, onBook, onDetails }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className="group bg-white border border-border hover:border-gold/40 luxe-shadow rounded-sm overflow-hidden transition flex flex-col"
    >
      <div className="relative h-72 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {p.isFlagship && <Badge className="bg-gold text-navy hover:bg-gold border-0 font-semibold tracking-wide">★ Flagship</Badge>}
          <Badge className="bg-white/90 text-navy hover:bg-white border-0 font-medium">{p.category}</Badge>
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

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground italic mb-4 line-clamp-2">&ldquo;{p.tagline}&rdquo;</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Plot Range</div>
            <div className="font-numbers text-sm font-semibold text-navy mt-1">{p.plotRange}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Possession</div>
            <div className="font-numbers text-sm font-semibold text-navy mt-1">{p.possession}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Approval</div>
            <div className="text-xs text-navy mt-1">{p.approval}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Distance</div>
            <div className="text-xs text-navy mt-1">{p.distance}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {p.highlights.slice(0, 4).map(h => (
            <span key={h} className="text-xs px-2.5 py-1 bg-navy/5 text-navy border border-navy/10 rounded-sm">{h}</span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button onClick={() => onDetails(p)} className="flex-1 bg-navy hover:bg-navy-deep text-white">
            View Details
          </Button>
          <Button onClick={() => onBook(p)} variant="outline" className="border-gold text-gold-dark hover:bg-gold hover:text-navy" title="Book Visit">
            <Calendar className="w-4 h-4" />
          </Button>
          {p.brochureUrl && (
            <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-navy/30 text-navy hover:bg-navy hover:text-white" title="Brochure">
                <FileText className="w-4 h-4" />
              </Button>
            </a>
          )}
          <a href={`https://wa.me/${BRAND.whatsapp}?text=Interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white" title="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedProjects({ onBook, onDetails }) {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return PROJECTS
    if (filter === 'Flagship') return PROJECTS.filter(p => p.isFlagship)
    if (filter === 'Ongoing') return PROJECTS.filter(p => p.status === 'Ongoing')
    if (filter === 'Completed') return PROJECTS.filter(p => p.status === 'Completed')
    return PROJECTS.filter(p => p.category === filter)
  }, [filter])

  return (
    <section id="projects" className="py-24 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Signature Portfolio</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy max-w-2xl leading-tight">
              Ten Ventures, <span className="italic text-gradient-gold">One Promise</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">From early townships to our flagship NH-44 city, every project carries the same commitment to clean titles and on-time delivery.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
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
          {filtered.map(p => <ProjectCard key={p.id} p={p} onBook={onBook} onDetails={onDetails} />)}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// GOLDEN PALM CITY FLAGSHIP — Standalone experience
// ============================================================
function FlagshipSection({ onBook }) {
  const p = FLAGSHIP
  const [galleryIdx, setGalleryIdx] = useState(0)

  return (
    <section id="flagship" className="relative bg-navy-deep text-white overflow-hidden">
      {/* Backdrop image */}
      <div className="absolute inset-0">
        <img src={p.image} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy" />
      </div>

      <div className="relative container mx-auto px-6 py-24">
        {/* Top intro */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-gold/40 bg-gold/5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-numbers uppercase">Our Flagship</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl leading-tight">
            <span className="text-gradient-gold italic">Golden Palm City</span>
          </h2>
          <p className="font-heading text-xl md:text-2xl text-white/80 mt-4 italic">&ldquo;{p.tagline}&rdquo;</p>
          <div className="flex items-center justify-center gap-2 text-white/70 mt-4">
            <MapPin className="w-4 h-4 text-gold" /> {p.location}
          </div>
        </div>

        {/* Quick metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Total Area', value: '7.27', unit: 'Acres', icon: Ruler },
            { label: 'Blocks', value: '9', unit: 'A → I', icon: Layers },
            { label: 'Plot Range', value: '161 – 2,950', unit: 'sq.yds', icon: Home },
            { label: 'Highway', value: '200', unit: 'm to NH-44', icon: Compass },
          ].map(m => (
            <div key={m.label} className="border border-gold/20 bg-navy/40 backdrop-blur-sm p-5 text-center hover:border-gold transition">
              <m.icon className="w-6 h-6 mx-auto text-gold mb-3" />
              <div className="font-numbers text-3xl font-bold">{m.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">{m.unit}</div>
              <div className="text-[10px] text-gold/80 uppercase tracking-[0.3em] mt-2">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Two column hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image slider */}
          <div className="relative h-[480px] luxe-shadow rounded-sm overflow-hidden">
            {p.gallery.map((src, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === galleryIdx ? 'opacity-100' : 'opacity-0'}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex gap-2">
                {p.gallery.map((_, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)}
                    className={`h-1 transition-all ${i === galleryIdx ? 'w-12 bg-gold' : 'w-6 bg-white/40'}`} />
                ))}
              </div>
              <Badge className="bg-gold text-navy">{galleryIdx + 1} / {p.gallery.length}</Badge>
            </div>
          </div>

          {/* Story */}
          <div>
            <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-3">{p.approval}</div>
            <h3 className="font-heading text-4xl mb-6">A premium highway-facing city, designed for legacy.</h3>
            <p className="text-white/80 leading-relaxed font-light mb-6">
              Spread across 7 acres 27 guntas along the Hyderabad–Bengaluru NH-44, Golden Palm City is more than a layout —
              it is a meticulously planned residential and commercial community, just five minutes from the Jadcherla IT Park
              and adjacent to the 1,000+ acre Pollepally SEZ.
            </p>
            <div className="space-y-3 mb-8">
              {p.usps.map(u => (
                <div key={u} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-white/85">{u}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => onBook(p)} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold gold-shadow">
                <Calendar className="w-5 h-5 mr-2" /> Book Private Tour
              </Button>
              {p.brochureUrl && (
                <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/15 hover:text-white">
                    <FileText className="w-5 h-5 mr-2" /> Brochure
                  </Button>
                </a>
              )}
              {p.layoutPdf && (
                <a href={p.layoutPdf} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/15 hover:text-white">
                    <Layers className="w-5 h-5 mr-2" /> Master Plan
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Composition pie / bars */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          <Card className="bg-navy/50 border-gold/20 p-8 text-white backdrop-blur-sm">
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Land Composition</div>
            <h4 className="font-heading text-3xl mb-6">37,147 sq.yds, thoughtfully planned</h4>
            <div className="space-y-5">
              {Object.entries(p.composition).map(([key, c]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{c.label}</span>
                    <span className="font-numbers"><span className="text-gold">{c.pct}%</span> · {c.sqYds} sq.yds</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full gradient-gold" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-navy/50 border-gold/20 p-8 text-white backdrop-blur-sm">
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Block Composition</div>
            <h4 className="font-heading text-3xl mb-6">Nine premium blocks</h4>
            <div className="grid grid-cols-3 gap-3">
              {p.blocks.map(b => (
                <div key={b.name} className="border border-gold/20 p-3 text-center hover:border-gold transition">
                  <div className="font-heading text-gold text-2xl">{b.name}</div>
                  <div className="font-numbers text-xs text-white/70 mt-1">{b.area}</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/40">sq.yds</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Amenities */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Lifestyle Amenities</div>
            <h3 className="font-heading text-4xl">Everything for High Class Living</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {p.amenities.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                className="border border-gold/20 bg-navy/30 p-4 text-sm text-white/85 hover:border-gold hover:bg-gold/5 transition"
              >
                <CheckCircle2 className="w-4 h-4 text-gold mb-2" />
                {a}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connectivity */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Strategic Connectivity</div>
            <h3 className="font-heading text-4xl">At the Crossroads of Growth</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {p.nearby.map(n => (
              <div key={n.name} className="border border-gold/20 bg-navy/30 p-5 hover:border-gold transition">
                <Compass className="w-5 h-5 text-gold mb-3" />
                <div className="text-sm text-white">{n.name}</div>
                <div className="font-numbers text-xs text-gold mt-1">{n.dist}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 border border-gold/20 bg-navy/30 p-6">
            <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-3">Anchor Employers Nearby</div>
            <div className="flex flex-wrap gap-2">
              {p.neighbours.map(n => (
                <span key={n} className="text-xs px-3 py-1.5 border border-white/15 text-white/80">{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-heading text-3xl md:text-5xl mb-6">Inventory is moving fast.</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Speak to a Golden Palm City advisor today. Site visits include a 15-minute architectural walkthrough,
            access to the live master plan, and a no-pressure investment consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => onBook(p)} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold gold-shadow h-14 px-10">
              <Calendar className="w-5 h-5 mr-2" /> Reserve Site Visit
            </Button>
            <a href={`https://wa.me/${BRAND.whatsapp}?text=I'm%20interested%20in%20Golden%20Palm%20City`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/15 hover:text-white h-14 px-10">
                <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> Chat with Advisor
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// WHY KP / TIMELINE
// ============================================================
function WhyKP() {
  return (
    <section id="legacy" className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={PROJECTS.find(p => p.id === 'moinabad-township').gallery[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">The Legacy</div>
          <h2 className="font-heading text-4xl md:text-5xl">Two Decades. <span className="italic text-gradient-gold">One Promise.</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-5 font-light">
            From Adarsh Nagar in 2009 to Golden Palm City in 2026, our journey has been built on
            transparency, design excellence, and an obsession with on-time delivery.
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

// ============================================================
// TESTIMONIALS, CALCULATOR, VISIT, BLOGS, CTA, FOOTER
// ============================================================
function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 7000)
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
              <button key={k} onClick={() => setI(k)} aria-label="testimonial"
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
      toast.success('Personalised investment report saved. Our advisor will reach out.')
    } catch { toast.error('Could not save. Try again.') }
  }

  return (
    <section id="investor" className="py-24 bg-gradient-to-b from-muted/40 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Investor Intelligence</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">Visualise Your <span className="italic text-gradient-gold">Wealth Growth</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">Calibrated against historic Telangana plot appreciation across our delivered portfolio.</p>
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
              Schedule a curated site visit with our senior advisor. We arrange transportation from
              Hyderabad city centre, a private walkthrough of your chosen project, and a no-pressure
              consultation.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Clock, t: 'Within 30 mins', d: 'Confirmation call from your relationship manager' },
                { icon: Shield, t: 'Zero Pressure', d: 'Transparent property guidance — no aggressive tactics' },
                { icon: Award, t: 'Premium Hospitality', d: 'Curated tour with refreshments and concierge' },
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

            <div className="mt-8 p-5 bg-navy text-white">
              <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-2">Head Office</div>
              <div className="text-sm font-light">{BRAND.office.line1}, {BRAND.office.line2}</div>
              <div className="text-sm font-light">{BRAND.office.area}, {BRAND.office.city} – {BRAND.office.pincode}</div>
              <div className="flex gap-4 mt-3 text-xs">
                <a href={`tel:${BRAND.phone}`} className="text-gold hover:text-white"><Phone className="w-3 h-3 inline mr-1" /> {BRAND.phoneIntl}</a>
                <a href={`mailto:${BRAND.email}`} className="text-gold hover:text-white"><Mail className="w-3 h-3 inline mr-1" /> {BRAND.email}</a>
              </div>
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
                    {PROJECTS.map(p => <SelectItem key={p.id} value={p.name}>{p.name}{p.isFlagship ? ' ★ Flagship' : ''}</SelectItem>)}
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
                <Textarea className="mt-1.5" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Anything specific you'd like us to prepare?" />
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
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Insights & Intelligence</div>
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
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  <span className="text-gold-dark">{b.tag}</span> • <span>{b.date}</span> • <span>{b.read}</span>
                </div>
                <h3 className="font-heading text-xl text-navy group-hover:text-gold-dark transition leading-snug">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{b.excerpt}</p>
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
        <img src={FLAGSHIP.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/85" />
      </div>
      <div className="relative container mx-auto px-6 text-center text-white">
        <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Limited Inventory at Golden Palm City</div>
        <h2 className="font-heading text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">Your address of distinction <span className="italic text-gradient-gold">awaits.</span></h2>
        <p className="text-white/80 max-w-2xl mx-auto mt-5 font-light">
          Join 12,000+ families who trusted Kings Pride Infra with the most important decision of their lives.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button onClick={onCTA} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold h-14 px-10 gold-shadow">
            Schedule Site Visit <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <a href={`tel:${BRAND.phone}`}>
            <Button variant="outline" size="lg" className="h-14 px-10 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Phone className="w-5 h-5 mr-2" /> {BRAND.phoneIntl}
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
              <div className="w-12 h-12 rounded-sm border-2 border-gold flex items-center justify-center">
                <span className="font-heading text-gold text-xl font-bold">KP</span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-lg">{BRAND.displayName}</div>
                <div className="text-[10px] tracking-[0.3em] text-gold uppercase font-numbers">Est. {BRAND.established}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              {BRAND.legalName}. {BRAND.tagline}.
            </p>
            <div className="mt-4 text-xs text-white/40">
              <Globe className="w-3 h-3 inline mr-1" /> {BRAND.website}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Projects</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {PROJECTS.slice(0, 7).map(p => (
                <li key={p.id}>
                  <a href="#projects" className="hover:text-gold transition">
                    {p.name} {p.isFlagship && <span className="text-gold text-xs">★</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Reach Us</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>{BRAND.office.line1}, {BRAND.office.area}, {BRAND.office.city} – {BRAND.office.pincode}</span>
              </div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> {BRAND.phoneIntl}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> {BRAND.email}</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-gold" /> {BRAND.website}</div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Get curated market insights and Golden Palm City launch updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="bg-navy border-white/20 text-white placeholder:text-white/40" />
              <Button className="bg-gold hover:bg-gold-dark text-navy"><ArrowRight className="w-4 h-4" /></Button>
            </div>
            <div className="mt-6 text-xs text-white/40">
              {APPROVALS.join(' • ')}
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {BRAND.legalName}. All Rights Reserved.</div>
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

// ============================================================
// FLOATING ACTIONS & DIALOGS
// ============================================================
function FloatingActions({ onCTA }) {
  return (
    <>
      <a href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Kings%20Pride%20Infra`} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl transition group">
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute right-16 bg-white text-navy text-xs px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap font-medium">Chat with us</span>
      </a>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy text-white border-t border-gold/20 grid grid-cols-3">
        <a href={`tel:${BRAND.phone}`} className="py-3 text-center text-xs flex flex-col items-center gap-1 hover:bg-navy-deep">
          <Phone className="w-4 h-4 text-gold" /> Call
        </a>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="py-3 text-center text-xs flex flex-col items-center gap-1 bg-green-600">
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

function ProjectDetailDialog({ open, onOpenChange, project, onBook }) {
  if (!project) return null
  const p = project
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative h-72 overflow-hidden">
          <img src={p.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {p.isFlagship && <Badge className="bg-gold text-navy">★ Flagship</Badge>}
              <Badge className="bg-white/90 text-navy">{p.category}</Badge>
              <Badge variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/30">{p.status}</Badge>
            </div>
            <DialogTitle className="font-heading text-3xl">{p.name}</DialogTitle>
            <p className="text-sm italic text-gold/90 mt-1">&ldquo;{p.tagline}&rdquo;</p>
            <p className="text-sm text-white/80 mt-1"><MapPin className="w-3.5 h-3.5 inline text-gold mr-1" /> {p.location}</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { l: 'Type', v: p.type },
              { l: 'Plot Range', v: p.plotRange },
              { l: 'Total Area', v: p.totalArea || '—' },
              { l: 'Possession', v: p.possession },
              { l: 'Approval', v: p.approval },
              { l: 'RERA', v: p.rera || '—' },
              { l: 'Distance', v: p.distance },
              { l: 'Price', v: p.price },
            ].map(x => (
              <div key={x.l} className="border-l-2 border-gold pl-3">
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{x.l}</div>
                <div className="text-sm text-navy font-medium mt-1">{x.v}</div>
              </div>
            ))}
          </div>

          {p.usps.length > 0 && (
            <div>
              <h4 className="font-heading text-xl text-navy mb-3">Why this project</h4>
              <div className="space-y-2">
                {p.usps.map(u => (
                  <div key={u} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {u}
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.amenities.length > 0 && (
            <div>
              <h4 className="font-heading text-xl text-navy mb-3">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {p.amenities.map(a => (
                  <span key={a} className="text-xs px-3 py-1.5 bg-navy/5 text-navy border border-navy/10">{a}</span>
                ))}
              </div>
            </div>
          )}

          {p.nearby && p.nearby.length > 0 && (
            <div>
              <h4 className="font-heading text-xl text-navy mb-3">Nearby</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {p.nearby.map(n => (
                  <div key={n.name} className="border border-border p-3">
                    <div className="text-sm text-navy">{n.name}</div>
                    <div className="text-xs text-gold-dark font-numbers mt-0.5">{n.dist}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.gallery.length > 1 && (
            <div>
              <h4 className="font-heading text-xl text-navy mb-3">Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {p.gallery.map((g, i) => (
                  <img key={i} src={g} alt="" className="w-full h-32 object-cover" loading="lazy" />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button onClick={() => { onBook(p); onOpenChange(false) }} className="flex-1 bg-gold hover:bg-gold-dark text-navy font-semibold">
              <Calendar className="w-4 h-4 mr-2" /> Book Site Visit
            </Button>
            {p.brochureUrl && (
              <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <FileText className="w-4 h-4 mr-2" /> Brochure
                </Button>
              </a>
            )}
            <a href={`https://wa.me/${BRAND.whatsapp}?text=Interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ============================================================
// ROOT
// ============================================================
export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogProject, setDialogProject] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailsProject, setDetailsProject] = useState(null)

  const openCTA = () => { setDialogProject(null); setDialogOpen(true) }
  const onBook = (p) => { setDialogProject(p); setDialogOpen(true) }
  const onDetails = (p) => { setDetailsProject(p); setDetailsOpen(true) }

  return (
    <main className="min-h-screen bg-background">
      <Nav onCTA={openCTA} />
      <Hero onCTA={openCTA} onBrochure={openCTA} />
      <MarqueeApprovals />
      <TrustSection />
      <FeaturedProjects onBook={onBook} onDetails={onDetails} />
      <FlagshipSection onBook={onBook} />
      <WhyKP />
      <InvestmentCalculator />
      <Testimonials />
      <ScheduleVisitForm />
      <Blogs />
      <CTABand onCTA={openCTA} />
      <Footer />
      <FloatingActions onCTA={openCTA} />
      <LeadDialog open={dialogOpen} onOpenChange={setDialogOpen} project={dialogProject} />
      <ProjectDetailDialog open={detailsOpen} onOpenChange={setDetailsOpen} project={detailsProject} onBook={onBook} />
      <div className="md:hidden h-14" />
    </main>
  )
}
