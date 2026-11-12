'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Phone, MessageCircle, Menu, X, ArrowRight, ChevronDown,
  MapPin, Award, Star, Users, Clock, Shield, CheckCircle2,
  Building2, Home, FileText, Calendar, Mail, Quote, ChevronRight
} from 'lucide-react'
import { BRAND, STATS, PROJECTS, TESTIMONIALS } from '@/lib/projects'

// ─── Constants ────────────────────────────────────────────────────────────────
const ONGOING = PROJECTS.filter(p => p.status === 'Ongoing')
const COMPLETED = PROJECTS.filter(p => p.status === 'Completed')
const FLAGSHIP = PROJECTS.find(p => p.isFlagship) || PROJECTS[0]

const NAV_LINKS = [
  { label: 'Projects',     href: '#projects' },
  { label: 'Why KP Infra',href: '#why-us' },
  { label: 'Legacy',       href: '#legacy' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
]

const TRUST_BADGES = [
  { icon: Shield,       label: 'DTCP Approved' },
  { icon: CheckCircle2, label: 'HMDA Approved' },
  { icon: Award,        label: 'TG RERA Registered' },
  { icon: Clock,        label: '22+ Years Legacy' },
  { icon: Users,        label: '12,000+ Families' },
]

const WHY_CARDS = [
  {
    icon: Award,
    title: 'Proven Legacy Since 2003',
    desc: 'Over two decades of uncompromising integrity, 300+ acres developed, and 12,000+ happy families across Telangana.'
  },
  {
    icon: Shield,
    title: 'Fully Legal & Clear Title',
    desc: 'Every project carries DTCP, HMDA, RERA, or Municipal approvals with 100% clear title and spot-registration facility.'
  },
  {
    icon: MapPin,
    title: 'High-Growth Corridors',
    desc: 'Strategically chosen locations on NH-44, ORR, and emerging SEZ corridors for maximum capital appreciation.'
  },
  {
    icon: Building2,
    title: 'Premium Infrastructure',
    desc: 'Black-top roads, underground drainage, avenue plantations, gated security, and world-class amenities in every project.'
  },
  {
    icon: Users,
    title: 'Customer-First Philosophy',
    desc: 'Transparent dealings, honest pricing, and after-sale support that extends well beyond handover day.'
  },
  {
    icon: Star,
    title: 'Award-Winning Projects',
    desc: 'Recognised by industry bodies for design excellence, environmental sensitivity, and timely delivery.'
  },
]

// ─── Smooth counter hook ───────────────────────────────────────────────────────
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return count
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 2200, started)
  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-[#C5A028] mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-white/70 uppercase tracking-widest">{label}</div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-neutral-100">
        <Image
          src={project.coverImage || project.image}
          alt={project.name}
          fill
          className={`object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Status pill */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
          project.status === 'Ongoing'
            ? 'bg-emerald-500 text-white'
            : 'bg-[#C5A028] text-white'
        }`}>
          {project.status}
        </div>
        {project.isFlagship && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#1a1a2e] text-[#C5A028] text-xs font-bold rounded-full tracking-wide">
            ★ Flagship
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-[#C5A028] font-semibold uppercase tracking-widest mb-1">{project.category}</div>
        <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-[#C5A028] transition-colors">{project.name}</h3>
        <p className="text-sm text-neutral-500 flex items-center gap-1 mb-3">
          <MapPin size={12} className="shrink-0" />
          {project.location?.split(',').slice(0, 2).join(',')}
        </p>
        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{project.shortDescription}</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div>
            <div className="text-xs text-neutral-400">{project.priceLabel || 'Starting From'}</div>
            <div className="text-base font-bold text-neutral-900">{project.price}</div>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 bg-[#1a1a2e] hover:bg-[#C5A028] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-300"
          >
            Explore <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ t, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-7 shadow-md border border-neutral-100 flex flex-col gap-4"
    >
      <Quote size={28} className="text-[#C5A028] opacity-60" />
      <p className="text-neutral-700 leading-relaxed text-sm">{t.quote || t.text}</p>
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-100">
        <div className="w-10 h-10 rounded-full bg-[#C5A028]/20 flex items-center justify-center font-bold text-[#C5A028]">
          {(t.name || t.author || 'C').charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sm text-neutral-900">{t.name || t.author}</div>
          <div className="text-xs text-neutral-400">{t.role || t.location || 'Homeowner'}</div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="#C5A028" className="text-[#C5A028]" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  // Nav state
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Hero enquiry form
  const [enquiryProject, setEnquiryProject] = useState('')
  const [enquiryPhone, setEnquiryPhone] = useState('')
  const [enquirySent, setEnquirySent] = useState(false)

  // Filter state for projects
  const [filter, setFilter] = useState('All')

  // Legacy counter trigger
  const legacyRef = useRef(null)
  const [legacyVisible, setLegacyVisible] = useState(false)

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Legacy section visibility
  useEffect(() => {
    if (!legacyRef.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setLegacyVisible(true) }, { threshold: 0.3 })
    obs.observe(legacyRef.current)
    return () => obs.disconnect()
  }, [])

  // Close mobile menu on nav click
  const handleNav = useCallback(() => setMobileOpen(false), [])

  // Filter projects
  const filteredProjects = filter === 'All' ? PROJECTS : filter === 'Ongoing' ? ONGOING : COMPLETED

  // Enquiry submit
  const handleEnquiry = (e) => {
    e.preventDefault()
    if (!enquiryPhone || enquiryPhone.length < 10) return
    setEnquirySent(true)
    setTimeout(() => setEnquirySent(false), 4000)
    setEnquiryPhone('')
    setEnquiryProject('')
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0f1023]/95 backdrop-blur-md shadow-xl py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-3">
            <Image
              src="/images/logo-full.png"
              alt="Kings Pride Infra"
              width={160}
              height={72}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-[#C5A028] text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${BRAND.mobile1}`} className="flex items-center gap-2 text-white/80 hover:text-[#C5A028] text-sm font-medium transition-colors">
              <Phone size={15} />
              {BRAND.mobile1}
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#C5A028] hover:bg-[#a8891e] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-[#C5A028]/30"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0f1023] border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5">
                {NAV_LINKS.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={handleNav}
                    className="text-white/80 hover:text-[#C5A028] text-base font-medium transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <a href={`tel:${BRAND.mobile1}`} className="flex items-center gap-2 text-white text-base font-medium">
                    <Phone size={16} /> {BRAND.mobile1}
                  </a>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#C5A028] text-white text-base font-semibold px-5 py-3 rounded-xl"
                  >
                    <MessageCircle size={16} /> WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ════════════════════════════════════════════════════════════
            HERO SECTION — Googee Properties Style
        ════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

          {/* Background — Hyderabad skyline */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-hyderabad.jpg"
              alt="Hyderabad Skyline — Kings Pride Infra"
              fill
              className="object-cover object-center scale-105"
              priority
              quality={90}
            />
            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d1a]/75 via-[#0a0d1a]/55 to-[#0a0d1a]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d1a]/40 via-transparent to-[#0a0d1a]/30" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-28 pb-10 gap-6">

            {/* Logo centrepiece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <Image
                src="/images/logo-full.png"
                alt="Kings Pride Infra Projects Pvt Ltd"
                width={260}
                height={130}
                className="h-28 sm:h-36 w-auto object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-2 bg-[#C5A028]/20 border border-[#C5A028]/40 text-[#C5A028] px-5 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase backdrop-blur-sm"
            >
              <Award size={14} />
              Telangana&apos;s Most Trusted Since 2003
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight"
            >
              Your Gateway to{' '}
              <span className="text-[#C5A028]">Luxury Living</span>
              <br className="hidden sm:block" />
              {' '}in Telangana
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed"
            >
              22+ years of building dreams — premium plotted communities, farmland estates &amp; gated townships
              across Hyderabad&apos;s most sought-after growth corridors.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-2"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 bg-[#C5A028] hover:bg-[#a8891e] text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#C5A028]/30 text-sm sm:text-base"
              >
                Explore Projects <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20projects.%20Please%20share%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              >
                <MessageCircle size={16} /> Schedule Site Visit
              </a>
            </motion.div>

            {/* Enquiry form bar — Googee style */}
            <motion.form
              onSubmit={handleEnquiry}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="w-full max-w-3xl mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex flex-col sm:flex-row gap-3"
            >
              <select
                value={enquiryProject}
                onChange={e => setEnquiryProject(e.target.value)}
                className="flex-1 bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A028] appearance-none"
              >
                <option value="" className="text-black">Select a Project</option>
                {PROJECTS.map(p => (
                  <option key={p.slug} value={p.slug} className="text-black">{p.name}</option>
                ))}
              </select>
              <input
                type="tel"
                value={enquiryPhone}
                onChange={e => setEnquiryPhone(e.target.value)}
                placeholder="Your Phone Number"
                className="flex-1 bg-white/5 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A028]"
                required
              />
              <button
                type="submit"
                className="bg-[#C5A028] hover:bg-[#a8891e] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                {enquirySent ? '✓ Sent!' : 'Request Callback'}
              </button>
            </motion.form>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="relative z-10 pb-8 flex flex-col items-center"
          >
            <a href="#trust" className="flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors">
              <ChevronDown size={22} className="animate-bounce" />
            </a>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            TRUST BADGES
        ════════════════════════════════════════════════════════════ */}
        <section id="trust" className="bg-[#0f1023] border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap justify-center sm:justify-between gap-5">
            {TRUST_BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2.5 text-white/70"
              >
                <b.icon size={18} className="text-[#C5A028] shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PROJECTS SECTION
        ════════════════════════════════════════════════════════════ */}
        <section id="projects" className="bg-[#f8f7f4] py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">Our Portfolio</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1023] mb-4">
                Handcrafted Communities Across Telangana
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-base">
                From highway townships to hill-view farmlands — every KP Infra project is a meticulously planned
                environment built for life, leisure, and legacy.
              </p>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {['All', 'Ongoing', 'Completed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filter === tab
                      ? 'bg-[#0f1023] text-white shadow-md'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {tab}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({tab === 'All' ? PROJECTS.length : tab === 'Ongoing' ? ONGOING.length : COMPLETED.length})
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>

            {/* All projects CTA */}
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#0f1023] hover:bg-[#1a2048] text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg"
              >
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FLAGSHIP SPOTLIGHT
        ════════════════════════════════════════════════════════════ */}
        <section id="flagship" className="bg-[#0f1023] py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-3">
                Flagship Development
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-snug">
                {FLAGSHIP.name}
              </h2>
              <p className="text-white/60 mb-6 leading-relaxed">{FLAGSHIP.shortDescription}</p>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Total Area', value: FLAGSHIP.totalAreaShort },
                  { label: 'Approval', value: 'DTCP • MUDA • RERA' },
                  { label: 'Plot Sizes', value: FLAGSHIP.plotRange },
                  { label: 'Location', value: 'NH-44, Jadcherla' },
                ].map(item => (
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-[#C5A028] text-xs uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white font-semibold text-sm">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-2 mb-8">
                {FLAGSHIP.highlights.slice(0, 5).map(h => (
                  <li key={h} className="flex items-start gap-2 text-white/70 text-sm">
                    <CheckCircle2 size={15} className="text-[#C5A028] shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>

              <Link
                href={`/projects/${FLAGSHIP.slug}`}
                className="inline-flex items-center gap-2 bg-[#C5A028] hover:bg-[#a8891e] text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-[#C5A028]/20"
              >
                Explore {FLAGSHIP.name} <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative h-72 sm:h-96 lg:h-[520px] rounded-2xl overflow-hidden">
                <Image
                  src={FLAGSHIP.coverImage || FLAGSHIP.image}
                  alt={FLAGSHIP.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1023]/60 via-transparent to-transparent" />
                {/* Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                  <div className="text-white font-semibold text-sm">{FLAGSHIP.rera}</div>
                  <div className="text-white/50 text-xs mt-0.5">TG RERA Registration Number</div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[#C5A028] text-white rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-2xl font-bold leading-none">★</div>
                <div className="text-xs font-semibold mt-0.5">Flagship</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            WHY KP INFRA
        ════════════════════════════════════════════════════════════ */}
        <section id="why-us" className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">Why Choose Us</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1023] mb-4">
                The KP Infra Difference
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">
                Every decision we make is guided by one principle — to give each family the land, the life, and the legacy they deserve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-[#f8f7f4] hover:bg-[#0f1023] rounded-2xl p-7 transition-all duration-400 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C5A028]/15 group-hover:bg-[#C5A028]/20 flex items-center justify-center mb-5 transition-colors">
                    <card.icon size={22} className="text-[#C5A028]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0f1023] group-hover:text-white mb-2 transition-colors">{card.title}</h3>
                  <p className="text-sm text-neutral-500 group-hover:text-white/60 leading-relaxed transition-colors">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            LEGACY / STATS
        ════════════════════════════════════════════════════════════ */}
        <section id="legacy" ref={legacyRef} className="bg-[#0f1023] py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">Our Track Record</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Numbers That Speak for Themselves
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <StatCard value={STATS.yearsOfLegacy} suffix="+" label="Years of Legacy" started={legacyVisible} />
              <StatCard value={STATS.happyFamilies} suffix="+" label="Happy Families" started={legacyVisible} />
              <StatCard value={STATS.totalProjects} suffix="" label="Total Projects" started={legacyVisible} />
              <StatCard value={STATS.acresDeveloped} suffix="+" label="Acres Developed" started={legacyVisible} />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════════════════════════ */}
        <section id="testimonials" className="bg-[#f8f7f4] py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">Client Stories</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0f1023]">
                Trusted by 12,000+ Families
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(TESTIMONIALS || []).slice(0, 3).map((t, i) => (
                <TestimonialCard key={i} t={t} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CONTACT / CONSULTATION
        ════════════════════════════════════════════════════════════ */}
        <section id="contact" className="bg-[#0f1023] py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Let&apos;s Find Your Perfect Plot
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Our property consultants are available 7 days a week to answer your questions and arrange site visits.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-10">

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 flex flex-col gap-6"
              >
                {[
                  { icon: Phone, label: 'Phone', val: BRAND.mobile1, href: `tel:${BRAND.mobile1}` },
                  { icon: MessageCircle, label: 'WhatsApp', val: '+91 79977 00031', href: `https://wa.me/${BRAND.whatsapp}` },
                  { icon: Mail, label: 'Email', val: BRAND.email, href: `mailto:${BRAND.email}` },
                  { icon: MapPin, label: 'Office', val: `${BRAND.office.line1}, ${BRAND.office.area}, Hyderabad`, href: '#' },
                ].map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#C5A028]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C5A028]/30 transition-colors">
                      <item.icon size={18} className="text-[#C5A028]" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-0.5">{item.label}</div>
                      <div className="text-white text-sm group-hover:text-[#C5A028] transition-colors">{item.val}</div>
                    </div>
                  </a>
                ))}

                {/* Social CTA */}
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20booking%20a%20site%20visit.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 bg-[#C5A028] hover:bg-[#a8891e] text-white font-semibold py-4 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle size={16} /> Book Site Visit on WhatsApp
                </a>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-5"
                onSubmit={e => { e.preventDefault(); alert('Thank you! Our team will contact you shortly.') }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/60 text-xs uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A028] transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/60 text-xs uppercase tracking-widest">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A028] transition-colors"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs uppercase tracking-widest">Project of Interest</label>
                  <select className="bg-white/5 border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A028] transition-colors appearance-none">
                    <option value="" className="text-black">Select a project…</option>
                    {PROJECTS.map(p => <option key={p.slug} value={p.slug} className="text-black">{p.name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs uppercase tracking-widest">Message (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us your requirements…"
                    className="bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A028] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C5A028] hover:bg-[#a8891e] text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-[#C5A028]/20"
                >
                  Send Enquiry →
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════ */}
        <footer className="bg-[#080c18] text-white/60 py-14 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Image
                src="/images/logo-full.png"
                alt="Kings Pride Infra"
                width={160}
                height={72}
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-sm leading-relaxed text-white/50 mb-4">
                Building trust and delivering dreams across Telangana since 2003.
              </p>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C5A028]/20 hover:bg-[#C5A028]/30 border border-[#C5A028]/30 text-[#C5A028] text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navigate</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map(l => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm hover:text-[#C5A028] transition-colors">{l.label}</a>
                  </li>
                ))}
                <li><Link href="/projects" className="text-sm hover:text-[#C5A028] transition-colors">All Projects</Link></li>
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Our Projects</h4>
              <ul className="space-y-2.5">
                {PROJECTS.slice(0, 6).map(p => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="text-sm hover:text-[#C5A028] transition-colors">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="text-[#C5A028] shrink-0 mt-0.5" />
                  {BRAND.office.line1}, {BRAND.office.line2}, {BRAND.office.area}, Hyderabad {BRAND.office.pincode}
                </li>
                <li>
                  <a href={`tel:${BRAND.mobile1}`} className="flex items-center gap-2 text-sm hover:text-[#C5A028] transition-colors">
                    <Phone size={13} className="text-[#C5A028] shrink-0" /> {BRAND.mobile1}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-sm hover:text-[#C5A028] transition-colors">
                    <Mail size={13} className="text-[#C5A028] shrink-0" /> {BRAND.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
            <span>© {new Date().getFullYear()} Kings Pride Infra Projects Pvt. Ltd. All rights reserved.</span>
            <span>Designed with care for 12,000+ families across Telangana.</span>
          </div>
        </footer>
      </main>
    </>
  )
}
