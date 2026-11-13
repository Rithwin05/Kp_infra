'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, MessageCircle, Menu, X, MapPin, Star,
  CheckCircle2, ChevronRight, ChevronLeft, Mail, ArrowRight,
  Award, Shield, Users, Building2,
  ExternalLink, Sparkles, Trophy, Medal, Scale, Landmark,
  BadgeCheck, Check, Trees, Compass, Ruler, Car,
  ShieldCheck, HeartHandshake
} from 'lucide-react'
import { BRAND, STATS, PROJECTS, TESTIMONIALS } from '@/lib/projects'

// ─── Constants ────────────────────────────────────────────────────────────────
const ONGOING   = PROJECTS.filter(p => p.status === 'Ongoing')
const COMPLETED = PROJECTS.filter(p => p.status === 'Completed')
const FLAGSHIP  = PROJECTS.find(p => p.isFlagship) || PROJECTS[0]

const NAV_LINKS = [
  { label: 'Home',        href: '#' },
  { label: 'About Us',    href: '#about' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Approvals',   href: '#approvals' },
  { label: 'Why Us',      href: '#why-us' },
  { label: 'Testimonials',href: '#testimonials' },
  { label: 'Contact Us',  href: '#contact' },
]

const STAT_ITEMS = [
  { value: '22+',    label: 'Years of Professional Excellence' },
  { value: '12,000+',label: 'Happy Families' },
  { value: '11+',    label: 'Completed & Ongoing Projects' },
  { value: '300+',   label: 'Acres Developed' },
]

const SETS_US_APART = [
  {
    title: 'High-Quality Development',
    desc: 'Every project is master-planned with 40/33/30 ft black-top roads, underground modern drainage, avenue plantations, and LED street lighting.',
    accent: '#3B82F6',
  },
  {
    title: 'Transparent Dealings',
    desc: '100% clear titles, zero hidden charges, exact survey stone demarcation, and instant spot registration with comprehensive legal clearance.',
    accent: '#06B6D4',
  },
  {
    title: 'Strong Price Appreciation',
    desc: 'Carefully chosen land banks in high-growth corridors (NH-44, Pharma SEZ, Shamshabad Airport, RRR) delivering rapid capital multiplication.',
    accent: '#10B981',
  },
  {
    title: 'Prime Corridor Locations',
    desc: 'Direct highway frontage and rapid arterial connectivity to Rajiv Gandhi International Airport, Outer Ring Road, and emerging employment hubs.',
    accent: '#F59E0B',
  },
  {
    title: 'Trusted Reliability',
    desc: 'Over 22 unbroken years of on-schedule delivery, continuous infrastructure maintenance, and unblemished reputational excellence across Telangana.',
    accent: '#8B5CF6',
  },
  {
    title: 'Complete Peace of Mind',
    desc: 'Heavy pre-cast boundary walls, 24/7 security, dedicated caretakers, and professional post-handover customer assistance for all property owners.',
    accent: '#EC4899',
  },
]

// ─── Smooth Counter Hook ───────────────────────────────────────────────────────
function useCounter(targetStr, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const num = parseInt(targetStr.replace(/[^0-9]/g, ''), 10)
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(progress * num))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [targetStr, duration, trigger])

  const suffix = targetStr.replace(/[0-9,]/g, '')
  return `${val.toLocaleString()}${suffix}`
}

function StatNumber({ value, label, trigger }) {
  const count = useCounter(value, 2200, trigger)
  return (
    <div className="flex flex-col items-center text-center px-4 py-2">
      <span className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#B91C1C] tracking-tight">
        {count}
      </span>
      <span className="text-xs sm:text-sm text-neutral-500 font-medium mt-2 max-w-[180px] leading-snug">
        {label}
      </span>
    </div>
  )
}

// ─── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, index, className = '' }) {
  const isFarmland = project.category?.toLowerCase().includes('farm')
  const isTownship = project.isFlagship || project.category?.toLowerCase().includes('layout')

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_-12px_rgba(15,23,42,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative ${className}`}
    >
      {/* Image Container with Luxury Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-100">
        <Image
          src={project.coverImage || project.image}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 85vw, 400px"
        />

        {/* Top Dark Gradient for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Category Pill Top Left */}
        <div className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md">
          <span>{isFarmland ? '🌴' : isTownship ? '💎' : '🏡'}</span>
          <span>{project.category}</span>
        </div>

        {/* Status Badge Top Right */}
        <div className={`absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1.5 ${
          project.status === 'Ongoing'
            ? 'bg-emerald-600/95 text-white backdrop-blur-sm border border-emerald-400/30'
            : 'bg-neutral-900/90 text-amber-300 backdrop-blur-sm border border-amber-400/30'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Ongoing' ? 'bg-emerald-300 animate-pulse' : 'bg-amber-300'}`} />
          <span>{project.status === 'Ongoing' ? 'Active Project' : 'Delivered'}</span>
        </div>

        {/* Flagship Banner if Flagship */}
        {project.isFlagship && (
          <div className="absolute top-12 left-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>Flagship Township</span>
          </div>
        )}

        {/* Bottom Location Strip on Image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1 drop-shadow-md truncate max-w-[70%]">
            <span>📍</span>
            <span className="truncate">{project.location?.split(',').slice(0, 2).join(',')}</span>
          </span>
          <span className="text-[11px] text-amber-300 font-bold drop-shadow-md shrink-0">
            {project.totalAreaShort || 'Premium Layout'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        {/* Project Title */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1 flex items-center justify-between">
          <span>{project.name}</span>
          <ArrowRight size={16} className="text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </h3>

        {/* Short Description */}
        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
          {project.shortDescription || project.tagline}
        </p>

        {/* Key Specs 3-Chip Grid */}
        <div className="grid grid-cols-3 gap-1.5 py-2.5 px-2 bg-neutral-50 rounded-2xl border border-neutral-150/70 mb-4 text-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Plot Sizes</span>
            <span className="text-xs font-bold text-neutral-800 truncate mt-0.5">
              📐 {project.plotRange?.split('–')[0]?.trim() || 'Custom'}
            </span>
          </div>
          <div className="flex flex-col border-x border-neutral-200/80 px-1">
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Sanction</span>
            <span className="text-xs font-bold text-neutral-800 truncate mt-0.5">
              📜 {project.approval?.split('•')[0]?.trim() || 'Approved'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Demarcation</span>
            <span className="text-xs font-bold text-neutral-800 truncate mt-0.5">
              ⚖️ Spot Ready
            </span>
          </div>
        </div>

        {/* Amenities Highlights (2 key points) */}
        <div className="space-y-1.5 mb-5 text-xs text-neutral-600">
          {(project.highlights || []).slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-center gap-2 truncate">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>

        {/* Card Footer: Price & Explore CTA */}
        <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
              {project.priceLabel || 'Investment Value'}
            </div>
            <div className="text-base font-extrabold text-neutral-900">
              {project.price}
            </div>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
          >
            <span>Explore Layout</span>
            <span>↗</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [projectFilter, setProjectFilter] = useState('All')
  const [modalOpen, setModalOpen]         = useState(false)
  const [statsActive, setStatsActive]     = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const statsRef                          = useRef(null)
  const projectsScrollRef                 = useRef(null)
  const testimonialsScrollRef             = useRef(null)

  const scrollProjects = (dir) => {
    if (projectsScrollRef.current) {
      const scrollAmount = dir === 'left' ? -380 : 380
      projectsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollTestimonials = (dir) => {
    if (testimonialsScrollRef.current) {
      const scrollAmount = dir === 'left' ? -360 : 360
      testimonialsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Quick Enquiry Form state
  const [enquiryName, setEnquiryName]       = useState('')
  const [enquiryPhone, setEnquiryPhone]     = useState('')
  const [enquiryProject, setEnquiryProject] = useState('Golden Palm City')
  const [enquirySent, setEnquirySent]       = useState(false)

  // Track scroll position for sticky navbar style transformation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection observer for stats counter
  useEffect(() => {
    if (!statsRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'Ongoing') return ONGOING
    if (projectFilter === 'Completed') return COMPLETED
    return PROJECTS
  }, [projectFilter])

  const handleEnquirySubmit = (e) => {
    e.preventDefault()
    if (!enquiryPhone || enquiryPhone.length < 10) return
    setEnquirySent(true)
    setTimeout(() => {
      setEnquirySent(false)
      setModalOpen(false)
      setEnquiryPhone('')
      setEnquiryName('')
    }, 2500)
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-[#B91C1C] selection:text-white">

      {/* ════════════════════════════════════════════════════════════
          NAVBAR — OVERLAID ON TOP OF HERO IMAGE
          Transitions smoothly when scrolled past hero
      ════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-white/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.08)] border-b border-neutral-100 py-2.5 px-4 sm:px-6 lg:px-8'
            : 'top-2 sm:top-3 md:top-4 px-3 sm:px-5 md:px-7 lg:px-9 py-2 bg-transparent pointer-events-none'
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between gap-6 pointer-events-auto ${
          scrolled ? '' : 'px-2 sm:px-4'
        }`}>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            {scrolled ? (
              <Image
                src="/images/logo-full.png"
                alt="Kings Pride Infra Projects Pvt. Ltd."
                width={170}
                height={65}
                className="h-12 sm:h-14 w-auto object-contain transition-all"
                priority
              />
            ) : (
              <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-white/60 flex items-center">
                <Image
                  src="/images/logo-full.png"
                  alt="Kings Pride Infra Projects Pvt. Ltd."
                  width={150}
                  height={56}
                  className="h-9 sm:h-11 w-auto object-contain"
                  priority
                />
              </div>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  scrolled
                    ? 'text-neutral-700 hover:text-[#B91C1C]'
                    : 'text-white hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-[#B91C1C]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              SCHEDULE SITE VISIT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className={`lg:hidden p-2.5 rounded-full transition-colors ${
              scrolled
                ? 'text-neutral-700 hover:text-[#B91C1C]'
                : 'text-white bg-black/40 backdrop-blur-sm shadow-md'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border border-neutral-200 mt-2 mx-2 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-semibold text-neutral-800 hover:text-[#B91C1C] transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
                  <a
                    href={`tel:${BRAND.mobile1}`}
                    className="flex items-center gap-2 text-sm font-medium text-neutral-700"
                  >
                    <Phone size={15} className="text-[#B91C1C]" /> {BRAND.mobile1}
                  </a>
                  <button
                    onClick={() => { setMobileOpen(false); setModalOpen(true) }}
                    className="bg-[#B91C1C] text-white text-sm font-bold uppercase tracking-wider py-3 rounded-full text-center shadow-md"
                  >
                    SCHEDULE SITE VISIT
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ════════════════════════════════════════════════════════════
            1. INSET HERO / FRAMED HERO LAYOUT
            - Margin of frame is thinner (p-2 sm:p-3 md:p-4)
            - Hero image extends from very top to bottom of frame
            - Navbar elements sit directly on top of the image
            - Zero color tinting / golden glazing: 100% natural photo
        ════════════════════════════════════════════════════════════ */}
        <section className="bg-white p-2 sm:p-3 md:p-4">
          <div className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-2xl h-[88vh] min-h-[620px] sm:min-h-[700px] md:min-h-[760px] lg:min-h-[820px] flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-14">

            {/* Background Image — 100% Natural, No Color Glaze or Tint */}
            <Image
              src="/images/hero-hyderabad.jpg"
              alt="Hyderabad Skyline — Kings Pride Infra"
              fill
              className="object-cover object-center"
              priority
              quality={95}
            />

            {/* Hero Centered Content — Clean Serif Headline & Logo Pill */}
            <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto mt-16 sm:mt-12">

              {/* Main Headline — High Contrast Pure White with Deep Shadow for Crisp Legibility */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider uppercase leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] [text-shadow:_0_3px_16px_rgba(0,0,0,0.85)]"
              >
                BEST REAL ESTATE DEVELOPER<br />
                <span className="text-white">IN TELANGANA</span>
              </motion.h1>

              {/* Centered White Logo Pill Badge (Exact Googee Style) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="mt-8 sm:mt-12 bg-white rounded-full px-8 sm:px-12 py-3.5 sm:py-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] flex items-center justify-center border border-white/80"
              >
                <Image
                  src="/images/logo-full.png"
                  alt="Kings Pride Infra Projects Pvt. Ltd."
                  width={240}
                  height={85}
                  className="h-11 sm:h-14 md:h-16 w-auto object-contain"
                  priority
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            2. ABOUT US SECTION (White Canvas with Bold Red Stats)
        ════════════════════════════════════════════════════════════ */}
        <section id="about" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">

            {/* Red Small Label */}
            <div className="text-[#B91C1C] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              ABOUT US
            </div>

            {/* Body Copy */}
            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
              <p>
                Founded in 2003, <strong className="text-neutral-900 font-bold">K.P. Infra Projects Pvt. Ltd.</strong> is
                driven by dynamic leadership and a highly qualified team of civil engineers, master architects, and urban planners.
                We specialize in plotted township development, non-agriculture farmland communities, infrastructure, and gated residential enclaves.
                Over two unbroken decades, our name has become a benchmark for clear titles, statutory transparency, and remarkable capital growth.
              </p>
              <p>
                Leveraging this strong foundation, we have systematically identified and developed prime land parcels along South Hyderabad&apos;s
                fastest-growing highway corridors. As part of our roadmap, the group continues to deliver sprawling townships in Jadcherla, Shadnagar,
                Chandenvalle, and Balanagar, creating sustainable living and high appreciation for our investors.
              </p>
            </div>

            {/* 4 Stats Grid with Bold Red Numbers */}
            <div ref={statsRef} className="mt-14 pt-10 border-t border-neutral-100 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STAT_ITEMS.map(stat => (
                <StatNumber
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  trigger={statsActive}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            3. VISIONARY LEADERSHIP (Two Columns on White Background)
        ════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Column: Portrait Card with Rounded Corners */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100">
                <Image
                  src="/images/mohammed-aleemuddin.jpg"
                  alt="Mohammed Aleemuddin — Founder & Chairman, K.P. Infra Projects Pvt. Ltd."
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Overlaid Badge at bottom */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[11px] font-bold text-[#F0C040] uppercase tracking-wider">
                    FOUNDER &amp; CHAIRMAN
                  </div>
                  <div className="text-white font-bold text-xl sm:text-2xl">
                    Mohammed Aleemuddin
                  </div>
                  <div className="text-white/70 text-xs">
                    K.P. Infra Projects Pvt. Ltd.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Leadership Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <div className="text-[#B91C1C] text-xs font-bold uppercase tracking-[0.25em] mb-2">
                LEADERSHIP EXCELLENCE
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 leading-tight">
                Visionary Leadership
              </h2>
              <p className="text-sm text-neutral-500 font-medium mb-6">
                Guiding Higher Standards in Real Estate Development
              </p>

              <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                <p>
                  At Kings Pride Infra, under the stewardship of <strong className="text-neutral-900 font-bold">Mohammed Aleemuddin</strong>, our leadership has always believed that real estate is not merely about land transactions—it is about laying the foundation for generational wealth and family security.
                </p>
                <p>
                  From our very first project in 2003 to our flagship Golden Palm City on NH-44, every layout reflects our commitment to 100% clear titles, rigorous statutory approvals, and timely execution.
                </p>
              </div>

              <div className="w-full bg-neutral-50 border-l-4 border-[#B91C1C] p-4 sm:p-5 rounded-r-2xl mb-8">
                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                  &ldquo;Recognized across Telangana for pioneering DTCP, HMDA, and TG RERA approved plotted communities with immediate spot registration and lifetime infrastructure integrity.&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-4 border-t border-neutral-100">
                <div>
                  <div className="font-heading text-lg font-bold text-neutral-900">
                    Mohammed Aleemuddin
                  </div>
                  <div className="text-xs text-neutral-500 font-medium">
                    Founder &amp; Chairman • K.P. Infra Projects Pvt. Ltd.
                  </div>
                </div>

                <div className="bg-[#0B1528] text-white px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2">
                  <span className="text-[#F0C040] font-extrabold text-sm">22+</span>
                  <span className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
                    Years of Leadership Excellence
                  </span>
                </div>
              </div>

            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            4. RECOGNITIONS & STATUTORY APPROVALS (Compact, Mobile-Optimized)
            - Short vertical footprint on mobile!
            - Swipeable horizontal guarantees & single-strip accreditations
            - Real estate domain badges & emojis
        ════════════════════════════════════════════════════════════ */}
        <section id="approvals" className="bg-[#FAF8F5] py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            <div className="bg-[#0A1424] rounded-2xl sm:rounded-[36px] p-4 sm:p-8 lg:p-10 text-center text-white shadow-xl border border-amber-400/20 relative overflow-hidden">

              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-5xl mx-auto">

                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 sm:mb-3">
                  <span>🏛️</span>
                  <span>100% STATUTORY APPROVALS &amp; LEGAL CLEARANCE</span>
                </div>

                {/* Main Heading */}
                <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight tracking-tight">
                  Recognitions That Reflect Our Standards
                </h2>

                <p className="text-white/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-6">
                  Every square yard in our developments is officially sanctioned by statutory planning bodies with clear titles, survey demarcations, and bank loan pre-approvals.
                </p>

                {/* 5 Accreditations Micro-Badges — Ultra-compact horizontal row on mobile */}
                <div className="flex sm:grid sm:grid-cols-5 gap-2 overflow-x-auto sm:overflow-visible scroll-hide snap-x mb-4 sm:mb-6 pb-1 sm:pb-0">
                  {[
                    { name: 'TG RERA', label: 'RERA Sanctioned', icon: '🏛️', status: 'Verified' },
                    { name: 'HMDA', label: 'Zonal Compliant', icon: '📐', status: 'Approved' },
                    { name: 'DTCP', label: 'Town Planning', icon: '📜', status: 'Sanctioned' },
                    { name: 'MUDA', label: 'Urban Clearances', icon: '🛣️', status: 'Approved' },
                    { name: 'CLEAR TITLE', label: '30-Yr Search', icon: '⚖️', status: 'Guaranteed' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="min-w-[105px] sm:min-w-0 flex-1 bg-white/[0.07] border border-white/10 hover:border-amber-400/50 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center text-center snap-start"
                    >
                      <span className="text-lg sm:text-xl mb-0.5">{item.icon}</span>
                      <span className="font-heading text-xs sm:text-sm font-bold text-white tracking-wide">{item.name}</span>
                      <span className="text-[9px] sm:text-[10px] text-white/60 font-medium truncate mt-0.5">{item.label}</span>
                      <span className="mt-1 text-[8px] sm:text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded-full">
                        ✓ {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3 Core Trust Guarantees — Swipeable Horizontal Carousel on Mobile (Takes ~120px height!), 3 cols on desktop */}
                <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto sm:overflow-visible scroll-hide snap-x snap-mandatory text-left mb-3 sm:mb-6 pb-2 sm:pb-0">

                  {/* Pillar 1 */}
                  <div className="w-[78vw] sm:w-auto shrink-0 snap-start bg-white/[0.05] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg sm:text-xl">🏆</span>
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider">OFFICIAL SANCTIONS</div>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-white">100% Statutory Layouts</h3>
                      </div>
                    </div>
                    <p className="text-white/65 text-xs leading-relaxed">
                      Approved government LP orders with standardized 40/33/30 ft blacktop roads, underground storm drainage, and reserved public parks.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="w-[78vw] sm:w-auto shrink-0 snap-start bg-white/[0.05] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg sm:text-xl">🤝</span>
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider">22+ YEARS TRUST</div>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-white">12,000+ Happy Families</h3>
                      </div>
                    </div>
                    <p className="text-white/65 text-xs leading-relaxed">
                      Two unbroken decades of on-time project execution across 11 landmark developments with zero litigation and continuous capital growth.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="w-[78vw] sm:w-auto shrink-0 snap-start bg-white/[0.05] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 transition-all">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg sm:text-xl">📑</span>
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider">SPOT CONVEYANCE</div>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-white">Immediate Spot Registration</h3>
                      </div>
                    </div>
                    <p className="text-white/65 text-xs leading-relaxed">
                      Concrete numbered boundary stones, spot sub-registrar booking, mutation assistance, and pre-approved loans with SBI, HDFC &amp; ICICI.
                    </p>
                  </div>

                </div>

                {/* Mobile Swipe Hint for Approvals */}
                <div className="flex sm:hidden items-center justify-center gap-1.5 text-[10px] text-white/50 mb-3">
                  <span>←</span>
                  <span>Swipe to view all 3 trust guarantees</span>
                  <span>→</span>
                </div>

                {/* Compact Legal Strip */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-white/70">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[11px] sm:text-xs">
                    <span>🛡️ Clear Marketable Titles</span>
                    <span>📍 Numbered Survey Stones</span>
                    <span>🏛️ Bank Loan Facility</span>
                  </div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-colors shrink-0 shadow-sm"
                  >
                    Verify Layout Sanctions
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            5. OUR PROJECTS (Attractive, Astonishing Real Estate Showcase)
            - Flagship Spotlight for Golden Palm City
            - Category Filter Tabs with real estate emojis
            - Elevated Project Cards with rich specifications
        ════════════════════════════════════════════════════════════ */}
        <section id="projects" className="bg-[#FAF8F5] py-16 sm:py-20 px-3 sm:px-6 lg:px-8 border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 text-[#B91C1C] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <span>🏡</span>
                <span>CURATED PORTFOLIO</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4 leading-tight">
                Handcrafted Communities Across Telangana
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                From luxury highway townships to nature-embraced farmland estates — every KP Infra development is a masterpiece of legal clarity, prime location, and lasting value.
              </p>
            </div>

            {/* 🌟 FLAGSHIP SPOTLIGHT BANNER: Golden Palm City on NH-44 Macharam 🌟 */}
            <div className="mb-8 sm:mb-14 bg-gradient-to-br from-neutral-900 via-[#111A2E] to-neutral-900 rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-neutral-800 text-white grid lg:grid-cols-12 items-center">

              {/* Left Image Side */}
              <div className="lg:col-span-7 relative h-56 sm:h-80 lg:h-[440px] overflow-hidden bg-neutral-950">
                <Image
                  src={FLAGSHIP.coverImage || FLAGSHIP.image}
                  alt={FLAGSHIP.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Tags on Image */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-[11px] sm:text-xs font-extrabold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <span>⭐</span>
                  <span>FLAGSHIP HIGHWAY TOWNSHIP</span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-white/90">
                  <span className="flex items-center gap-1 truncate max-w-[65%]">
                    <span>🛣️</span>
                    <span className="truncate">NH-44 Hyderabad-Bengaluru</span>
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 font-bold border border-white/20 text-[10px] sm:text-xs shrink-0">
                    7.27 Acres • 9 Blocks
                  </span>
                </div>
              </div>

              {/* Right Details Side */}
              <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-amber-400 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                    {FLAGSHIP.category} • NH-44 Macharam, Jadcherla
                  </div>
                  <h3 className="font-heading text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                    {FLAGSHIP.name}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {FLAGSHIP.shortDescription}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6 text-xs text-white/85">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl">
                      <span>🏊</span>
                      <span className="truncate">Clubhouse &amp; Pool</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl">
                      <span>📜</span>
                      <span className="truncate">DTCP, MUDA &amp; RERA</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl">
                      <span>📐</span>
                      <span className="truncate">161 – 2,950 sq.yds</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl">
                      <span>📍</span>
                      <span className="truncate">Opp. Pharma SEZ</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Pricing</div>
                    <div className="text-base sm:text-lg font-extrabold text-amber-400">Price On Request</div>
                  </div>
                  <Link
                    href={`/projects/${FLAGSHIP.slug}`}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs sm:text-sm font-extrabold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-all shadow-lg hover:shadow-amber-400/20"
                  >
                    <span>View Flagship Details</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Category Filter Tabs with Real Estate Emojis */}
            <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
              {[
                { id: 'All', label: 'All Developments', count: PROJECTS.length, icon: '🌟' },
                { id: 'Ongoing', label: 'Ongoing Townships', count: ONGOING.length, icon: '🏗️' },
                { id: 'Completed', label: 'Delivered Communities', count: COMPLETED.length, icon: '🏡' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                    projectFilter === tab.id
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-[11px] px-2 py-0.2 rounded-full ${projectFilter === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Executive Carousel Navigation Bar */}
            <div className="flex items-center justify-between gap-4 mb-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-800">
                  Showing {filteredProjects.length} Master-Planned Developments
                </span>
                <span className="hidden md:inline-block text-xs text-neutral-400">
                  • Swipe horizontally or use navigation arrows
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => scrollProjects('left')}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-300 shadow-sm hover:shadow transition-all flex items-center justify-center active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollProjects('right')}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-300 shadow-sm hover:shadow transition-all flex items-center justify-center active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Horizontal Project Carousel */}
            <div
              ref={projectsScrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-hide scroll-smooth pb-5 pt-1 px-1 -mx-3 px-3 sm:mx-0 sm:px-0"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  className="w-[84vw] max-w-[340px] sm:max-w-none sm:w-[360px] lg:w-[390px] shrink-0 snap-start"
                />
              ))}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-neutral-500 mt-2 mb-4">
              <span>←</span>
              <span className="font-medium">Swipe horizontally to explore all {filteredProjects.length} layouts</span>
              <span>→</span>
            </div>

            {/* View Complete Portfolio Button */}
            <div className="text-center mt-14">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm"
              >
                <span>Browse All 11 Projects</span>
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            6. WHAT SETS US APART? (Real Estate Domain Advantage Matrix)
            - Feel-good modern palette with deep obsidian canvas
            - Real estate icons & emojis
            - Clear, compelling investor value propositions
        ════════════════════════════════════════════════════════════ */}
        <section id="why-us" className="bg-[#0B1528] py-12 sm:py-20 px-3 sm:px-6 lg:px-8 text-white relative">
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <span>🏆</span>
                <span>THE KINGS PRIDE ADVANTAGE</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide uppercase">
                WHAT <span className="text-amber-400">SETS US APART?</span>
              </h2>
              <p className="text-white/70 text-xs sm:text-sm mt-2 sm:mt-3 max-w-xl mx-auto leading-relaxed">
                Why 12,000+ families have entrusted their land investments to KP Infra over the past 22 years.
              </p>
            </div>

            {/* 6 Real Estate Advantage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  emoji: '🏗️',
                  title: 'Master-Planned Infrastructure',
                  desc: 'Standardized 40, 33 & 30 ft wide black-top roads with kerbing stones, modern underground drainage, overhead water storage, and dense avenue trees.',
                  highlight: 'Built for Longevity',
                },
                {
                  emoji: '⚖️',
                  title: '100% Clear & Marketable Titles',
                  desc: 'Direct spot registration with the Sub-Registrar, comprehensive 30-year non-encumbrance reports, and zero legal disputes in 22 years.',
                  highlight: 'Spot Conveyance',
                },
                {
                  emoji: '📈',
                  title: 'High Capital Appreciation',
                  desc: 'Prime growth corridors on South Hyderabad growth spine (NH-44, Pharma SEZs, Shamshabad Airport, and Regional Ring Road).',
                  highlight: 'Rapid Growth Corridor',
                },
                {
                  emoji: '📍',
                  title: 'Strategic Economic Hubs',
                  desc: 'Adjacent to world-class industrial hubs (Welspun Flooring, Microsoft Mega Data Centre, Amazon AWS, and Pollepally Pharma SEZ).',
                  highlight: 'Industrial Proximity',
                },
                {
                  emoji: '🤝',
                  title: '22+ Years Builder Integrity',
                  desc: 'Over two unbroken decades of on-time project execution, transparent dealings, and 12,000+ satisfied plot and villa homeowners.',
                  highlight: 'Unbroken Legacy',
                },
                {
                  emoji: '🛡️',
                  title: 'Gated Security & Long-Term Care',
                  desc: 'Heavy pre-cast compound perimeter walls, 24/7 CCTV surveillance, physical demarcation survey stones, and layout maintenance.',
                  highlight: '24/7 Peace of Mind',
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="bg-white/[0.05] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] rounded-2xl p-5 sm:p-7 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <span>✓</span>
                    <span>Verified KP Infra Guarantee</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            7. TESTIMONIALS (Warm, Feel-Good Luxury Editorial Cards)
        ════════════════════════════════════════════════════════════ */}
        <section id="testimonials" className="bg-[#FAF8F5] py-16 sm:py-24 px-3 sm:px-6 lg:px-8 border-b border-neutral-200/60">
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 text-[#B91C1C] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <span>💬</span>
                <span>CLIENT EXPERIENCES</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
                What Our Happy Clients Say
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm mt-2">
                Real stories from verified plot and farmland owners across our developments.
              </p>
            </div>

            {/* Testimonials Controls & Rating Header */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-800">
                  ⭐ 4.9/5 Average Rating
                </span>
                <span className="text-xs text-neutral-400">
                  • Verified Property Owners Across Telangana
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => scrollTestimonials('left')}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-300 shadow-sm hover:shadow transition-all flex items-center justify-center active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollTestimonials('right')}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-300 shadow-sm hover:shadow transition-all flex items-center justify-center active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Horizontal Testimonials Track */}
            <div
              ref={testimonialsScrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-hide scroll-smooth pb-5 pt-1 px-1 -mx-3 px-3 sm:mx-0 sm:px-0"
            >
              {(TESTIMONIALS || []).map((t, idx) => (
                <div
                  key={t.name || idx}
                  className="w-[84vw] max-w-[340px] sm:max-w-none sm:w-[350px] md:w-[380px] shrink-0 snap-start bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* 5 Stars & Verified Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} fill="#F59E0B" className="text-[#F59E0B]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span>✓</span>
                        <span>Verified Owner</span>
                      </span>
                    </div>

                    <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                      &ldquo;{t.quote || t.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-600 to-neutral-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {(t.name || 'C').charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1">
                        {t.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold line-clamp-1 mt-0.5">
                        🏡 {t.role || t.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-neutral-500 mt-2 mb-4">
              <span>←</span>
              <span className="font-medium">Swipe horizontally to read all client stories</span>
              <span>→</span>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white text-xs font-bold uppercase tracking-wider px-7 py-3 rounded-full transition-all"
              >
                <span>Read More Verified Reviews</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            8. CONTACT & SITE INSPECTION LOUNGE
            - Free luxury AC cab site inspection
            - Direct office contact & WhatsApp
        ════════════════════════════════════════════════════════════ */}
        <section id="contact" className="bg-[#FAF8F5] py-16 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Office & Direct Advisory */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 text-[#B91C1C] text-xs font-bold uppercase tracking-[0.2em] mb-2.5">
                <span>📍</span>
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4 leading-tight">
                Connect With Our Property Advisors
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-8">
                Whether you are seeking high-growth plotted investments on NH-44 or a tranquil weekend farm retreat, our advisors are here for you 7 days a week.
              </p>

              {/* Free Cab Incentive Pill */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                <span className="text-2xl">🚗</span>
                <div className="text-xs text-emerald-950">
                  <strong className="font-bold">Complimentary Site Walkthrough:</strong>
                  <div className="text-emerald-800 text-[11px] mt-0.5">Free luxury AC cab pickup and drop arranged directly from your residence in Hyderabad.</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-[#B91C1C] shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">Corporate Head Office</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                      {BRAND.office.line1}, {BRAND.office.line2}, {BRAND.office.area}, Hyderabad {BRAND.office.pincode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-[#B91C1C] shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">Direct Helplines</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800">
                      <a href={`tel:${BRAND.mobile1}`} className="hover:text-[#B91C1C] transition-colors">{BRAND.mobile1}</a> / <a href={`tel:${BRAND.phone}`} className="hover:text-[#B91C1C] transition-colors">{BRAND.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-emerald-600 shadow-sm">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">Instant WhatsApp Advisory</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-800">
                      <a
                        href={`https://wa.me/${BRAND.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20KP%20Infra%20projects.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1 font-bold"
                      >
                        Chat with us on WhatsApp <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Site Inspection Booking Form */}
            <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">📋</span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-900">
                  Book a Complimentary Site Inspection
                </h3>
              </div>
              <p className="text-xs text-neutral-500 mb-6">
                Fill in your details below. Our senior project manager will confirm your AC cab pickup time.
              </p>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryName}
                      onChange={e => setEnquiryName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-[#B91C1C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquiryPhone}
                      onChange={e => setEnquiryPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-[#B91C1C] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Select Development of Interest
                  </label>
                  <select
                    value={enquiryProject}
                    onChange={e => setEnquiryProject(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-[#B91C1C] transition-colors appearance-none"
                  >
                    {PROJECTS.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.category} ({p.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Preferred Visit Date &amp; Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Preferred weekend date, plot size requirements, or family size..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-[#B91C1C] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-[#B91C1C]/20 text-xs sm:text-sm mt-2"
                >
                  {enquirySent ? '✓ Site Visit Request Received!' : 'Confirm Free Site Visit Booking'}
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            9. CORPORATE FOOTER
        ════════════════════════════════════════════════════════════ */}
        <footer className="bg-[#050C1B] text-white/60 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">

            <div>
              <Image
                src="/images/logo-full.png"
                alt="Kings Pride Infra"
                width={170}
                height={70}
                className="h-16 w-auto object-contain mb-5"
              />
              <p className="text-xs leading-relaxed text-white/50 mb-5">
                K.P. Infra Projects Pvt. Ltd. — Telangana&apos;s most trusted plotted township and farmland developer. Dedicated to building generational wealth through 100% legal clarity.
              </p>
              <div className="text-xs text-white/80 font-bold">
                CIN: U45200TG2003PTC040000
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
                QUICK LINKS
              </h4>
              <ul className="space-y-2 text-xs">
                {NAV_LINKS.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors">
                    Complete Portfolio (11 Projects)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
                CORPORATE HEAD OFFICE
              </h4>
              <p className="text-xs leading-relaxed text-white/60 mb-4">
                Saleem Manzil, 1st Floor, Reti Bowli,<br />
                P.V.N.R. Expressway, Opp. Pillar No.56,<br />
                Mehdipatnam, Hyderabad – 500028,<br />
                Telangana, India.
              </p>
              <div className="text-xs text-white/80 space-y-1">
                <div>Phone: 040-23522339</div>
                <div>Mobile: +91 79977 00031</div>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
                BRANCH / SITE OFFICES
              </h4>
              <div className="text-xs text-white/60 space-y-3 mb-4">
                <div>
                  <strong className="text-white/80">Jadcherla Site Office:</strong><br />
                  NH-44 Macharam, Opp. IT Park, Jadcherla.
                </div>
                <div>
                  <strong className="text-white/80">Shadnagar Office:</strong><br />
                  Near Bangalore Highway (NH-44), Rangareddyguda.
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  {BRAND.email}
                </a>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <div>
              © {new Date().getFullYear()} K.P. Infra Projects Pvt. Ltd. All Rights Reserved.
            </div>
            <div>
              Designed with integrity for 12,000+ families across Telangana.
            </div>
          </div>
        </footer>

      </main>

      {/* ════════════════════════════════════════════════════════════
          MODAL: SCHEDULE SITE VISIT / DOWNLOAD BROCHURE
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-800 transition-colors"
                aria-label="Close dialog"
              >
                <X size={22} />
              </button>

              <div className="text-[#B91C1C] text-xs font-bold uppercase tracking-wider mb-1">
                K.P. INFRA PROJECTS
              </div>
              <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
                Schedule a Site Visit
              </h3>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                Experience our gated townships in person. Complimentary AC pickup and dedicated executive guidance provided.
              </p>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryName}
                    onChange={e => setEnquiryName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B91C1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={enquiryPhone}
                    onChange={e => setEnquiryPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B91C1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    Project
                  </label>
                  <select
                    value={enquiryProject}
                    onChange={e => setEnquiryProject(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-[#B91C1C]"
                  >
                    {PROJECTS.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.status})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold uppercase tracking-wider py-3 rounded-xl transition-colors text-xs mt-3 shadow-md shadow-[#B91C1C]/20"
                >
                  {enquirySent ? '✓ Site Visit Scheduled!' : 'Confirm Site Visit Request'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
