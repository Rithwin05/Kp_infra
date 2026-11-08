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

const HERO_SLIDES = [
  {
    src: HERO_RENDERS.goldenPalmTower,
    name: 'Golden Palm City',
    slug: 'golden-palm-city',
    badge: '★ Flagship Highway Township',
    location: 'NH-44 Macharam, Jadcherla',
    desc: '7.27-Acre DTCP, MUDA & TG RERA Approved Layout with Luxury Clubhouse & Swimming Pool',
    price: 'Price On Request',
    plots: '161 – 2,950 sq.yds',
    approval: 'DTCP • MUDA • TG RERA',
  },
  {
    src: '/images/projects/vantage-farms/IMG_2774.jpg',
    name: 'Vantage Farms',
    slug: 'vantage-farms',
    badge: 'Luxury Eco-Living Farmland',
    location: 'Rangareddyguda, Shadnagar (NH-44)',
    desc: 'Mature 20+ Year Mango Groves with Pre-Cast Compound & 24/7 Gated Security',
    price: '₹ 5,000 / sq.yd',
    plots: '605 – 1,001 sq.yds',
    approval: 'Non-Agri Approved',
  },
  {
    src: '/images/projects/chandan-valley/IMG_2845.jpeg',
    name: 'Chandan Valley',
    slug: 'chandan-valley',
    badge: 'Scenic Hill-View Farmland',
    location: 'Chandenvalle / Shamshabad (Survey 170 & 184)',
    desc: 'Directly Adjacent to 1,600-Acre SEZ, Amazon AWS & Microsoft Data Centre Cloud Hub',
    price: 'Spot Demarcated',
    plots: '1,210 – 1,702 sq.yds',
    approval: 'Clear Title Farmland',
  },
  {
    src: '/images/projects/doctors-colony/DJI_0477.JPG',
    name: 'Doctor’s Colony',
    slug: 'doctors-colony',
    badge: 'Boutique DTCP Layout',
    location: 'Balanagar Railway Station (NH-44)',
    desc: '38 Exclusive Plots (LP No. 14/2022) • Full Underground Drainage • 2 min to Station',
    price: 'Spot Registration Ready',
    plots: '183 – 329 sq.yds',
    approval: 'DTCP Approved',
  },
  {
    src: '/images/projects/farm-house-etb/84cb76e8-a7c1-4152-bb87-cc6dc47585f3.jpeg',
    name: 'Farm House ETB',
    slug: 'farm-house-etb',
    badge: 'Luxury Farmhouse & Convention',
    location: 'Hyderabad Countryside Belt',
    desc: 'Custom Luxury Villa Architecture, Swimming Pool, Banquet Lawn & Interiors by Studio Arterio',
    price: 'Custom Estate',
    plots: '1,000 – 5,000 sq.yds',
    approval: 'Estate Master Plan',
  },
]

const APPROVALS_LIST = [
  'TG RERA Approved',
  'DTCP Approved',
  'HMDA Approved',
  'MUDA Approved',
  '100% Vaastu Compliant',
  'Bank Loan Approved',
  'Clear Title Guarantee',
  'Spot Registration',
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

// ─── Header & Top Bar (Googee Style Peak Detailing) ───────────
function TopBar() {
  return (
    <div className="bg-[#0B2545] text-slate-200 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href={`tel:${BRAND.phoneIntl}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium">{BRAND.phone}</span>
          </a>
          <a href={`tel:${BRAND.mobile1}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
            <span className="text-slate-400">Direct:</span>
            <span className="font-medium">{BRAND.mobile1}</span>
          </a>
          <a href={`mailto:${BRAND.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors hidden lg:flex">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{BRAND.email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-slate-300 hidden xl:flex">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Mehdipatnam, Hyderabad (Opp. Pillar 56)</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] tracking-wide">
          <span className="text-[#F4D078] font-semibold flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>TG RERA Registered • DTCP &amp; HMDA Approved</span>
          </span>
          <span className="text-white/20">|</span>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20KP%20Infra,%20I%20am%20interested%20in%20your%20ventures.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Connect</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function MainNavbar({ onBook }) {
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
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Ongoing Layouts', href: '#projects' },
    { label: 'Completed Ventures', href: '#projects' },
    { label: 'Why KP Infra', href: '#why-choose-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md border-b border-slate-200' : 'bg-white/98 backdrop-blur-md border-b border-slate-100'
    }`}>
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo with Official Crest from D:\Logo */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl border border-[#D4AF37]/40 overflow-hidden bg-[#0B2545] p-1 flex items-center justify-center shadow-md group-hover:border-[#D4AF37] transition-all">
            <img
              src={BRAND.logo}
              alt="KP Infra Official Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-[#0B2545] group-hover:text-[#B8860B] transition-colors leading-none">
              K.P. INFRA <span className="text-[#B8860B]">PROJECTS</span>
            </div>
            <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-slate-500 font-semibold mt-1">
              A Bridge To Your Dream Home • Est. 2003
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#B8860B] transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8860B] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
          <Link
            href="/projects"
            className="text-xs uppercase tracking-wider font-extrabold text-[#9A7000] bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-xl border border-amber-300 transition-all shadow-sm"
          >
            All 11 Projects Directory
          </Link>
        </nav>

        {/* Header Action Buttons (Googee Style) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${BRAND.phoneIntl}`}
            className="hidden xl:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0B2545] hover:border-[#0B2545] transition-colors"
            title="Call Office"
          >
            <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>040-23522339</span>
          </a>

          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20ventures.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            title="WhatsApp Consultation"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <Button
            onClick={() => onBook(null)}
            className="bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 hover:brightness-105 font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/25 transition-all"
          >
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>Schedule Site Tour</span>
          </Button>
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="flex sm:hidden items-center gap-1.5">
          <a
            href={`tel:${BRAND.phoneIntl}`}
            className="p-2 rounded-lg border border-slate-200 text-slate-700"
            aria-label="Call KP Infra"
          >
            <Phone className="w-4 h-4 text-[#0B2545]" />
          </a>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20want%20to%20enquire%20about%20your%20projects.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Tablet Hamburger (hidden on mobile and desktop) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hidden sm:inline-flex lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#0B2545] hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (Clean, High Contrast, Non-Cluttered) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 px-5 py-5 space-y-3.5 shadow-xl"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100 hover:text-[#B8860B]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-amber-50 border border-amber-300 text-sm font-bold text-[#9A7000] text-center"
            >
              Explore All 11 Projects Directory →
            </Link>

            <div className="pt-2 flex flex-col gap-2.5">
              <Button
                onClick={() => { onBook(null); setMobileMenuOpen(false) }}
                className="w-full bg-[#0B2545] hover:bg-[#132E4E] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md"
              >
                <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Book Free Chauffeured Site Tour
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${BRAND.phoneIntl}`}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 bg-slate-50"
                >
                  <Phone className="w-4 h-4 text-[#B8860B]" />
                  <span>Call Office</span>
                </a>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20want%20to%20enquire%20about%20your%20projects.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-xl border border-emerald-500 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 bg-emerald-50"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
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

// ─── Hero Section with High-Converting Quick Enquiry (Googee Style Peak Detailing) ───
function HeroSection({ onBook }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', project: 'Golden Palm City' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = HERO_SLIDES[slideIdx]

  const handleHeroSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please enter your name and phone number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          project: form.project,
          notes: 'Instant inquiry from homepage hero quick form',
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Thank you! Our senior relationship manager will call you within 30 minutes with official brochures and arrange your complimentary site tour.')
        setForm({ name: '', phone: '', project: 'Golden Palm City' })
      } else {
        toast.error('Could not submit. Please call us directly.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="home" className="relative bg-[#061527] overflow-hidden text-white">
      {/* Background Photography with Smooth Crossfade */}
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
              className="w-full h-full object-cover object-center brightness-75 transition-transform duration-7000 ease-out"
            />
          </div>
        ))}
        {/* Crisp Gradient Scrim Overlay for 100% Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061527]/98 via-[#061527]/85 to-[#061527]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061527] via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        {/* Interactive Project Switcher Tabs (Googee Style) */}
        <div className="mb-8 flex overflow-x-auto no-scrollbar gap-2 pb-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.slug}
              onClick={() => setSlideIdx(i)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                i === slideIdx
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-lg shadow-[#D4AF37]/30 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10'
              }`}
            >
              <span>{slide.name}</span>
              <span className={`text-[10px] font-normal opacity-80 ${i === slideIdx ? 'text-slate-900' : 'text-slate-400'}`}>
                ({slide.location.split(',')[0]})
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Value Proposition & Active Project Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#F4D078] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Telangana&apos;s Trusted Land Developer Since 2003 • 12,000+ Happy Families</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Building Generational Wealth Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#D4AF37] italic">
                  Prime Plotted Communities
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light mt-4 leading-relaxed max-w-xl">
                22+ Years of Unblemished Real Estate Legacy. Explore TG RERA, DTCP &amp; HMDA approved gated layouts &amp; luxury farmlands across Hyderabad’s highest-growth infrastructure corridors.
              </p>
            </div>

            {/* Active Slide Spotlight Pill with High-Contrast Glassmorphic Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/20 max-w-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#D4AF37] text-slate-950">
                    {currentSlide.badge}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">{currentSlide.location}</span>
                </div>
                <div className="font-heading text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {currentSlide.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Plots: <span className="text-slate-100 font-bold">{currentSlide.plots}</span> • <span className="text-[#F4D078] font-bold">{currentSlide.price}</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                  ✓ {currentSlide.approval} • Clear Title Guarantee
                </div>
              </div>

              <Link href={`/projects/${currentSlide.slug}`} className="shrink-0 w-full sm:w-auto">
                <Button size="sm" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold py-2 px-4 rounded-xl">
                  <span>Explore Project</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 text-[#D4AF37]" />
                </Button>
              </Link>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                onClick={() => onBook(null)}
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-[#D4AF37]/30 hover:brightness-105 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Schedule Free Site Tour</span>
              </Button>

              <a href="#projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
                >
                  <span>Browse All 11 Projects</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#D4AF37]" />
                </Button>
              </a>
            </div>

            {/* Slide Pagination Indicators */}
            <div className="flex items-center gap-2 pt-1">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.slug}
                  onClick={() => setSlideIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slideIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1} (${slide.name})`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Googee Style High-Converting Quick Lead Card */}
          <div className="lg:col-span-5">
            <Card className="p-6 sm:p-7 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-100 relative overflow-hidden">
              {/* Gold Top Accent Bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] absolute top-0 left-0 right-0" />

              <div className="space-y-1 mb-4 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#B8860B]">
                  Instant Callback &amp; Free AC Cab Pickup
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
                  Schedule a Free Site Tour
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Receive official brochures, plot availability maps, and enjoy a complimentary chauffeured site visit with our advisors.
                </p>
              </div>

              <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                <div>
                  <Label className="text-xs font-bold text-slate-700">Full Name *</Label>
                  <Input
                    className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm focus:border-[#B8860B] rounded-xl text-slate-900 font-medium"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Phone Number *</Label>
                  <Input
                    className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm focus:border-[#B8860B] rounded-xl text-slate-900 font-medium"
                    placeholder="e.g. +91 98765 43210"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">Venture of Interest</Label>
                  <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
                    <SelectTrigger className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl font-medium">
                      <SelectValue placeholder="Choose a venture" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Golden Palm City">Golden Palm City (NH-44 Jadcherla)</SelectItem>
                      <SelectItem value="Vantage Farms">Vantage Farms (Shadnagar - ₹5,000/sq.yd)</SelectItem>
                      <SelectItem value="Chandan Valley">Chandan Valley (Shamshabad / SEZ)</SelectItem>
                      <SelectItem value="Doctor’s Colony">Doctor’s Colony (Balanagar Station)</SelectItem>
                      <SelectItem value="Farm House ETB">Farm House ETB (Luxury Estate)</SelectItem>
                      <SelectItem value="Open Consultation">All Projects / Investment Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-[#0B2545] hover:bg-[#132E4E] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all mt-2"
                >
                  {submitting ? 'Submitting…' : 'Book My Free Chauffeured Site Tour'}
                </Button>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Free Cab Pickup
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 100% Clear Titles
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Spot Registration
                  </span>
                </div>

                <div className="text-[11px] text-center text-slate-500 pt-1">
                  Prefer direct assistance? Call <a href="tel:040-23522339" className="text-[#0B2545] font-bold hover:underline">040-23522339</a> or WhatsApp <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">+91 79977 00031</a>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Trust Numbers Banner (Googee Style) ───────────────────────
function TrustNumbers() {
  const ref = useRef(null)
  const inView = true // clean immediate render
  const legacyYears = useCountUp(STATS.yearsOfLegacy, inView)
  const families = useCountUp(STATS.happyFamilies, inView)
  const projectsCount = useCountUp(STATS.totalProjects, inView)
  const acres = useCountUp(STATS.acresDeveloped, inView)

  const stats = [
    { num: `${legacyYears}+`, label: 'Years of Legacy', desc: 'Serving investors since 2003', icon: Award },
    { num: `${families.toLocaleString('en-IN')}+`, label: 'Happy Families', desc: 'Proud plot & villa owners', icon: Users },
    { num: `${projectsCount}`, label: 'Signature Ventures', desc: 'Delivered & active projects', icon: Building2 },
    { num: `${acres}+`, label: 'Acres Developed', desc: 'Across prime Telangana corridors', icon: Trees },
  ]

  return (
    <section className="bg-white border-b border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#B8860B]" />
                </div>
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-[#0B2545]">
                    {s.num}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">{s.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── About KP Infra Section (Googee Style) ────────────────────
function AboutSection({ onBook }) {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
              <img
                src={HERO_RENDERS.goldenPalmEntrance}
                alt="KP Infra Development Landmark"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-6 bg-white space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                  Corporate Headquarters
                </div>
                <div className="font-heading text-xl font-bold text-[#0B2545]">
                  Saleem Manzil, P.V.N.R Expressway, Mehdipatnam
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Easily accessible corporate office right opposite Pillar No. 56. Walk in for architectural consultations, master plan reviews, and legal title verifications.
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-5 -right-5 bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 p-4 rounded-2xl shadow-xl hidden sm:block">
              <div className="font-heading text-3xl font-extrabold leading-none">22+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider mt-1">Years of Trust</div>
            </div>
          </div>

          {/* Story Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                About Kings Pride Infra
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2545] leading-tight">
                Shaping Hyderabad&apos;s Growth Story with{' '}
                <span className="text-[#B8860B]">Integrity &amp; Vision</span>
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded in 2003, K.P. Infra Projects Pvt. Ltd. has stood as a bastion of trust, legal transparency, and timely delivery in Telangana real estate. For over two decades, we have focused exclusively on high-growth corridors — from the early suburban townships like Adarsh Nagar to our signature 7.27-acre highway city, Golden Palm City, along the Hyderabad–Bengaluru National Highway 44.
            </p>

            {/* 4 Feature Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: '100% Legal Title Guarantee', desc: 'Clear titles, spot registration, and complete encumbrance-free records.' },
                { title: 'Strategic Growth Corridors', desc: 'Located along NH-44, Upcoming RRR, and major Pharma/IT SEZs.' },
                { title: 'Comprehensive Infrastructure', desc: 'Underground drainage, 40′ & 33′ BT roads, water tanks & street lights.' },
                { title: '100% Vaastu Compliant Planning', desc: 'Scientifically planned plots ensuring positive energy and prosperity.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2545]">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                onClick={() => onBook(null)}
                className="bg-[#0B2545] hover:bg-[#132E4E] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                <span>Schedule a Consultation</span>
              </Button>

              <Link href="/projects">
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-800 hover:border-[#0B2545] hover:bg-slate-100 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl"
                >
                  <span>Explore Projects Directory</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#B8860B]" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Googee Style Project Card (High Contrast, Razor Sharp Typography) ───────
function CleanProjectCard({ p, onBook, onDetails }) {
  return (
    <div className="group bg-white border border-slate-200 hover:border-[#D4AF37] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl">
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
        {/* Multi-layer dark scrim to guarantee 100% badge & price readability on any bright/white image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/50 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {p.isFlagship ? (
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md">
                ★ Flagship
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/85 text-white backdrop-blur-md border border-white/20">
                {p.category}
              </span>
            )}
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
              p.status === 'Completed'
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-950/90 text-amber-300 border border-amber-500/40'
            }`}>
              {p.status}
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 backdrop-blur-md">
            {p.approval}
          </span>
        </div>

        {/* Bottom Price & Plot Strip */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between px-3.5 py-2 rounded-2xl bg-[#0B2545]/90 backdrop-blur-md border border-white/15 text-xs shadow-lg">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Value</div>
            <div className="text-[#F4D078] font-heading font-extrabold text-sm tracking-wide">
              {p.price}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Plot Sizes</div>
            <div className="text-slate-100 font-bold text-xs">
              {p.plotRange}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content (Deep Navy on Pure White — Never Disappears) */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-[#B8860B] mb-1.5">
            <span>{p.category} • {p.totalAreaShort || p.totalArea}</span>
            <span className="flex items-center gap-1 text-slate-500 font-medium normal-case">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate max-w-[140px]">{p.location.split(',')[0]}</span>
            </span>
          </div>

          {/* Project Title (Bold Royal Navy #0B2545) */}
          <Link href={`/projects/${p.slug || p.id}`} className="group/title block">
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0B2545] group-hover/title:text-[#B8860B] transition-colors leading-tight">
              {p.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-slate-600 italic mt-1.5 line-clamp-1 leading-relaxed">
            &ldquo;{p.tagline}&rdquo;
          </p>

          {/* 3 Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 my-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Plots</div>
              <div className="text-xs font-extrabold text-slate-900 truncate mt-0.5">{p.plotRange}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Approval</div>
              <div className="text-xs font-extrabold text-emerald-700 truncate mt-0.5">{p.approval}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Possession</div>
              <div className="text-xs font-extrabold text-slate-900 truncate mt-0.5">{p.possession}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Googee Style */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <Link href={`/projects/${p.slug || p.id}`} className="block w-full">
            <Button className="w-full bg-[#0B2545] hover:bg-[#132E4E] text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm">
              <span>View Dedicated Page &amp; Layout</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </Button>
          </Link>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <Button
              onClick={() => onDetails(p)}
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-50 h-10 px-0 rounded-xl text-xs font-semibold"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" />
              <span>Preview</span>
            </Button>

            <Button
              onClick={() => onBook(p)}
              variant="outline"
              className="border-amber-300 text-[#8B6508] hover:bg-amber-50 h-10 px-0 rounded-xl text-xs font-bold"
              title="Book Site Visit"
            >
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
              <span>Tour</span>
            </Button>

            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=Interested%20in%20${encodeURIComponent(p.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full border-emerald-300 text-emerald-800 hover:bg-emerald-50 h-10 px-0 rounded-xl text-xs font-bold"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span>Chat</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Ventures & Projects Showcase Section (Googee Style) ───────
function ProjectsPortfolio({ onBook, onDetails }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filterTabs = [
    { label: 'All Ventures (11)', val: 'All' },
    { label: 'Ongoing Layouts (5)', val: 'Ongoing' },
    { label: 'Completed Landmarks (6)', val: 'Completed' },
    { label: 'Farmland Estates', val: 'Farm Land' },
    { label: 'DTCP Approved', val: 'DTCP' },
    { label: 'HMDA Approved', val: 'HMDA' },
  ]

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    if (activeFilter === 'Ongoing') return PROJECTS.filter(p => p.status === 'Ongoing')
    if (activeFilter === 'Completed') return PROJECTS.filter(p => p.status === 'Completed')
    if (activeFilter === 'Farm Land') return PROJECTS.filter(p => p.category === 'Farm Land' || (p.type || '').includes('Farm'))
    if (activeFilter === 'DTCP') return PROJECTS.filter(p => p.category === 'DTCP' || (p.approval || '').includes('DTCP'))
    if (activeFilter === 'HMDA') return PROJECTS.filter(p => p.category === 'HMDA' || (p.approval || '').includes('HMDA'))
    return PROJECTS
  }, [activeFilter])

  return (
    <section id="projects" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Our Signatures Portfolio
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2545] mt-3 leading-tight">
              Explore Our Ventures Across Telangana
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              From prime highway-facing townships to income-yielding mango farm retreats, discover your ideal real estate investment with 100% legal clarity.
            </p>
          </div>

          <Link href="/projects" className="shrink-0">
            <Button variant="outline" className="border-[#0B2545] text-[#0B2545] hover:bg-[#0B2545] hover:text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl">
              <span>View Full Directory (11 Projects)</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Googee Style Filter Tab Buttons */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-8 border-b border-slate-100">
          {filterTabs.map((t) => (
            <button
              key={t.val}
              onClick={() => setActiveFilter(t.val)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                activeFilter === t.val
                  ? 'bg-[#0B2545] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((p) => (
            <CleanProjectCard key={p.id} p={p} onBook={onBook} onDetails={onDetails} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Flagship Spotlight: Golden Palm City (Googee Feature Spotlight) ───────────
function FlagshipSpotlight({ onBook }) {
  const p = FLAGSHIP

  return (
    <section id="flagship" className="py-20 sm:py-24 bg-[#0B2545] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <img src={p.image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F4D078] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Crown Jewel Highway Development</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Golden Palm City, Jadcherla (NH-44)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            7.27-Acre DTCP &amp; RERA Approved Gated Plotted Community directly on the Hyderabad–Bengaluru Highway, adjacent to the 1,000+ acre Pollepally Pharma SEZ.
          </p>
        </div>

        {/* 4 Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Land Area', val: '7.27 Acres', sub: '37,147 sq.yds' },
            { label: 'Zoned Blocks', val: '9 Blocks', sub: 'Blocks A through I' },
            { label: 'Plot Sizes', val: '161 – 2,950', sub: 'sq.yds range' },
            { label: 'Highway Access', val: '200 Meters', sub: 'Directly from NH-44' },
          ].map((m) => (
            <div key={m.label} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F4D078]">{m.val}</div>
              <div className="text-xs font-semibold text-white mt-1">{m.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
            <img
              src={HERO_RENDERS.goldenPalmTower}
              alt="Golden Palm City Clubhouse"
              className="w-full h-80 sm:h-[420px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0B2545]/90 backdrop-blur-md border border-white/15 text-xs flex justify-between items-center">
              <div>
                <div className="text-[#F4D078] font-bold">Luxury Clubhouse &amp; Swimming Pool</div>
                <div className="text-slate-300 text-[11px]">Underground drainage, avenue plantation &amp; sports court</div>
              </div>
              <Badge className="bg-[#D4AF37] text-slate-950 font-bold">Active Progress</Badge>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase font-bold tracking-wider text-[#F4D078]">
                Why Golden Palm City is Telangana&apos;s #1 Realty Choice
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                Where Highway Connectivity Meets Luxury Living
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Positioned 5 minutes from Jadcherla IT Park and adjacent to the Pollepally SEZ housing 50,000+ top engineering and pharma professionals, Golden Palm City delivers unmatched living comfort and steady capital appreciation.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                'Direct 200m access to Hyderabad – Bengaluru 6-Lane NH-44',
                'Approved by DTCP, MUDA & TG RERA (LP No. 0032/GP/SWDL/2026)',
                'Underground modern drainage network with overhead water storage tank',
                '40ft & 33ft wide bitumen roads with footpaths and curbing stones',
                'Grand entrance arch, 24/7 CCTV surveillance and security cabin',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link href="/projects/golden-palm-city">
                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg">
                  <span>Explore Dedicated Page</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button
                onClick={() => onBook(p)}
                variant="outline"
                className="border-[#D4AF37] text-[#F4D078] hover:bg-[#D4AF37]/10 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Site Tour</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us (Googee Style 6-Card Grid) ─────────────────
function WhyChooseSection() {
  const reasons = [
    {
      title: '100% Clear Titles & Transparency',
      desc: 'Zero legal ambiguity. Every plot has complete title clearance, DTCP/HMDA/RERA validation, and immediate spot registration.',
      icon: Shield,
    },
    {
      title: 'Strategic High-Growth Corridors',
      desc: 'Selected along NH-44, Upcoming Regional Ring Road (RRR), and emerging pharma, data center, and aerospace SEZ clusters.',
      icon: Compass,
    },
    {
      title: '100% Vaastu Compliant Planning',
      desc: 'Engineered in strict accordance with authentic Vaastu principles to foster positive energy, wellbeing, and financial prosperity.',
      icon: Home,
    },
    {
      title: 'Superior Quality Infrastructure',
      desc: 'Built to last with full underground drainage, wide asphalt bitumen roads, avenue plantations, and modern street illumination.',
      icon: Layers,
    },
    {
      title: 'Proven High Appreciation & ROI',
      desc: 'Our delivered communities like Adarsh Nagar and Golden Spring have delivered 300% to 600%+ capital appreciation to homeowners.',
      icon: Award,
    },
    {
      title: 'Complimentary Chauffeured Site Visits',
      desc: 'We arrange door-to-door cab pickup from Hyderabad city centre for you and your family with zero-pressure architectural tours.',
      icon: Calendar,
    },
  ]

  return (
    <section id="why-choose-us" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            The Kings Pride Advantage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2545]">
            Why Thousands of Investors Choose KP Infra
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real estate is the most important financial commitment of a lifetime. Here is why discerning families have trusted us since 2003.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#B8860B]" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0B2545]">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials Section (Googee Style) ──────────────────────
function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Voices of Trust
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2545]">
            What Our Homeowners &amp; Investors Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Real experiences from families who placed their trust in Kings Pride Infra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.slice(0, 3).map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <div className="font-heading text-sm font-bold text-[#0B2545]">{t.name}</div>
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

// ─── Schedule Visit / Contact Form (Googee Style Lead Form) ────
function ContactVisitSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', project: 'Golden Palm City', date: '', time: 'Morning (10:00 AM - 1:00 PM)', notes: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please share your name and contact phone.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Site visit booked! Our relationship manager will call you within 30 minutes to confirm cab pickup.')
        setForm({ name: '', phone: '', email: '', project: 'Golden Palm City', date: '', time: 'Morning (10:00 AM - 1:00 PM)', notes: '' })
      } else {
        toast.error('Could not book. Please reach us directly via phone.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#0B2545] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Office & Concierge Details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4D078] bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Personalized Site Visit
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Walk the Land. <span className="text-[#F4D078]">Feel the Future.</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Nothing compares to walking the boundary lines yourself. Schedule a complimentary chauffeur-driven weekend site tour with our senior property consultant.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#F4D078]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">30-Minute Response</div>
                  <div className="text-xs text-slate-400">Confirmation call from our senior advisor</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#F4D078]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Zero High-Pressure Sales</div>
                  <div className="text-xs text-slate-400">Clear legal guidance and master plan walk-through</div>
                </div>
              </div>
            </div>

            {/* Corporate Office Card */}
            <div className="p-5 rounded-2xl bg-[#061425] border border-white/10 space-y-2 text-xs">
              <div className="text-[#F4D078] font-bold uppercase tracking-wider">Registered Corporate Office</div>
              <div className="text-slate-300">{BRAND.office.line1}, {BRAND.office.line2}</div>
              <div className="text-slate-300">{BRAND.office.area}, {BRAND.office.city} – {BRAND.office.pincode}</div>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                <a href={`tel:${BRAND.phone}`} className="text-[#D4AF37] hover:underline">
                  <Phone className="w-3.5 h-3.5 inline mr-1" /> {BRAND.phoneIntl}
                </a>
                <a href={`mailto:${BRAND.email}`} className="text-[#D4AF37] hover:underline">
                  <Mail className="w-3.5 h-3.5 inline mr-1" /> {BRAND.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Lead Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl">
              <div className="mb-6 space-y-1">
                <h3 className="font-heading text-2xl font-bold text-[#0B2545]">
                  Book Your Complimentary Site Visit
                </h3>
                <p className="text-xs text-slate-500">
                  Choose your preferred project, date and pickup time. We arrange everything.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Email Address</Label>
                    <Input
                      className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl text-slate-900"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Venture of Interest</Label>
                    <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
                      <SelectTrigger className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl">
                        <SelectValue placeholder="Select project" />
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Preferred Date</Label>
                    <Input
                      className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl text-slate-900"
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Preferred Time Slot</Label>
                    <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                      <SelectTrigger className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</SelectItem>
                        <SelectItem value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                        <SelectItem value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700">Notes / Questions</Label>
                  <Textarea
                    className="mt-1 bg-slate-50 border-slate-200 text-sm rounded-xl text-slate-900"
                    rows={2}
                    placeholder="E.g., Pickup location in Hyderabad, specific plot size preference..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:brightness-105"
                >
                  {loading ? 'Submitting Details…' : 'Confirm Site Visit Request'}
                </Button>

                <p className="text-[11px] text-center text-slate-500">
                  Your privacy is fully protected. Our senior relationship manager will contact you directly.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Corporate Footer (Googee Style) ──────────────────────────
function CorporateFooter() {
  return (
    <footer className="bg-[#050E17] text-slate-300 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 overflow-hidden bg-[#0B2545] p-1 flex items-center justify-center shadow-md">
                <img src={BRAND.logo} alt="KP Infra Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold tracking-tight text-white leading-none">
                  KINGS PRIDE <span className="text-[#D4AF37]">INFRA</span>
                </div>
                <div className="text-[10px] tracking-wider uppercase text-slate-400 mt-1">
                  A Bridge To Your Dream Home
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              K.P. Infra Projects Pvt. Ltd. has shaped over 300 acres of DTCP, HMDA, and RERA approved plotted communities across Telangana since 2003, built on 100% clean titles and complete customer satisfaction.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong>Head Office:</strong> Saleem Manzil, Reti Bowli, Mehdipatnam, Hyderabad</div>
              <div><strong>Helpline:</strong> {BRAND.phoneIntl} / +91 79977 00031</div>
              <div><strong>Email:</strong> {BRAND.email}</div>
            </div>
          </div>

          {/* Ongoing Ventures */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F4D078]">
              Ongoing Ventures
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECTS.filter(p => p.status === 'Ongoing').map(p => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug || p.id}`} className="hover:text-[#D4AF37] transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivered Landmarks */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F4D078]">
              Delivered Landmarks
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECTS.filter(p => p.status === 'Completed').slice(0, 6).map(p => (
                <li key={p.id}>
                  <Link href={`/projects/${p.slug || p.id}`} className="hover:text-[#D4AF37] transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#F4D078]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About KP Infra</a></li>
              <li><Link href="/projects" className="hover:text-[#D4AF37] transition-colors">Projects Directory</Link></li>
              <li><a href="#flagship" className="hover:text-[#D4AF37] transition-colors">Golden Palm City</a></li>
              <li><a href="#why-choose-us" className="hover:text-[#D4AF37] transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Book Site Visit</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>
          <div className="text-center md:text-right text-[11px]">
            Approval: TG RERA, DTCP &amp; HMDA approved layouts. Disclaimer: Visual renders are for illustrative purposes.
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating WhatsApp & Call Buttons (Googee Style Conversion) ────────────────
function FloatingContactActions({ onBook }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <a
        href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20KP%20Infra,%20I%20am%20interested%20in%20your%20projects.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <button
        onClick={() => onBook(null)}
        className="px-4 py-2.5 rounded-full bg-[#0B2545] hover:bg-[#132E4E] text-[#F4D078] border border-[#D4AF37]/50 shadow-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
      >
        <Calendar className="w-4 h-4 text-[#D4AF37]" />
        <span className="hidden sm:inline">Book Site Visit</span>
      </button>
    </div>
  )
}

// ─── Lead Dialog & Modal Quick Previews ────────────────────────
function SiteVisitDialog({ open, onOpenChange, project }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', project: project?.name || 'Golden Palm City', date: '', time: 'Morning' })
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
        toast.success('Site visit booked! Our advisor will call you within 30 minutes.')
        onOpenChange(false)
      } else {
        toast.error('Could not book. Please call us.')
      }
    } catch {
      toast.error('Network error.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8">
        <DialogTitle className="font-heading text-2xl font-bold text-[#0B2545]">
          Book a Free Site Tour
        </DialogTitle>
        <DialogDescription className="text-xs text-slate-500 mt-1">
          {project ? `Arrange a private visit to ${project.name}.` : 'Schedule a curated visit with complimentary chauffeured cab pickup.'}
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
            <Label className="text-xs font-semibold text-slate-700">Venture</Label>
            <Select value={form.project} onValueChange={(v) => setForm({ ...form, project: v })}>
              <SelectTrigger className="mt-1 h-11 bg-slate-50 border-slate-200 text-sm rounded-xl">
                <SelectValue placeholder="Select venture" />
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
            className="w-full h-12 bg-[#0B2545] hover:bg-[#132E4E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
          >
            {submitting ? 'Submitting…' : 'Confirm Site Visit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

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
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#D4AF37] text-slate-950">
              {p.approval}
            </span>
            <DialogTitle className="font-heading text-2xl sm:text-3xl font-extrabold mt-1 text-white">
              {p.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {p.location}
            </DialogDescription>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {p.shortDescription || (p.fullDescription ? p.fullDescription.slice(0, 200) + '...' : '')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Plots</div>
              <div className="font-extrabold text-slate-900 mt-0.5">{p.plotRange}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Price</div>
              <div className="font-extrabold text-[#B8860B] mt-0.5">{p.price}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Status</div>
              <div className="font-extrabold text-slate-900 mt-0.5">{p.status}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Possession</div>
              <div className="font-extrabold text-slate-900 mt-0.5">{p.possession}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/projects/${p.slug || p.id}`} className="flex-1 min-w-[140px]">
              <Button className="w-full bg-[#0B2545] hover:bg-[#132E4E] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl">
                <span>View Full Dedicated Page</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <Button
              onClick={() => { onOpenChange(false); onBook(p) }}
              variant="outline"
              className="flex-1 min-w-[140px] border-[#D4AF37] text-[#8B6508] hover:bg-amber-50 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl"
            >
              <Calendar className="w-4 h-4 mr-1.5 text-[#D4AF37]" />
              <span>Book Site Visit</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Root App ────────────────────────────────────────────
export default function App() {
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const [selectedBookProject, setSelectedBookProject] = useState(null)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedPreviewProject, setSelectedPreviewProject] = useState(null)

  const handleBook = (project) => {
    setSelectedBookProject(project)
    setBookDialogOpen(true)
  }

  const handlePreview = (project) => {
    setSelectedPreviewProject(project)
    setPreviewDialogOpen(true)
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#D4AF37]/30 selection:text-slate-950">
      <MainNavbar onBook={handleBook} />
      <HeroSection onBook={handleBook} />
      <TrustNumbers />
      <AboutSection onBook={handleBook} />
      <ProjectsPortfolio onBook={handleBook} onDetails={handlePreview} />
      <FlagshipSpotlight onBook={handleBook} />
      <WhyChooseSection />
      <TestimonialsSection />
      <ContactVisitSection />
      <CorporateFooter />
      <FloatingContactActions onBook={handleBook} />

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
    </main>
  )
}
