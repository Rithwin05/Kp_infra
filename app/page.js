'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, MessageCircle, Menu, X, MapPin, Star,
  CheckCircle2, ChevronRight, Mail, ArrowRight,
  Award, Shield, Users, Building2,
  ExternalLink, Sparkles, Trophy, Medal, Scale, Landmark,
  BadgeCheck, Check
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
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col group"
    >
      <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-100">
        <Image
          src={project.coverImage || project.image}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm ${
          project.status === 'Ongoing'
            ? 'bg-emerald-600 text-white'
            : 'bg-[#B91C1C] text-white'
        }`}>
          {project.status}
        </div>

        {project.isFlagship && (
          <div className="absolute top-3.5 right-3.5 bg-neutral-900/90 backdrop-blur-sm text-[#F0C040] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
            ★ Flagship
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="text-[11px] font-bold text-[#B91C1C] uppercase tracking-widest mb-1.5">
          {project.category}
        </div>
        <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-[#B91C1C] transition-colors line-clamp-1">
          {project.name}
        </h3>
        <p className="text-xs text-neutral-500 flex items-center gap-1.5 mb-3 line-clamp-1">
          <MapPin size={13} className="text-[#B91C1C] shrink-0" />
          {project.location?.split(',').slice(0, 2).join(',')}
        </p>

        {project.approval && (
          <div className="text-[11px] font-medium text-neutral-600 bg-neutral-50 border border-neutral-200/70 rounded-lg px-2.5 py-1 mb-4 line-clamp-1">
            {project.approval}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-neutral-400 font-medium">
              {project.priceLabel || 'Plot Sizes'}
            </div>
            <div className="text-sm font-bold text-neutral-900">
              {project.plotRange || project.price}
            </div>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 bg-neutral-900 hover:bg-[#B91C1C] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm"
          >
            Explore <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
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
            4. RECOGNITIONS THAT REFLECT OUR STANDARDS (Grand Prestigious Inset Canvas)
        ════════════════════════════════════════════════════════════ */}
        <section id="approvals" className="bg-white py-14 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Inset Container with Deep Royal Midnight Gradient & Gold Trim */}
            <div className="bg-gradient-to-b from-[#061226] via-[#091D3E] to-[#040C1A] rounded-3xl sm:rounded-[40px] p-6 sm:p-10 lg:p-16 text-center text-white shadow-[0_25px_80px_-15px_rgba(2,8,20,0.85)] border border-amber-400/25 relative overflow-hidden">

              {/* Luminous Ambient Background Glows */}
              <div className="absolute -top-36 -left-20 w-[420px] h-[420px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-36 -right-20 w-[420px] h-[420px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-radial-gradient from-blue-600/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-6xl mx-auto">

                {/* Eyebrow Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] px-5 py-2 rounded-full mb-4 shadow-sm backdrop-blur-sm"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  100% STATUTORY COMPLIANCE &amp; LEGAL CLEARANCE
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-md"
                >
                  Recognitions That Reflect Our Standards
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/75 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
                >
                  Every square yard in our plotted townships and gated farmland communities is legally sanctioned by statutory government authorities, ensuring complete financial safety and generational wealth.
                </motion.p>

                {/* 5 Statutory Accreditation Seals Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-12">
                  {[
                    {
                      name: 'TG RERA',
                      authority: 'Telangana Real Estate Regulatory Authority',
                      desc: 'Registered Layout Sanctions & Strict Investor Safeguards',
                      status: 'Sanctioned',
                      icon: Shield,
                      accent: '#F59E0B',
                    },
                    {
                      name: 'HMDA',
                      authority: 'Hyderabad Metropolitan Development Authority',
                      desc: 'Master Plan Zonal Compliance & Infrastructure Norms',
                      status: 'Compliant',
                      icon: Landmark,
                      accent: '#38BDF8',
                    },
                    {
                      name: 'DTCP',
                      authority: 'Directorate of Town & Country Planning',
                      desc: 'Approved Road Widths, Drainage, Parks & Commercial Belts',
                      status: 'Approved',
                      icon: Building2,
                      accent: '#10B981',
                    },
                    {
                      name: 'MUDA',
                      authority: 'Mahabubnagar Urban Development Authority',
                      desc: 'NH-44 Corridor Urban Infrastructure Clearances',
                      status: 'Sanctioned',
                      icon: Award,
                      accent: '#A855F7',
                    },
                    {
                      name: 'CLEAR TITLE',
                      authority: '100% Verified Ownership & Spot Demarcation',
                      desc: '30-Year Encumbrance Search & Immediate Spot Registration',
                      status: 'Guaranteed',
                      icon: Scale,
                      accent: '#EC4899',
                    },
                  ].map((auth, idx) => (
                    <motion.div
                      key={auth.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      className={`bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-amber-400/60 hover:bg-white/[0.12] transition-all duration-300 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center group shadow-sm ${
                        idx === 4 ? 'col-span-2 md:col-span-1' : ''
                      }`}
                    >
                      {/* Medallion Ring */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300 mb-3">
                        <auth.icon size={22} style={{ color: auth.accent }} />
                      </div>

                      {/* Name */}
                      <div className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1 tracking-wider">
                        {auth.name}
                      </div>

                      {/* Authority Label */}
                      <div className="text-[11px] text-white/80 font-semibold leading-snug line-clamp-2 mb-2">
                        {auth.authority}
                      </div>

                      {/* Verified Pill */}
                      <div className="mt-auto inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        <Check size={11} className="stroke-[3]" /> {auth.status}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3 Grand Gold Medallion Feature Cards (Googee Reference Style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-10">

                  {/* Medallion 1: Statutory Approvals */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative bg-gradient-to-b from-[#0B1E40] to-[#07152D] border border-amber-400/30 hover:border-amber-400/70 rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(245,158,11,0.15)] flex flex-col group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Gold Crest Top Row */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <div className="w-full h-full bg-[#081730] rounded-2xl flex items-center justify-center text-amber-300">
                          <Trophy size={26} />
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                          OFFICIAL SANCTIONS
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                          Statutory Layouts
                        </h3>
                      </div>
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                      Every layout carries verified statutory LP orders, adhering strictly to government master plans with 40/33/30 ft black-top roads and civic reservations.
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/85">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Official Government LP Numbering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>100% Vaastu Compliant Planning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Underground Drainage &amp; Water Systems</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Medallion 2: Customer Trust & Legacy */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative bg-gradient-to-b from-[#0B1E40] to-[#07152D] border border-amber-400/30 hover:border-amber-400/70 rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(245,158,11,0.15)] flex flex-col group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <div className="w-full h-full bg-[#081730] rounded-2xl flex items-center justify-center text-amber-300">
                          <Medal size={26} />
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                          UNBLEMISHED RECORD
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                          12,000+ Happy Families
                        </h3>
                      </div>
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                      Over 22 years of continuous on-schedule delivery with zero litigation across 11 landmark developments throughout Telangana&apos;s prime growth corridors.
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/85">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>22+ Years Established Track Record</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Multi-Fold Capital Appreciation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Zero Dispute &amp; Clean Title Legacy</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Medallion 3: Spot Registration & Bank Finance */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative bg-gradient-to-b from-[#0B1E40] to-[#07152D] border border-amber-400/30 hover:border-amber-400/70 rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(245,158,11,0.15)] flex flex-col group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <div className="w-full h-full bg-[#081730] rounded-2xl flex items-center justify-center text-amber-300">
                          <Scale size={26} />
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                          SPOT CONVEYANCE
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                          Immediate Registration
                        </h3>
                      </div>
                    </div>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                      Physical plot demarcation with survey stones, 30-year link document verification, instant mutation support, and bank loan approvals from premier lenders.
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/85">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Instant Spot Sub-Registrar Booking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Numbered Concrete Boundary Stones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                        <span>Pre-Approved Bank Loans (SBI / HDFC)</span>
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* Bottom Interactive Legal Verification Strip */}
                <div className="bg-white/5 border border-amber-400/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs text-white/80 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Shield size={14} className="text-amber-400" /> 100% Clear Marketable Titles
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BadgeCheck size={14} className="text-emerald-400" /> Non-Agricultural Approved
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-cyan-400" /> Spot Physical Possession
                    </span>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-extrabold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-amber-500/25 shrink-0"
                  >
                    Verify Layout Sanctions
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            5. OUR PROJECTS (Explore Our Range of Expert Real Estate Services)
        ════════════════════════════════════════════════════════════ */}
        <section id="projects" className="bg-[#FAF9F6] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="text-[#B91C1C] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                OUR PROJECTS
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
                Explore Our Range of Expert Real Estate Services
              </h2>
              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                Handcrafted highway townships, gated plotted communities, and farmland retreats across Telangana.
              </p>
            </div>

            <div className="flex justify-center items-center gap-2 mb-10 flex-wrap">
              {['All', 'Ongoing', 'Completed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setProjectFilter(tab)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                    projectFilter === tab
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/60'
                  }`}
                >
                  {tab === 'All' ? `All Projects (${PROJECTS.length})` : tab === 'Ongoing' ? `Ongoing (${ONGOING.length})` : `Delivered (${COMPLETED.length})`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm"
              >
                View Complete Portfolio <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            6. WHAT SETS US APART? (Dark Navy Full-Width Section)
        ════════════════════════════════════════════════════════════ */}
        <section id="why-us" className="bg-[#070E1E] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-white relative">
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                A HERITAGE OF TRUST BUILT ON OVER 22 YEARS
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wider uppercase">
                WHAT <span className="text-cyan-400">SETS US APART?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SETS_US_APART.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="bg-[#0B172E] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-cyan-400/40 hover:bg-[#0E1C38] transition-all duration-300 flex flex-col"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${item.accent}20` }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            7. TESTIMONIALS (White Canvas with Clean Cards)
        ════════════════════════════════════════════════════════════ */}
        <section id="testimonials" className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-[#B91C1C] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                TESTIMONIALS
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                What our happy clients say
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(TESTIMONIALS || []).slice(0, 4).map((t, idx) => (
                <motion.div
                  key={t.name || idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="bg-white border border-neutral-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" className="text-[#F59E0B]" />
                    ))}
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-5 flex-1">
                    &ldquo;{t.quote || t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                    <div className="w-9 h-9 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] font-bold text-xs flex items-center justify-center shrink-0">
                      {(t.name || 'C').charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-neutral-400 line-clamp-1">
                        {t.role || t.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors"
              >
                VIEW CLIENT STORIES <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            8. CONTACT US SECTION (Clean Two-Column Layout)
        ════════════════════════════════════════════════════════════ */}
        <section id="contact" className="bg-[#FAF9F6] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-5">
              <div className="text-[#B91C1C] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                GET IN TOUCH
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
                Connect With Our Property Advisors
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                Whether you are looking to purchase an investment plot on NH-44 or a weekend retreat, our team is ready to guide you.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center shrink-0 text-[#B91C1C] shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-0.5">Corporate Office</div>
                    <div className="text-sm font-semibold text-neutral-800 leading-snug">
                      {BRAND.office.line1}, {BRAND.office.line2}, {BRAND.office.area}, Hyderabad {BRAND.office.pincode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center shrink-0 text-[#B91C1C] shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-0.5">Direct Lines</div>
                    <div className="text-sm font-semibold text-neutral-800">
                      <a href={`tel:${BRAND.mobile1}`} className="hover:text-[#B91C1C] transition-colors">{BRAND.mobile1}</a> / <a href={`tel:${BRAND.phone}`} className="hover:text-[#B91C1C] transition-colors">{BRAND.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center shrink-0 text-[#B91C1C] shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-0.5">Official Email</div>
                    <div className="text-sm font-semibold text-neutral-800">
                      <a href={`mailto:${BRAND.email}`} className="hover:text-[#B91C1C] transition-colors">{BRAND.email}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center shrink-0 text-emerald-600 shadow-sm">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-0.5">WhatsApp Advisory</div>
                    <div className="text-sm font-semibold text-neutral-800">
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

            <div className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                Schedule a Private Site Inspection
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Complimentary luxury AC cab pickup and site walkthrough arranged for prospective buyers.
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
                    Select Project of Interest
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
                    Your Requirements / Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Preferred plot size, budget, or preferred site visit date..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-[#B91C1C] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold uppercase tracking-wider py-3.5 rounded-xl transition-colors duration-200 shadow-md shadow-[#B91C1C]/20 text-xs sm:text-sm mt-2"
                >
                  {enquirySent ? '✓ Request Submitted Successfully' : 'Request Site Visit / Callback'}
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            9. FOOTER (Dark Navy Header & Links)
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
