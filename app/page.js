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
import { Card } from '@/components/ui/card'
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
    rera: 'LP No. 0032/GP/SWDL/2026',
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
    rera: 'Phase 1 Ready for Handover',
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
    rera: 'Immediate Handover',
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
    approval: 'DTCP Approved',
    rera: 'LP No. 14/2022/DTCPO/MBNR',
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
    rera: 'Clear Title Approved',
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

  const navLinks = [
    { label: 'Developments', href: '#developments' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Flagship City', href: '#flagship' },
    { label: 'Track Record', href: '#legacy' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
        : 'bg-white border-b border-slate-100 py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo (ASBL Minimalist Luxury) */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-xl border border-slate-200 overflow-hidden bg-slate-900 p-1 flex items-center justify-center shadow-sm group-hover:border-[#C5A880] transition-colors">
            <img
              src={BRAND.logo}
              alt="KP Infra Official Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-sans text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#B8860B] transition-colors leading-none">
              KP INFRA
            </div>
            <div className="text-[10px] tracking-widest uppercase text-slate-500 font-medium mt-1">
              Projects Pvt. Ltd. • Est. 2003
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (ASBL Clean Architectural Menu) */}
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
            className="text-slate-900 hover:text-[#B8860B] py-1 border-b border-slate-300 hover:border-[#B8860B] transition-colors"
          >
            All 11 Projects Directory
          </Link>
        </nav>

        {/* Header Actions (ASBL High-End Conversion Pill) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${BRAND.phoneIntl}`}
            className="hidden xl:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            title="Call Office"
          >
            <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>040-23522339</span>
          </a>

          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20developments.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-slate-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
            title="WhatsApp Consultation"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <Button
            onClick={() => onBook(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full border border-[#C5A880]/40 shadow-sm transition-all"
          >
            <Calendar className="w-3.5 h-3.5 mr-2 text-[#C5A880]" />
            <span>Schedule a Visit</span>
          </Button>
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={`tel:${BRAND.phoneIntl}`}
            className="p-2 rounded-full border border-slate-200 text-slate-700"
            aria-label="Call KP Infra"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20developments.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (ASBL Minimalist Luxury) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 border-b border-slate-100 hover:text-slate-950"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-900 text-center"
            >
              Explore All 11 Projects Directory →
            </Link>

            <div className="pt-2 flex flex-col gap-2.5">
              <Button
                onClick={() => { onBook(null); setMobileMenuOpen(false) }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2 text-[#C5A880]" />
                Book Complimentary Site Tour
              </Button>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${BRAND.phoneIntl}`}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold flex items-center justify-center gap-1.5 bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
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

// ─── Hero Section (ASBL Immersive Architectural Visual + High-Converting Strip) ─────
function ASBLHeroSection({ onBook }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [phoneInput, setPhoneInput] = useState('')
  const [selectedVenture, setSelectedVenture] = useState('Golden Palm City')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = HERO_SLIDES[slideIdx]

  const handleQuickEnquiry = async (e) => {
    e.preventDefault()
    if (!phoneInput.trim()) {
      toast.error('Please enter your contact phone number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Quick Inquirer',
          phone: phoneInput,
          project: selectedVenture,
          notes: 'Instant inquiry from ASBL-style Hero Quick Action bar',
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Thank you! Our relationship manager will call you within 30 minutes with official brochures for ${selectedVenture}.`)
        setPhoneInput('')
      } else {
        toast.error('Could not submit. Please call us directly.')
      }
    } catch {
      toast.error('Network connection issue. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-between bg-slate-950 text-white overflow-hidden">
      {/* Full-Bleed Cinematic Imagery with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
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
              className="w-full h-full object-cover object-center brightness-[0.70] transition-transform duration-7000 ease-out"
            />
          </div>
        ))}
        {/* Architectural Vignette Gradients for Crystal Clear Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
      </div>

      {/* Main Hero Architectural Typography (ASBL Clean Bold Style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 w-full">
        <div className="max-w-3xl space-y-5">
          {/* Subtle Architectural Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
            <span className="w-8 h-px bg-[#C5A880]" />
            <span>KINGS PRIDE INFRASTRUCTURE • HYDERABAD</span>
          </div>

          {/* Grand Authoritative Headline (Pure, Clean, No Garish Neon) */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Communities Engineered for Life. Planned for Prosperity.
          </h1>

          {/* Subtitle with Breathing Space */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl">
            Over two decades of precision land development, clear-title plotted townships, and high-yield agro-estates across Telangana’s highest-growth infrastructure corridors.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#developments">
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg transition-all"
              >
                <span>Explore Developments</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>

            <Button
              onClick={() => onBook(null)}
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full backdrop-blur-md transition-all"
            >
              <Calendar className="w-4 h-4 mr-2 text-[#C5A880]" />
              <span>Book Private Site Visit</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Ribbon: High-Converting Quick Bar + Project Ticker */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-12 w-full space-y-6">
        {/* ASBL High-Converting Quick Consultation Bar */}
        <div className="p-3 sm:p-4 rounded-2xl sm:rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl">
          <form onSubmit={handleQuickEnquiry} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-1/3">
              <Select value={selectedVenture} onValueChange={setSelectedVenture}>
                <SelectTrigger className="w-full h-11 bg-white/5 border-white/10 text-white rounded-xl sm:rounded-full text-xs font-semibold focus:ring-0">
                  <SelectValue placeholder="Select Venture" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white text-xs">
                  {HERO_SLIDES.map((s) => (
                    <SelectItem key={s.slug} value={s.name}>
                      {s.name} ({s.badge})
                    </SelectItem>
                  ))}
                  <SelectItem value="All Developments">All Developments / General Advisory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-1/3">
              <Input
                placeholder="Enter Phone Number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                type="tel"
                className="w-full h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-400 rounded-xl sm:rounded-full text-xs focus:border-[#C5A880]"
              />
            </div>

            <div className="w-full sm:w-1/3">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 bg-[#C5A880] hover:bg-[#b59567] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl sm:rounded-full shadow-md transition-all"
              >
                {submitting ? 'Submitting…' : 'Request Instant Callback'}
              </Button>
            </div>
          </form>
        </div>

        {/* Minimalist Project Ribbon Ticker (ASBL Style) */}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-6 w-full">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.slug}
                onClick={() => setSlideIdx(i)}
                className={`text-left whitespace-nowrap transition-all duration-300 pb-1 border-b-2 flex items-center gap-2 ${
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

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
            <span>{currentSlide.corridor}</span>
            <span>•</span>
            <span className="text-[#C5A880] font-semibold">{currentSlide.price}</span>
            <Link
              href={`/projects/${currentSlide.slug}`}
              className="text-white hover:text-[#C5A880] underline underline-offset-4 ml-2"
            >
              View Plan →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── The ASBL Pivot: "The Art & Science of Real Estate" ────────
function ASBLPhilosophySection() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B8860B] flex items-center gap-2">
            <span className="w-6 h-px bg-[#B8860B]" />
            <span>THE KP INFRA PHILOSOPHY</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
            The Art &amp; Science of Plotted Living
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We do not simply divide raw land into parcels. We engineer long-term appreciation, spatial harmony, and generational family security through rigorous statutory compliance and architectural discipline.
          </p>
        </div>

        {/* 2-Column Split: The Science vs The Art (ASBL Core Concept) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Pillar 1: The Science of Land Development */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#C5A880] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-sans text-2xl font-bold text-slate-950">
                The Science of Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every project is backed by exhaustive legal scrutiny, scientific civil engineering, and environmental compliance.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { title: '100% Vaastu Geometry', desc: 'Precision solar orientation, cardinal plotting, and positive energy alignment.' },
                  { title: 'Statutory Clear Titles', desc: '100% TG RERA registered, DTCP & HMDA approved with immediate spot registration.' },
                  { title: 'Underground Infrastructure', desc: 'Modern underground drainage conduits, overhead water sumps, and 3-phase transformers.' },
                  { title: 'High-Grade Bitumen Roads', desc: '40ft and 33ft wide black-top roads constructed with curbing stones and paved footpaths.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs font-semibold text-slate-700">
              Zero Legal Ambiguity • 22-Year Unblemished Record
            </div>
          </div>

          {/* Pillar 2: The Art of Community Living */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#C5A880] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-sans text-2xl font-bold text-white">
                The Art of Community Living
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We design environments that elevate everyday life—balancing urban connectivity with pristine natural sanctuaries.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { title: 'Monumental Entrance Architecture', desc: 'Grand gatehouses with round-the-clock CCTV surveillance and access control.' },
                  { title: 'Leisure & Wellness Amenities', desc: 'Clubhouses, swimming pools, multipurpose sports arenas, and gazebo lawns.' },
                  { title: 'Mature Agro-Forestry & Green Belts', desc: 'Yielding 20+ year mature mango trees, shade avenues, and rainwater harvesting.' },
                  { title: 'Strategic Economic Corridors', desc: 'Located directly adjacent to Fortune 500 tech hubs, Amazon AWS, and Pharma SEZs.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 text-xs font-semibold text-slate-400">
              Curated for Discerning Homeowners &amp; Multi-Generational Investors
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ASBL Style Clean Architectural Project Card ───────────────
function ASBLProjectCard({ p, onBook, onDetails }) {
  return (
    <div className="group bg-white border border-slate-200 hover:border-slate-400 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl">
      {/* Visual Image Header */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
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
        {/* Subtle Dark Gradient for Guaranteed Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Minimalist Status Tag (ASBL Style) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
          <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
            p.status === 'Completed'
              ? 'bg-slate-900/90 text-slate-200 border border-white/10'
              : 'bg-white/95 text-slate-900 shadow-sm'
          }`}>
            {p.isFlagship ? '★ Flagship' : p.status}
          </span>

          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-slate-900/80 text-[#C5A880] border border-white/10 backdrop-blur-md">
            {p.approval}
          </span>
        </div>

        {/* Bottom Metrics Strip */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-xs text-white">
          <div>
            <div className="text-[10px] uppercase font-medium text-slate-300">Investment Value</div>
            <div className="font-sans font-bold text-base text-[#F4D078] drop-shadow">
              {p.price}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-medium text-slate-300">Plot Sizes</div>
            <div className="font-semibold text-slate-100 drop-shadow">
              {p.plotRange}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content (Clean High-Contrast Typography) */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#B8860B]">
            {p.category} • {p.totalAreaShort || p.totalArea}
          </div>
          <Link href={`/projects/${p.slug || p.id}`}>
            <h3 className="font-sans text-2xl font-bold text-slate-950 group-hover:text-[#B8860B] transition-colors leading-tight">
              {p.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{p.location}</span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
            {p.shortDescription || p.tagline}
          </p>
        </div>

        {/* Action Buttons (ASBL Minimalist Luxe) */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link href={`/projects/${p.slug || p.id}`} className="flex-1">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Button>
          </Link>

          {p.brochureUrl ? (
            <a
              href={p.brochureUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              title="Download Brochure PDF"
            >
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-3.5 rounded-full text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
              </Button>
            </a>
          ) : (
            <Button
              onClick={() => onBook(p)}
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-3.5 rounded-full text-xs font-medium"
              title="Book Site Visit"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Developments Portfolio Section ────────────────────────────
function ASBLProjectsPortfolio({ onBook, onDetails }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filterTabs = [
    { label: 'All Developments (11)', val: 'All' },
    { label: 'Ongoing Layouts (5)', val: 'Ongoing' },
    { label: 'Farmland Estates', val: 'Farm Land' },
    { label: 'Completed Landmarks (6)', val: 'Completed' },
  ]

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    if (activeFilter === 'Ongoing') return PROJECTS.filter(p => p.status === 'Ongoing')
    if (activeFilter === 'Completed') return PROJECTS.filter(p => p.status === 'Completed')
    if (activeFilter === 'Farm Land') return PROJECTS.filter(p => p.category === 'Farm Land' || (p.type || '').includes('Farm'))
    return PROJECTS
  }, [activeFilter])

  return (
    <section id="developments" className="py-24 sm:py-32 bg-[#F8F9FA] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B8860B] flex items-center gap-2">
              <span className="w-6 h-px bg-[#B8860B]" />
              <span>THE PORTFOLIO</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
              Signature Plotted Communities &amp; Farmlands
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore 11 authentic landmark developments across Telangana, each planned with 100% legal title guarantee and strategic infrastructure proximity.
            </p>
          </div>

          <Link href="/projects" className="shrink-0">
            <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all">
              <span>View Full Directory (11 Projects)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Minimalist Filter Tabs (ASBL Style) */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-10 border-b border-slate-200">
          {filterTabs.map((t) => (
            <button
              key={t.val}
              onClick={() => setActiveFilter(t.val)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
                activeFilter === t.val
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <ASBLProjectCard key={p.id} p={p} onBook={onBook} onDetails={onDetails} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Flagship Spotlight: Golden Palm City (ASBL Feature Story) ───
function ASBLFlagshipSpotlight({ onBook }) {
  const p = FLAGSHIP

  return (
    <section id="flagship" className="py-24 sm:py-32 bg-slate-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
            <img
              src={HERO_RENDERS.goldenPalmTower}
              alt="Golden Palm City Clubhouse"
              className="w-full h-80 sm:h-[460px] object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-xs flex justify-between items-center">
              <div>
                <div className="text-white font-bold">Luxury Clubhouse &amp; Swimming Pool</div>
                <div className="text-slate-400 text-[11px]">Underground drainage, avenue plantation &amp; commercial plaza</div>
              </div>
              <Badge className="bg-[#C5A880] text-slate-950 font-bold">Under Active Progress</Badge>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] flex items-center gap-2">
                <span className="w-6 h-px bg-[#C5A880]" />
                <span>THE FLAGSHIP DEVELOPMENT</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Golden Palm City, Jadcherla (NH-44)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A master-planned 7.27-acre gated plotted community positioned directly 200m from the Hyderabad–Bengaluru 6-lane National Highway 44, adjacent to the 1,000+ acre Pollepally Pharma SEZ housing 50,000+ top engineering &amp; pharma professionals.
              </p>
            </div>

            {/* 4 Architectural Metrics */}
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/10 text-xs">
              <div>
                <div className="text-slate-400 font-medium">Layout Scale</div>
                <div className="font-sans font-bold text-lg text-[#F4D078] mt-0.5">7.27 Acres (37,147 sq.yds)</div>
              </div>
              <div>
                <div className="text-slate-400 font-medium">Statutory Approvals</div>
                <div className="font-sans font-bold text-lg text-emerald-400 mt-0.5">DTCP • MUDA • TG RERA</div>
              </div>
              <div>
                <div className="text-slate-400 font-medium">Highway Access</div>
                <div className="font-sans font-bold text-lg text-white mt-0.5">200m from NH-44</div>
              </div>
              <div>
                <div className="text-slate-400 font-medium">Plot Range</div>
                <div className="font-sans font-bold text-lg text-white mt-0.5">161 – 2,950 sq.yds</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/projects/golden-palm-city">
                <Button className="bg-[#C5A880] hover:bg-[#b59567] text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full shadow-lg">
                  <span>Explore Dedicated Page</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <a href="/brochures/golden-palm-city-brochure.pdf" download target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download Brochure (PDF)</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── The Track Record & Numbers (ASBL Style Minimalist Grid) ───
function ASBLLegacySection() {
  const ref = useRef(null)
  const inView = true
  const legacyYears = useCountUp(STATS.yearsOfLegacy, inView)
  const families = useCountUp(STATS.happyFamilies, inView)
  const projectsCount = useCountUp(STATS.totalProjects, inView)
  const acres = useCountUp(STATS.acresDeveloped, inView)

  const stats = [
    { num: `${legacyYears}+`, label: 'Years of Legacy', desc: 'Serving investors across Telangana since 2003' },
    { num: `${families.toLocaleString('en-IN')}+`, label: 'Happy Families', desc: 'Proud plot & villa owners' },
    { num: `${projectsCount}`, label: 'Delivered & Active Ventures', desc: 'Across prime high-growth corridors' },
    { num: `${acres}+`, label: 'Acres Masterplanned', desc: 'Engineered with 100% legal title certainty' },
  ]

  return (
    <section id="legacy" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center lg:text-left">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="font-sans text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                {s.num}
              </div>
              <div className="text-sm font-bold text-slate-800">{s.label}</div>
              <div className="text-xs text-slate-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials Section (Clean Editorial Luxe) ───────────────
function ASBLTestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#F8F9FA] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B8860B] flex items-center gap-2">
            <span className="w-6 h-px bg-[#B8860B]" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
            Enduring Trust from Discerning Homeowners
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Real experiences from families and investors who have built wealth with Kings Pride Infra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#C5A880] opacity-80" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="font-sans text-sm font-bold text-slate-950">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.role}</div>
                <div className="text-[11px] font-semibold text-[#B8860B] mt-1">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Private Consultation & Site Tour Section (ASBL Style) ─────
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
          notes: form.notes || 'Consultation requested from ASBL-style contact section',
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
    <section id="contact" className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Office & Direct Assistance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#B8860B] flex items-center gap-2">
                <span className="w-6 h-px bg-[#B8860B]" />
                <span>PRIVATE SITE CONSULTATION</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Experience the Land in Person
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nothing compares to walking the boundary lines yourself. We provide complimentary chauffeured air-conditioned car pickup from anywhere in Hyderabad with zero sales pressure.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Corporate Headquarters</div>
                  <div className="text-slate-600 mt-1 leading-relaxed">
                    12-2-709/C/221, 1st Floor, Saleem Manzil, Reti Bowli, P.V.N.R. Expressway, Opp. Pillar No. 56, Mehdipatnam, Hyderabad – 500028
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Direct Lines</div>
                  <div className="text-slate-600 mt-1">
                    Board: <a href={`tel:${BRAND.phoneIntl}`} className="text-slate-900 font-semibold hover:underline">{BRAND.phone}</a> | Mobile: <a href={`tel:${BRAND.mobile1}`} className="text-slate-900 font-semibold hover:underline">{BRAND.mobile1}</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">WhatsApp Concierge</div>
                  <div className="text-slate-600 mt-1">
                    Connect instantly with our advisors: <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">+91 79977 00031</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Clean Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="mb-6 space-y-1">
                <h3 className="font-sans text-2xl font-bold text-slate-950">
                  Schedule a Chauffeured Tour
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your details below. Our senior property manager will coordinate car pickup and layout review.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Full Name *</Label>
                    <Input
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="mt-1 h-11 bg-white border-slate-200 rounded-xl text-xs font-medium focus:border-slate-900"
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
                      className="mt-1 h-11 bg-white border-slate-200 rounded-xl text-xs font-medium focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Development of Interest</Label>
                    <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
                      <SelectTrigger className="mt-1 h-11 bg-white border-slate-200 rounded-xl text-xs font-medium">
                        <SelectValue placeholder="Select Development" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-xs">
                        {HERO_SLIDES.map((s) => (
                          <SelectItem key={s.slug} value={s.name}>
                            {s.name} ({s.corridor.split(',')[0]})
                          </SelectItem>
                        ))}
                        <SelectItem value="All Developments">All Developments / Portfolio Advisory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Preferred Tour Date</Label>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="mt-1 h-11 bg-white border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700">Email Address (Optional)</Label>
                  <Input
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    className="mt-1 h-11 bg-white border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700">Specific Requirements / Notes</Label>
                  <Textarea
                    placeholder="Plot size requirements, budget preferences, pickup location..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="mt-1 bg-white border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
                >
                  {loading ? 'Submitting…' : 'Confirm Chauffeured Site Tour'}
                </Button>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Complimentary AC Pickup
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
    <footer className="bg-slate-950 text-slate-400 text-xs py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl border border-white/20 bg-slate-900 p-1 flex items-center justify-center">
                <img src={BRAND.logo} alt="KP Infra Crest" className="w-full h-full object-contain" />
              </div>
              <div className="font-sans font-bold text-lg text-white tracking-tight">
                KP INFRA PROJECTS
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              K.P. Infra Projects Pvt. Ltd. has shaped over 300 acres of DTCP, HMDA, and TG RERA approved plotted townships and agro-estates across Telangana since 2003, built on 100% clear titles and lasting customer trust.
            </p>
            <div className="text-[11px] text-slate-500">
              Corporate Identification: Registered Private Limited Real Estate Developer (Telangana)
            </div>
          </div>

          {/* Ongoing Ventures */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Ongoing Layouts
            </h4>
            <ul className="space-y-2 text-xs">
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
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Delivered Landmarks
            </h4>
            <ul className="space-y-2 text-xs">
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
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#developments" className="hover:text-white transition-colors">All Developments</a></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects Directory</Link></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">The Philosophy</a></li>
              <li><a href="#flagship" className="hover:text-white transition-colors">Golden Palm City</a></li>
              <li><a href="#legacy" className="hover:text-white transition-colors">Track Record</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Schedule Site Visit</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} K.P. Infra Projects Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>RERA Registered</span>
            <span>•</span>
            <span>DTCP Approved</span>
            <span>•</span>
            <span>HMDA Compliant</span>
            <span>•</span>
            <span>Mehdipatnam, Hyderabad</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating WhatsApp & Call Concierge ───────────────────────
function FloatingConcierge({ onBook }) {
  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      <a
        href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20developments.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
        title="Chat with property advisor"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      <Button
        onClick={() => onBook(null)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-[#C5A880]/50 text-xs font-semibold shadow-xl transition-all hover:scale-105"
      >
        <Calendar className="w-4 h-4 text-[#C5A880]" />
        <span>Book Site Tour</span>
      </Button>
    </aside>
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
      <DialogContent className="max-w-md w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8">
        <DialogTitle className="font-sans text-2xl font-bold text-slate-950">
          Book a Complimentary Site Tour
        </DialogTitle>
        <DialogDescription className="text-xs text-slate-500 mt-1">
          {project ? `Arrange a private visit to ${project.name}.` : 'Schedule a curated visit with complimentary chauffeured cab pickup from Hyderabad.'}
        </DialogDescription>

        <form onSubmit={submit} className="space-y-4 mt-4">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Full Name *</Label>
            <Input
              className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl text-slate-900"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Phone Number *</Label>
            <Input
              className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl text-slate-900"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Development</Label>
            <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
              <SelectTrigger className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl">
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
              className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl text-slate-900"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
          >
            {submitting ? 'Submitting…' : 'Confirm Chauffeured Site Tour'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Project Preview Modal Dialog ─────────────────────────────
function ProjectPreviewDialog({ open, onOpenChange, project, onBook }) {
  if (!project) return null
  const p = project

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full bg-white text-slate-900 rounded-3xl p-0 overflow-hidden shadow-2xl">
        <div className="relative h-64 bg-slate-950">
          <img
            src={p.image || p.coverImage}
            alt={p.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = HERO_RENDERS.goldenPalmTower
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[#C5A880]">
              {p.approval}
            </span>
            <DialogTitle className="font-sans text-2xl sm:text-3xl font-bold mt-1 text-white">
              {p.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> {p.location}
            </DialogDescription>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {p.shortDescription || (p.fullDescription ? p.fullDescription.slice(0, 200) + '...' : '')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Plots</div>
              <div className="font-bold text-slate-900 mt-0.5">{p.plotRange}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Price</div>
              <div className="font-bold text-[#B8860B] mt-0.5">{p.price}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Status</div>
              <div className="font-bold text-slate-900 mt-0.5">{p.status}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Possession</div>
              <div className="font-bold text-slate-900 mt-0.5">{p.possession}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/projects/${p.slug || p.id}`} className="flex-1 min-w-[140px]">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider py-2.5 rounded-full">
                <span>View Full Page &amp; Layout</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <Button
              onClick={() => { onOpenChange(false); onBook(p) }}
              variant="outline"
              className="flex-1 min-w-[140px] border-slate-300 text-slate-900 hover:bg-slate-50 font-semibold text-xs uppercase tracking-wider py-2.5 rounded-full"
            >
              <Calendar className="w-4 h-4 mr-1.5 text-[#B8860B]" />
              <span>Book Site Tour</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Root App (ASBL Minimalist Luxe Pivot) ────────────────
export default function App() {
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const [selectedBookProject, setSelectedBookProject] = useState(null)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedPreviewProject, setSelectedPreviewProject] = useState(null)

  const handleBook = (project = null) => {
    setSelectedBookProject(project)
    setBookDialogOpen(true)
  }

  const handlePreview = (project) => {
    setSelectedPreviewProject(project)
    setPreviewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#C5A880]/30 selection:text-slate-950">
      <ASBLNavbar onBook={handleBook} />
      <ASBLHeroSection onBook={handleBook} />
      <ASBLLegacySection />
      <ASBLPhilosophySection />
      <ASBLProjectsPortfolio onBook={handleBook} onDetails={handlePreview} />
      <ASBLFlagshipSpotlight onBook={handleBook} />
      <ASBLTestimonialsSection />
      <ASBLContactSection />
      <ASBLFooter />
      <FloatingConcierge onBook={handleBook} />

      <SiteVisitDialog
        open={bookDialogOpen}
        onOpenChange={setBookDialogOpen}
        project={selectedBookProject}
      />

      <ProjectPreviewDialog
        open={previewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
        project={selectedPreviewProject}
        onBook={handleBook}
      />
    </div>
  )
}
