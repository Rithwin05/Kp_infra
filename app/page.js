'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, MessageCircle, Calendar, MapPin, ArrowRight, ArrowUpRight,
  Award, Building2, Trees, Home, Shield, Sparkles, Star, ChevronRight,
  Menu, X, Users, Clock, BadgeCheck, Mail, ChevronDown, Quote,
  Compass, FileText, Layers, Ruler, CheckCircle2, Globe, Eye, Check,
  Download, Navigation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { BRAND, STATS, PROJECTS, TESTIMONIALS, HERO_RENDERS } from '@/lib/projects'

const FLAGSHIP = PROJECTS.find(p => p.isFlagship) || PROJECTS[0]

// 5 Authentic Ongoing Projects from D:\
const HERO_SLIDES = [
  {
    src: HERO_RENDERS.goldenPalmTower,
    name: 'Golden Palm City',
    slug: 'golden-palm-city',
    badge: 'Flagship Highway Township',
    corridor: 'NH-44 Macharam, Jadcherla',
    headline: '7.27-Acre Highway Plotted Community',
    desc: 'DTCP, MUDA & TG RERA approved master layout directly on NH-44 with luxury clubhouse, swimming pool, and sports arena.',
    price: 'Price On Request',
    plots: '161 – 2,950 sq.yds',
    approval: 'DTCP • MUDA • TG RERA Approved',
    scale: '7.27 Acres • 9 Blocks',
  },
  {
    src: '/images/projects/vantage-farms/IMG_2774.jpg',
    name: 'Vantage Farms',
    slug: 'vantage-farms',
    badge: 'Luxury Eco-Living Farmland',
    corridor: 'Rangareddyguda, Shadnagar (NH-44)',
    headline: 'Mature 20+ Year Mango Groves',
    desc: 'Non-agriculture approved gated farmland plots with pre-cast compound wall, 3-phase electricity transformer, and 24/7 security.',
    price: '₹ 5,000 / sq.yd',
    plots: '605 – 1,001 sq.yds',
    approval: 'Non-Agriculture Approved',
    scale: 'Phase 1 Ready & Expanding',
  },
  {
    src: '/images/projects/chandan-valley/IMG_2845.jpeg',
    name: 'Chandan Valley',
    slug: 'chandan-valley',
    badge: 'Scenic Hill-View Farmland',
    corridor: 'Chandenvalle / Shamshabad (Survey 170 & 184)',
    headline: 'Directly Adjacent to 1,600-Acre SEZ',
    desc: 'Exclusive 10 to 14 Gunta hill-view parcels right next to Welspun, Amazon AWS, and Microsoft Cloud Data Centre.',
    price: 'Spot Demarcated',
    plots: '1,210 – 1,702 sq.yds',
    approval: 'Clear Title Farmland',
    scale: '3.00 Acres Gated Enclave',
  },
  {
    src: '/images/projects/doctors-colony/DJI_0477.JPG',
    name: 'Doctor’s Colony',
    slug: 'doctors-colony',
    badge: 'Boutique DTCP Layout',
    corridor: 'Balanagar Railway Station (NH-44)',
    headline: '38 Exclusive Residential Plots',
    desc: 'Official DTCP approval (LP No. 14/2022) with full underground drainage, water stubs to every plot, and 33ft wide BT roads.',
    price: 'Spot Registration Ready',
    plots: '183 – 329 sq.yds',
    approval: 'DTCP Approved (LP No. 14/2022)',
    scale: '38 Boutique Plots',
  },
  {
    src: '/images/projects/farm-house-etb/84cb76e8-a7c1-4152-bb87-cc6dc47585f3.jpeg',
    name: 'Farm House ETB',
    slug: 'farm-house-etb',
    badge: 'Bespoke Luxury Farmhouse Estate',
    corridor: 'Hyderabad Countryside Belt',
    headline: 'Custom Luxury Villa & Convention Estate',
    desc: 'Architectural masterpiece by Studio Arterio featuring bespoke 4-bedroom villa elevations, private swimming pool, and event lawns.',
    price: 'Custom Estate',
    plots: '1,000 – 5,000 sq.yds',
    approval: 'Estate Master Plan',
    scale: 'Custom Villa Parcels',
  },
]

// ─── Number Counting Hook ─────────────────────────────────────
function useCountUp(target, inView, duration = 1600) {
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

// ─── ASBL Style Architectural Header & Navigation ─────────────
function ASBLNavbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: 'Developments', href: '#developments' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Flagship City', href: '#flagship' },
    { label: 'Track Record', href: '#legacy' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full max-w-full transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
        : 'bg-white border-b border-slate-100 py-3.5 sm:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo (ASBL Clean Minimalist) */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="h-10 sm:h-11 w-10 sm:w-11 rounded-xl border border-slate-200 overflow-hidden bg-slate-900 p-1 flex items-center justify-center shadow-sm">
            <img
              src={BRAND.logo}
              alt="KP Infra Official Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-sans text-base sm:text-lg font-bold tracking-tight text-slate-950 leading-none">
              KP INFRA
            </div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono mt-0.5">
              Est. 2003 • 22+ Yrs
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-slate-950 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
          <Link
            href="/projects"
            className="text-slate-950 font-bold hover:text-[#947854] py-1 border-b border-slate-300 hover:border-[#947854] transition-colors"
          >
            All 11 Projects Directory
          </Link>
        </nav>

        {/* Desktop Header Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${BRAND.phoneIntl}`}
            className="hidden xl:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            title="Call Office"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>040-23522339</span>
          </a>

          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20developments.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-slate-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
            title="WhatsApp Consultation"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <Button
            onClick={() => onBook(null)}
            className="bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs tracking-wide px-4 py-2 rounded-full border border-slate-800 shadow-sm transition-all"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#C5A880]" />
            <span>Schedule a Visit</span>
          </Button>
        </div>

        {/* Mobile Header Quick Bar (Clean, Minimal, Non-Crowded) */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            onClick={() => onBook(null)}
            size="sm"
            className="bg-slate-950 text-white font-medium text-[11px] px-3 py-1.5 h-8 rounded-full shadow-sm"
          >
            <Calendar className="w-3 h-3 mr-1 text-[#C5A880]" />
            <span>Visit</span>
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full Navigation Overlay (Smooth, Clean, Perfectly Contained) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-6 py-6 space-y-5 shadow-2xl z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-sm font-medium text-slate-800 border-b border-slate-100 active:text-slate-950"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-900 text-center"
            >
              Explore All 11 Projects Directory →
            </Link>

            <div className="pt-2 flex flex-col gap-2.5">
              <Button
                onClick={() => { onBook(null); setMobileMenuOpen(false) }}
                className="w-full bg-slate-950 text-white font-medium text-xs tracking-wide py-3.5 rounded-full shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2 text-[#C5A880]" />
                Book Complimentary Site Tour
              </Button>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${BRAND.phoneIntl}`}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold flex items-center justify-center gap-1.5 bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Office</span>
                </a>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20want%20to%20enquire%20about%20your%20projects.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-emerald-300 text-emerald-800 font-semibold flex items-center justify-center gap-1.5 bg-emerald-50"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Hero Section (Clean Cinematic Architectural Visual, Zero Text Bloat) ─────
function ASBLHeroSection({ onBook }) {
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = HERO_SLIDES[slideIdx]

  return (
    <section id="home" className="relative min-h-[82vh] sm:min-h-[86vh] lg:min-h-[88vh] flex flex-col justify-between bg-slate-950 text-white overflow-hidden w-full max-w-full">
      {/* Full-Bleed Cinematic Imagery with Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === slideIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.name}
              className="w-full h-full object-cover object-center brightness-[0.70]"
            />
          </div>
        ))}
        {/* Subtle Architectural Gradient for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Architectural Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 w-full">
        <div className="max-w-2xl space-y-4">
          {/* Subtle Architectural Kicker */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
            <span className="w-6 h-px bg-[#C5A880]" />
            <span>KINGS PRIDE INFRA • HYDERABAD</span>
          </div>

          {/* Grand Authoritative Headline */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Communities Engineered for Life. Planned for Prosperity.
          </h1>

          {/* Concise Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            Over two decades of precision plotted townships, DTCP approvals, and high-yield agro-estates across Telangana’s prime growth corridors.
          </p>

          {/* Clean Dual Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#developments">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs tracking-wide px-6 py-3 rounded-full shadow-md transition-all"
              >
                <span>Explore Developments</span>
                <ArrowRight className="w-4 h-4 ml-1.5 text-slate-950" />
              </Button>
            </a>

            <Button
              onClick={() => onBook(null)}
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/25 font-semibold text-xs tracking-wide px-6 py-3 rounded-full backdrop-blur-md transition-all"
            >
              <Calendar className="w-4 h-4 mr-1.5 text-[#C5A880]" />
              <span>Schedule Visit</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Minimalist Project Switcher Ticker (Zero Horizontal Gliding) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-6 w-full">
        <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Slide selector pills */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 w-full sm:w-auto min-w-0 pb-1 sm:pb-0">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.slug}
                onClick={() => setSlideIdx(i)}
                className={`text-left whitespace-nowrap transition-all duration-300 pb-1 border-b-2 flex items-center gap-1.5 text-xs ${
                  i === slideIdx
                    ? 'border-[#C5A880] text-white font-bold opacity-100'
                    : 'border-transparent text-slate-400 hover:text-slate-200 font-medium opacity-70'
                }`}
              >
                <span className="text-[10px] font-mono text-[#C5A880]">0{i + 1}</span>
                <span>{slide.name}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0 text-slate-300 text-xs">
            <span className="truncate max-w-[200px]">{currentSlide.corridor}</span>
            <span>•</span>
            <span className="text-[#C5A880] font-semibold">{currentSlide.price}</span>
            <Link
              href={`/projects/${currentSlide.slug}`}
              className="text-white hover:text-[#C5A880] underline underline-offset-4 ml-1"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── The ASBL Pivot: "The Art & Science" (Concise & Impactful) ─────
function ASBLPhilosophySection() {
  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-white text-slate-900 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-2.5">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#947854] flex items-center gap-2">
            <span className="w-6 h-px bg-[#947854]" />
            <span>THE KP INFRA PHILOSOPHY</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
            The Art &amp; Science of Plotted Living
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We do not simply divide raw land into parcels. We engineer generational wealth, spatial harmony, and absolute peace of mind.
          </p>
        </div>

        {/* 2-Column Split: The Science vs The Art */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Pillar 1: The Science */}
          <div className="p-7 sm:p-9 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#C5A880] flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h3 className="font-sans text-2xl font-bold text-slate-950">
                The Science of Development
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Backed by exhaustive legal scrutiny, scientific civil engineering, and environmental compliance.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  { title: '100% Vaastu Geometry', tag: 'Cardinal Plotting' },
                  { title: 'Statutory Clear Titles', tag: 'TG RERA, DTCP & HMDA' },
                  { title: 'Underground Infrastructure', tag: 'Drainage & 3-Phase Power' },
                  { title: 'High-Grade Bitumen Roads', tag: '40ft & 33ft Wide Black-Top' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      {item.title}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 border-t border-slate-200 pt-3">
              Zero Legal Ambiguity • 22-Year Unblemished Record
            </div>
          </div>

          {/* Pillar 2: The Art */}
          <div className="p-7 sm:p-9 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#C5A880] flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h3 className="font-sans text-2xl font-bold text-white">
                The Art of Community Living
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Environments designed to elevate life—balancing urban connectivity with pristine natural sanctuaries.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  { title: 'Grand Entrance Gatehouses', tag: '24/7 Security & CCTV' },
                  { title: 'Clubhouse & Swimming Pools', tag: 'Leisure & Sports Arenas' },
                  { title: 'Mature Agro-Forestry Belts', tag: '20+ Year Mango Trees' },
                  { title: 'High-Velocity Corridors', tag: 'Fortune 500 & Pharma SEZs' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
                      {item.title}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 border-t border-white/10 pt-3">
              Curated for Multi-Generational Prosperity
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ASBL Style Clean Architectural Project Card ───────────────
function ASBLProjectCard({ p, onBook }) {
  return (
    <div className="group bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-lg">
      {/* Visual Image Header */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
        <Link href={`/projects/${p.slug || p.id}`} className="block w-full h-full">
          <img
            src={p.image || p.coverImage}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = HERO_RENDERS.goldenPalmTower
            }}
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Status Tag */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
            p.isFlagship
              ? 'bg-[#C5A880] text-slate-950 font-bold shadow-sm'
              : p.status === 'Ongoing'
              ? 'bg-slate-950/80 text-white backdrop-blur-md'
              : 'bg-white/95 text-slate-900 shadow-sm'
          }`}>
            {p.isFlagship ? '★ Flagship' : p.status}
          </span>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-white/90 text-slate-900 border border-slate-200 backdrop-blur-md shadow-sm">
            {p.approval}
          </span>
        </div>

        {/* Bottom Price Strip */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-end text-xs text-white">
          <div className="font-sans font-bold text-base drop-shadow">
            {p.price}
          </div>
          <div className="text-[11px] text-slate-200 font-mono drop-shadow">
            {p.plotRange}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#947854]">
            {p.category} • {p.totalAreaShort || p.totalArea}
          </div>
          <Link href={`/projects/${p.slug || p.id}`}>
            <h3 className="font-sans text-xl font-bold text-slate-950 group-hover:text-[#947854] transition-colors leading-tight">
              {p.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate">{p.location}</span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
            {p.shortDescription || p.tagline}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
          <Link href={`/projects/${p.slug || p.id}`}>
            <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1 border border-slate-200">
              <span>Details</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Button>
          </Link>

          {p.brochureUrl ? (
            <a
              href={p.brochureUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              title="Download Brochure PDF"
            >
              <Button className="w-full bg-slate-950 hover:bg-slate-800 text-white py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1 shadow-sm">
                <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Brochure</span>
              </Button>
            </a>
          ) : (
            <Button
              onClick={() => onBook(p)}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Visit</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Developments Portfolio Section ────────────────────────────
function ASBLProjectsPortfolio({ onBook }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filterTabs = [
    { label: 'All Developments (11)', val: 'All' },
    { label: 'Ongoing Layouts (5)', val: 'Ongoing' },
    { label: 'Farmland Estates', val: 'Farm Land' },
    { label: 'Completed (6)', val: 'Completed' },
  ]

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    if (activeFilter === 'Ongoing') return PROJECTS.filter(p => p.status === 'Ongoing')
    if (activeFilter === 'Completed') return PROJECTS.filter(p => p.status === 'Completed')
    if (activeFilter === 'Farm Land') return PROJECTS.filter(p => p.category === 'Farm Land' || (p.type || '').includes('Farm'))
    return PROJECTS
  }, [activeFilter])

  return (
    <section id="developments" className="py-20 sm:py-28 bg-[#F8F9FA] text-slate-900 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#947854] flex items-center gap-2">
              <span className="w-6 h-px bg-[#947854]" />
              <span>THE PORTFOLIO</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
              Signature Plotted Communities &amp; Farmlands
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore 11 authentic developments across Telangana, each planned with 100% legal title guarantee and highway proximity.
            </p>
          </div>

          <Link href="/projects" className="shrink-0">
            <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-all">
              <span>View Full Directory (11 Projects)</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-3 mb-8 border-b border-slate-200 min-w-0">
          {filterTabs.map((t) => (
            <button
              key={t.val}
              onClick={() => setActiveFilter(t.val)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
                activeFilter === t.val
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((p) => (
            <ASBLProjectCard key={p.id} p={p} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Flagship Spotlight: Golden Palm City ───────────────────────
function ASBLFlagshipSpotlight() {
  return (
    <section id="flagship" className="py-20 sm:py-28 bg-slate-950 text-white overflow-hidden relative w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
            <img
              src={HERO_RENDERS.goldenPalmTower}
              alt="Golden Palm City Clubhouse"
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-xs flex justify-between items-center">
              <div>
                <div className="text-white font-bold">Luxury Clubhouse &amp; Swimming Pool</div>
                <div className="text-slate-400 text-[11px]">Underground drainage, avenue plantation &amp; commercial plaza</div>
              </div>
              <Badge className="bg-[#C5A880] text-slate-950 font-bold shrink-0">Under Progress</Badge>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2.5">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] flex items-center gap-2">
                <span className="w-6 h-px bg-[#C5A880]" />
                <span>THE FLAGSHIP DEVELOPMENT</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Golden Palm City, Jadcherla (NH-44)
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                A 7.27-acre gated plotted community directly 200m from the Hyderabad–Bengaluru NH-44, adjacent to the 1,000+ acre Pollepally Pharma SEZ.
              </p>
            </div>

            {/* 4 Architectural Metrics */}
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[11px]">Layout Scale</div>
                <div className="font-sans font-bold text-base text-white mt-0.5">7.27 Acres</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[11px]">Statutory Approvals</div>
                <div className="font-sans font-bold text-base text-emerald-400 mt-0.5">DTCP • TG RERA</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[11px]">Highway Access</div>
                <div className="font-sans font-bold text-base text-white mt-0.5">200m from NH-44</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[11px]">Plot Sizes</div>
                <div className="font-sans font-bold text-base text-white mt-0.5">161 – 2,950 sq.yds</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/projects/golden-palm-city">
                <Button className="bg-[#C5A880] hover:bg-[#b59567] text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full shadow-lg">
                  <span>Explore Dedicated Page</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>

              <a href="/brochures/golden-palm-city-brochure.pdf" download target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full"
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  <span>Brochure (PDF)</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── The Track Record & Numbers ───────────────────────────────
function ASBLLegacySection() {
  const inView = true
  const legacyYears = useCountUp(STATS.yearsOfLegacy, inView)
  const families = useCountUp(STATS.happyFamilies, inView)
  const projectsCount = useCountUp(STATS.totalProjects, inView)
  const acres = useCountUp(STATS.acresDeveloped, inView)

  const stats = [
    { num: `${legacyYears}+`, label: 'Years of Trust', desc: 'Serving Telangana since 2003' },
    { num: `${families.toLocaleString('en-IN')}+`, label: 'Delighted Families', desc: 'Proud plot & villa owners' },
    { num: `${projectsCount}`, label: 'Delivered & Active', desc: 'Across prime corridors' },
    { num: `${acres}+`, label: 'Acres Developed', desc: '100% legal title certainty' },
  ]

  return (
    <section id="legacy" className="py-16 sm:py-20 bg-white border-b border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center lg:text-left">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                {s.num}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">{s.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials Section ─────────────────────────────────────
function ASBLTestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#F8F9FA] text-slate-900 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-2.5">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#947854] flex items-center gap-2">
            <span className="w-6 h-px bg-[#947854]" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Enduring Trust from Discerning Homeowners
          </h2>
          <p className="text-slate-600 text-sm">
            Real experiences from families and investors who have built wealth with Kings Pride Infra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#C5A880] opacity-80" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="font-sans text-xs font-bold text-slate-950">{t.name}</div>
                <div className="text-[11px] text-slate-500">{t.role}</div>
                <div className="text-[10px] font-semibold text-[#947854] mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Private Consultation & Site Tour Section ─────────────────
function ASBLContactSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: 'Golden Palm City',
    date: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please provide your name and contact phone number.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          notes: form.notes || 'Consultation requested from contact section',
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Thank you, ${form.name}! Your chauffeured site tour request for ${form.project} has been received. Our senior relationship manager will call you within 30 minutes.`)
        setForm({ name: '', phone: '', email: '', project: 'Golden Palm City', date: '', notes: '' })
      } else {
        toast.error('Could not submit booking. Please call us directly.')
      }
    } catch {
      toast.error('Network connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white text-slate-900 border-t border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Office & Direct Assistance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2.5">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#947854] flex items-center gap-2">
                <span className="w-6 h-px bg-[#947854]" />
                <span>PRIVATE SITE CONSULTATION</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Experience the Land in Person
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Complimentary chauffeured air-conditioned car pickup from anywhere in Hyderabad with zero sales pressure.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Corporate Headquarters</div>
                  <div className="text-slate-600 mt-0.5 leading-relaxed">
                    12-2-709/C/221, 1st Floor, Saleem Manzil, Reti Bowli, P.V.N.R. Expressway, Opp. Pillar No. 56, Mehdipatnam, Hyderabad
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Direct Office Lines</div>
                  <div className="text-slate-600 mt-0.5">
                    <a href={`tel:${BRAND.phoneIntl}`} className="text-slate-900 font-semibold hover:underline">{BRAND.phone}</a> | <a href={`tel:${BRAND.mobile1}`} className="text-slate-900 font-semibold hover:underline">{BRAND.mobile1}</a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">WhatsApp Concierge</div>
                  <div className="text-slate-600 mt-0.5">
                    <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">+91 79977 00031</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="mb-5 space-y-1">
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-slate-950">
                  Schedule a Chauffeured Tour
                </h3>
                <p className="text-xs text-slate-500">
                  Our senior relationship manager will coordinate car pickup and layout review.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Full Name *</Label>
                    <Input
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="mt-1 h-10 bg-white border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Phone Number *</Label>
                    <Input
                      placeholder="e.g. +91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      type="tel"
                      required
                      className="mt-1 h-10 bg-white border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Development</Label>
                    <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
                      <SelectTrigger className="mt-1 h-10 bg-white border-slate-200 rounded-xl text-xs font-medium">
                        <SelectValue placeholder="Select Development" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-xs">
                        {HERO_SLIDES.map((s) => (
                          <SelectItem key={s.slug} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="All Developments">All Developments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Preferred Date</Label>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="mt-1 h-10 bg-white border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700">Pickup Location / Notes</Label>
                  <Textarea
                    placeholder="Preferred pickup address or specific questions..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    className="mt-1 bg-white border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide rounded-full shadow-md transition-all mt-1"
                >
                  {loading ? 'Submitting…' : 'Confirm Free VIP Site Tour'}
                </Button>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free AC Pickup
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Clear Titles
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Spot Registration
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ASBL Style Corporate Footer ──────────────────────────────
function ASBLFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-white/10 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border border-white/20 bg-slate-900 p-1 flex items-center justify-center">
                <img src={BRAND.logo} alt="KP Infra Crest" className="w-full h-full object-contain" />
              </div>
              <div className="font-sans font-bold text-lg text-white tracking-tight">
                KP INFRA PROJECTS
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Shaping over 300 acres of DTCP, HMDA, and TG RERA approved plotted townships and agro-estates across Telangana since 2003.
            </p>
          </div>

          {/* Ongoing Ventures */}
          <div className="space-y-2.5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Ongoing Layouts
            </h4>
            <ul className="space-y-1.5 text-xs">
              {PROJECTS.filter(p => p.status === 'Ongoing').map(p => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug || p.id}`} className="hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed Landmarks */}
          <div className="space-y-2.5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Delivered Landmarks
            </h4>
            <ul className="space-y-1.5 text-xs">
              {PROJECTS.filter(p => p.status === 'Completed').slice(0, 6).map(p => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug || p.id}`} className="hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#developments" className="hover:text-white transition-colors">Developments</a></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects Directory</Link></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a></li>
              <li><a href="#flagship" className="hover:text-white transition-colors">Golden Palm City</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} K.P. Infra Projects Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>TG RERA Registered</span>
            <span>•</span>
            <span>DTCP Approved</span>
            <span>•</span>
            <span>HMDA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating Concierge Button (Sleek, Doesn't Overflow Mobile) ─────
function FloatingConcierge({ onBook }) {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex items-center gap-2">
      <a
        href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20developments.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-950/30 transition-transform active:scale-95"
        title="WhatsApp Consultation"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      <button
        onClick={() => onBook(null)}
        className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white border border-[#C5A880]/40 text-xs font-semibold shadow-xl transition-all"
      >
        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>Book Site Tour</span>
      </button>
    </div>
  )
}

// ─── Site Visit Modal Dialog ──────────────────────────────────
function SiteVisitDialog({ open, onOpenChange, project }) {
  const [form, setForm] = useState({ name: '', phone: '', project: 'Golden Palm City', date: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (project) {
      setForm((prev) => ({ ...prev, project: project.name }))
    }
  }, [project])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please enter name and phone number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Site visit booked! Our advisor will call you within 30 minutes to confirm chauffeured pickup.')
        onOpenChange(false)
      } else {
        toast.error('Could not book. Please call us.')
      }
    } catch {
      toast.error('Network connection error.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-white text-slate-900 rounded-2xl p-6">
        <DialogTitle className="font-sans text-xl font-bold text-slate-950">
          Book Complimentary Site Tour
        </DialogTitle>
        <DialogDescription className="text-xs text-slate-500 mt-1">
          {project ? `Arrange a private visit to ${project.name}.` : 'Curated visit with complimentary chauffeured pickup from Hyderabad.'}
        </DialogDescription>

        <form onSubmit={submit} className="space-y-3.5 mt-4">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Full Name *</Label>
            <Input
              className="mt-1 h-10 bg-slate-50 border-slate-200 text-xs rounded-xl text-slate-900"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Phone Number *</Label>
            <Input
              className="mt-1 h-10 bg-slate-50 border-slate-200 text-xs rounded-xl text-slate-900"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Development</Label>
            <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
              <SelectTrigger className="mt-1 h-10 bg-slate-50 border-slate-200 text-xs rounded-xl">
                <SelectValue placeholder="Select development" />
              </SelectTrigger>
              <SelectContent>
                {PROJECTS.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Preferred Date</Label>
            <Input
              className="mt-1 h-10 bg-slate-50 border-slate-200 text-xs rounded-xl text-slate-900"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide rounded-full shadow-md"
          >
            {submitting ? 'Submitting…' : 'Confirm Chauffeured Site Tour'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Root App ────────────────────────────────────────────
export default function App() {
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const [selectedBookProject, setSelectedBookProject] = useState(null)

  const handleBook = (project = null) => {
    setSelectedBookProject(project)
    setBookDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden w-full max-w-full selection:bg-[#C5A880]/30 selection:text-slate-950">
      <ASBLNavbar onBook={handleBook} />
      <ASBLHeroSection onBook={handleBook} />
      <ASBLLegacySection />
      <ASBLPhilosophySection />
      <ASBLProjectsPortfolio onBook={handleBook} />
      <ASBLFlagshipSpotlight />
      <ASBLTestimonialsSection />
      <ASBLContactSection />
      <ASBLFooter />
      <FloatingConcierge onBook={handleBook} />

      <SiteVisitDialog
        open={bookDialogOpen}
        onOpenChange={setBookDialogOpen}
        project={selectedBookProject}
      />
    </div>
  )
}
