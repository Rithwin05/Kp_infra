'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  Phone, MessageCircle, Calendar, MapPin, ArrowRight, ArrowUpRight,
  Award, Building2, Trees, Home, Shield, Sparkles, Star, ChevronRight,
  Menu, X, Users, Clock, BadgeCheck, Mail, ChevronDown, Quote,
  Compass, FileText, Layers, Ruler, CheckCircle2, Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'flagship', label: 'Flagship' },
  { id: 'legacy', label: 'Legacy' },
  { id: 'investor', label: 'Investor' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'contact', label: 'Contact' },
]

// ─── Hooks ───────────────────────────────────────────────────
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

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observers = []
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])
  return active
}

const formatINR = (n) => {
  if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} L`
  return `₹ ${n.toLocaleString('en-IN')}`
}

// ─── KP Diamond Logo ─────────────────────────────────────────
function KPDiamond({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 4px 14px rgba(212,175,55,0.55))' }}>
      <defs>
        <linearGradient id="kpGold1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E070" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#EDCA5C" />
        </linearGradient>
        <linearGradient id="kpShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Diamond body */}
      <rect x="14" y="14" width="72" height="72" rx="12" ry="12"
        transform="rotate(45 50 50)" fill="url(#kpGold1)" />
      {/* Shine */}
      <rect x="20" y="20" width="60" height="35" rx="8" ry="8"
        transform="rotate(45 50 50)" fill="url(#kpShine)" />
      {/* Building column lines (left of K) */}
      <line x1="27" y1="40" x2="27" y2="60" stroke="#0B1F35" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="31" y1="38" x2="31" y2="62" stroke="#0B1F35" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="35" y1="36" x2="35" y2="64" stroke="#0B1F35" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      {/* KP lettermark */}
      <text x="52" y="58" textAnchor="middle" fontFamily="Georgia,serif"
        fontWeight="900" fontSize="29" fill="#0B1F35" letterSpacing="-1">KP</text>
    </svg>
  )
}

function KPLogo({ scrolled = false }) {
  return (
    <a href="#home" className="flex items-center gap-3 group select-none">
      <motion.div animate={{ scale: scrolled ? 0.88 : 1 }} transition={{ duration: 0.35 }}>
        <KPDiamond size={scrolled ? 42 : 50} />
      </motion.div>
      <div className="leading-none">
        <div className="font-heading font-bold tracking-wider text-white text-base md:text-lg"
          style={{ textShadow: '0 1px 8px rgba(212,175,55,0.25)' }}>
          Kings Pride
        </div>
        <div className="text-gold font-numbers text-[9px] tracking-[0.3em] uppercase mt-0.5">
          Infra Projects
        </div>
      </div>
    </a>
  )
}

// Full brand mark for footer
function KPFullMark() {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-3">
        <KPDiamond size={56} />
        <div>
          <div className="font-heading text-xl text-white tracking-wide font-bold">Kings Pride</div>
          <div className="text-gold font-numbers text-[9px] tracking-[0.3em] uppercase">Infra Projects Pvt. Ltd.</div>
        </div>
      </div>
      <div className="text-gold/50 text-[10px] tracking-[0.25em] uppercase font-numbers italic pl-1">
        — Your Gateway to Luxury —
      </div>
    </div>
  )
}

// ─── Scroll Progress Bar ──────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#B8860B,#F5E070,#D4AF37,#F5E070,#B8860B)', transformOrigin: '0%' }}
    />
  )
}

// ─── Section Nav Dots ─────────────────────────────────────────
function SectionNav() {
  const active = useActiveSection()
  const [hovered, setHovered] = useState(null)
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5">
      {NAV_SECTIONS.map(({ id, label }) => (
        <a key={id} href={`#${id}`}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center justify-end gap-2.5 group"
        >
          <AnimatePresence>
            {hovered === id && (
              <motion.span
                initial={{ opacity: 0, x: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="text-[11px] text-white bg-navy/80 backdrop-blur-md px-2.5 py-1 rounded-sm font-numbers tracking-widest whitespace-nowrap border border-gold/20"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            animate={{
              width: active === id ? 22 : 7,
              height: active === id ? 7 : 7,
              backgroundColor: active === id ? '#D4AF37' : 'rgba(255,255,255,0.35)',
              boxShadow: active === id ? '0 0 8px rgba(212,175,55,0.7)' : 'none',
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full"
          />
        </a>
      ))}
    </div>
  )
}

// ─── Top Bar ─────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="hidden md:block bg-navy-deep text-white/80 text-xs border-b border-gold/10">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gold" /> {BRAND.phoneIntl}</span>
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gold" /> {BRAND.email}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gold" /> {BRAND.office.area}, {BRAND.office.city}</span>
        </div>
        <div className="text-gold tracking-widest font-numbers text-[10px]">
          TG RERA • DTCP • HMDA • MUDA APPROVED PROJECTS
        </div>
      </div>
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 50))
    return unsub
  }, [scrollY])

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
    <motion.header
      animate={{ backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-navy/95 shadow-[0_4px_40px_rgba(0,0,0,0.4)]' : 'bg-transparent'}`}
    >
      <TopBar />
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <KPLogo scrolled={scrolled} />

        <nav className="hidden xl:flex items-center gap-7">
          {links.map(({ l, h }) => (
            <a key={l} href={h} className="text-white/90 text-sm tracking-wide hover:text-gold transition-colors duration-200 relative group">
              {l}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button onClick={onCTA}
            className="bg-gold hover:bg-gold-dark text-navy font-semibold tracking-wide gold-shadow transition-all duration-300 hover:scale-105">
            <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
          </Button>
        </div>

        <button className="xl:hidden text-white p-1" onClick={() => setOpen(!open)}>
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X /></motion.div>
              : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu /></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-navy-deep border-t border-gold/20 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-2">
              {links.map(({ l, h }, i) => (
                <motion.a key={l} href={h}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="block text-white/90 hover:text-gold py-2.5 border-b border-white/5 last:border-0 transition-colors"
                >
                  {l}
                </motion.a>
              ))}
              <Button onClick={() => { onCTA(); setOpen(false) }} className="w-full mt-3 bg-gold text-navy font-semibold">
                <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero({ onCTA }) {
  const [idx, setIdx] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 6500)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[760px] w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform" style={{ y: imgY, scale: 1.15 }}>
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt="" className="w-full h-full object-cover ken-burns" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 vignette" />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity }} className="relative h-full container mx-auto px-6 flex flex-col justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] font-numbers uppercase">
              {BRAND.displayName} • Since {BRAND.established}
            </span>
          </motion.div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-[86px] leading-[1.04] font-medium mb-6">
            A Bridge to Your<br />
            <span className="text-gradient-gold italic">Dream Home</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 font-light leading-relaxed"
          >
            Twenty-two years of crafting Telangana&apos;s most trusted addresses — from integrated
            townships and managed farm lands to our flagship NH-44 highway city,{' '}
            <span className="text-gold font-medium">Golden Palm City.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Button onClick={onCTA} size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-semibold tracking-wide h-14 px-8 gold-shadow text-base transition-all duration-300 hover:scale-105">
              <Calendar className="w-5 h-5 mr-2" /> Schedule Site Visit
            </Button>
            <a href="#flagship">
              <Button size="lg" variant="outline"
                className="h-14 px-8 bg-white/5 backdrop-blur-md border-white/40 text-white hover:bg-white/15 hover:text-white text-base transition-all duration-300">
                Discover Golden Palm City <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="h-14 px-8 text-white hover:bg-white/10 text-base">
                <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> WhatsApp
              </Button>
            </a>
          </motion.div>

          <div className="mt-16 flex items-center gap-6 flex-wrap">
            {APPROVALS.slice(0, 5).map((a, i) => (
              <motion.div key={a}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08 }}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <BadgeCheck className="w-4 h-4 text-gold" /> {a}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Animated scroll cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-numbers">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>

      {/* Slide indicator dots */}
      <div className="absolute right-6 bottom-10 flex flex-col gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`slide ${i + 1}`}
            className={`w-1 rounded-full transition-all duration-500 ${i === idx ? 'bg-gold h-12' : 'bg-white/40 h-8'}`} />
        ))}
      </div>
    </section>
  )
}

// ─── Marquee ─────────────────────────────────────────────────
function MarqueeApprovals() {
  return (
    <div className="bg-navy-deep border-y border-gold/20 overflow-hidden py-4">
      <div className="flex whitespace-nowrap marquee">
        {[...APPROVALS, ...APPROVALS, ...APPROVALS].map((a, i) => (
          <div key={i} className="flex items-center gap-3 mx-8 text-gold/80 font-numbers tracking-[0.3em] text-sm uppercase">
            <Sparkles className="w-4 h-4 shrink-0" /> {a}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Trust / Stats ────────────────────────────────────────────
function StatCard({ value, suffix, label, icon: Icon, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const v = useCountUp(value, inView)
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7, delay }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-16 h-16 mx-auto mb-4 rounded-full border border-gold/40 flex items-center justify-center bg-navy/5 group-hover:bg-gold/10 group-hover:border-gold transition-all duration-500"
      >
        <Icon className="w-7 h-7 text-gold" />
      </motion.div>
      <div className="font-heading text-5xl md:text-6xl text-navy font-medium">
        <span className="font-numbers">{v.toLocaleString('en-IN')}</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="mt-2 text-sm tracking-[0.25em] uppercase text-muted-foreground">{label}</div>
    </motion.div>
  )
}

function TrustSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Trusted by Generations</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">A Legacy Carved in Numbers</h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <StatCard value={STATS.yearsOfLegacy} suffix="+" label="Years of Legacy" icon={Award} delay={0} />
          <StatCard value={STATS.happyFamilies} suffix="+" label="Happy Families" icon={Users} delay={0.1} />
          <StatCard value={STATS.projectsDelivered} suffix="+" label="Ventures Delivered" icon={Building2} delay={0.2} />
          <StatCard value={STATS.acresDeveloped} suffix="+" label="Acres Developed" icon={Trees} delay={0.3} />
        </div>
      </div>
    </section>
  )
}

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ p, onBook, onDetails, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-white border border-border hover:border-gold/40 rounded-sm overflow-hidden
        transition-all duration-500 flex flex-col
        shadow-[0_4px_20px_rgba(11,31,53,0.08)] hover:shadow-[0_20px_60px_rgba(11,31,53,0.18)]"
    >
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={p.image} alt={p.name} className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

        {/* Badges */}
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
          {[
            { l: 'Plot Range', v: p.plotRange },
            { l: 'Possession', v: p.possession },
            { l: 'Approval', v: p.approval },
            { l: 'Distance', v: p.distance },
          ].map(x => (
            <div key={x.l}>
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{x.l}</div>
              <div className="text-xs font-semibold text-navy mt-1 font-numbers">{x.v}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {p.highlights.slice(0, 4).map(h => (
            <span key={h} className="text-xs px-2.5 py-1 bg-navy/5 text-navy border border-navy/10 rounded-sm">{h}</span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button onClick={() => onDetails(p)} className="flex-1 bg-navy hover:bg-navy-deep text-white transition-all duration-300">
            View Details
          </Button>
          <Button onClick={() => onBook(p)} variant="outline" className="border-gold text-gold-dark hover:bg-gold hover:text-navy transition-all duration-300" title="Book Visit">
            <Calendar className="w-4 h-4" />
          </Button>
          {p.brochureUrl && (
            <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-navy/30 text-navy hover:bg-navy hover:text-white transition-all" title="Brochure">
                <FileText className="w-4 h-4" />
              </Button>
            </a>
          )}
          <a href={`https://wa.me/${BRAND.whatsapp}?text=Interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-all" title="WhatsApp">
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
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Signature Portfolio</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy max-w-2xl leading-tight">
              Ten Ventures, <span className="italic text-gradient-gold">One Promise</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              From early townships to our flagship NH-44 city, every project carries the same commitment to clean titles and on-time delivery.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <motion.button key={f} onClick={() => setFilter(f)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300
                  ${filter === f ? 'bg-navy text-white border-navy shadow-lg' : 'bg-white text-navy border-border hover:border-gold hover:text-gold-dark'}`}>
                {f}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} onBook={onBook} onDetails={onDetails} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Flagship Section ─────────────────────────────────────────
function FlagshipSection({ onBook }) {
  const p = FLAGSHIP
  const [galleryIdx, setGalleryIdx] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  useEffect(() => {
    const t = setInterval(() => setGalleryIdx(i => (i + 1) % p.gallery.length), 4800)
    return () => clearInterval(t)
  }, [p.gallery.length])

  return (
    <section ref={ref} id="flagship" className="relative bg-navy-deep text-white overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <img src={p.image} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy" />
      </motion.div>

      <div className="relative container mx-auto px-6 py-24">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Total Area', value: '7.27', unit: 'Acres', icon: Ruler },
            { label: 'Blocks', value: '9', unit: 'A → I', icon: Layers },
            { label: 'Plot Range', value: '161 – 2,950', unit: 'sq.yds', icon: Home },
            { label: 'Highway', value: '200', unit: 'm to NH-44', icon: Compass },
          ].map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.04, borderColor: '#D4AF37' }}
              className="border border-gold/20 bg-navy/40 backdrop-blur-sm p-5 text-center hover:bg-gold/5 transition-all duration-400 group cursor-default"
            >
              <m.icon className="w-6 h-6 mx-auto text-gold mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="font-numbers text-3xl font-bold">{m.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">{m.unit}</div>
              <div className="text-[10px] text-gold/80 uppercase tracking-[0.3em] mt-2">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Two column */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Gallery slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[480px] rounded-sm overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
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
                    className={`h-1 transition-all duration-300 rounded-full ${i === galleryIdx ? 'w-12 bg-gold' : 'w-6 bg-white/40'}`} />
                ))}
              </div>
              <Badge className="bg-gold text-navy font-numbers">{galleryIdx + 1} / {p.gallery.length}</Badge>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-3">{p.approval}</div>
            <h3 className="font-heading text-4xl mb-6">A premium highway-facing city, designed for legacy.</h3>
            <p className="text-white/80 leading-relaxed font-light mb-6">
              Spread across 7 acres 27 guntas along the Hyderabad–Bengaluru NH-44, Golden Palm City is more than a layout —
              it is a meticulously planned residential and commercial community, just five minutes from the Jadcherla IT Park
              and adjacent to the 1,000+ acre Pollepally SEZ.
            </p>
            <div className="space-y-3 mb-8">
              {p.usps.map((u, i) => (
                <motion.div key={u}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-white/85">{u}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => onBook(p)} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold gold-shadow transition-all duration-300 hover:scale-105">
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
          </motion.div>
        </div>

        {/* Composition cards */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Card className="bg-navy/50 border-gold/20 p-8 text-white backdrop-blur-sm h-full">
              <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Land Composition</div>
              <h4 className="font-heading text-3xl mb-6">37,147 sq.yds, thoughtfully planned</h4>
              <div className="space-y-5">
                {Object.entries(p.composition).map(([key, c], i) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{c.label}</span>
                      <span className="font-numbers"><span className="text-gold">{c.pct}%</span> · {c.sqYds} sq.yds</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full gradient-gold rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
            <Card className="bg-navy/50 border-gold/20 p-8 text-white backdrop-blur-sm h-full">
              <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Block Composition</div>
              <h4 className="font-heading text-3xl mb-6">Nine premium blocks</h4>
              <div className="grid grid-cols-3 gap-3">
                {p.blocks.map((b, i) => (
                  <motion.div key={b.name}
                    initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.06, borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.06)' }}
                    className="border border-gold/20 p-3 text-center transition-all duration-300 cursor-default"
                  >
                    <div className="font-heading text-gold text-2xl">{b.name}</div>
                    <div className="font-numbers text-xs text-white/70 mt-1">{b.area}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/40">sq.yds</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Amenities */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Lifestyle Amenities</div>
            <h3 className="font-heading text-4xl">Everything for High Class Living</h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {p.amenities.map((a, i) => (
              <motion.div key={a}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.035 }}
                whileHover={{ scale: 1.03, borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.06)' }}
                className="border border-gold/20 bg-navy/30 p-4 text-sm text-white/85 transition-all duration-300 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-gold mb-2" />
                {a}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connectivity */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Strategic Connectivity</div>
            <h3 className="font-heading text-4xl">At the Crossroads of Growth</h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {p.nearby.map((n, i) => (
              <motion.div key={n.name}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04, borderColor: '#D4AF37' }}
                className="border border-gold/20 bg-navy/30 p-5 hover:bg-gold/5 transition-all duration-300"
              >
                <Compass className="w-5 h-5 text-gold mb-3" />
                <div className="text-sm text-white">{n.name}</div>
                <div className="font-numbers text-xs text-gold mt-1">{n.dist}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 border border-gold/20 bg-navy/30 p-6">
            <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-3">Anchor Employers Nearby</div>
            <div className="flex flex-wrap gap-2">
              {p.neighbours.map(n => (
                <motion.span key={n} whileHover={{ scale: 1.04, borderColor: 'rgba(212,175,55,0.6)', color: '#fff' }}
                  className="text-xs px-3 py-1.5 border border-white/15 text-white/80 cursor-default transition-all duration-200">
                  {n}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h3 className="font-heading text-3xl md:text-5xl mb-6">Inventory is moving fast.</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Speak to a Golden Palm City advisor today. Site visits include a 15-minute architectural walkthrough,
            access to the live master plan, and a no-pressure investment consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => onBook(p)} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold gold-shadow h-14 px-10 transition-all duration-300 hover:scale-105">
              <Calendar className="w-5 h-5 mr-2" /> Reserve Site Visit
            </Button>
            <a href={`https://wa.me/${BRAND.whatsapp}?text=I'm%20interested%20in%20Golden%20Palm%20City`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/15 hover:text-white h-14 px-10">
                <MessageCircle className="w-5 h-5 mr-2 text-green-400" /> Chat with Advisor
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Timeline / Legacy ────────────────────────────────────────
function WhyKP() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

  return (
    <section ref={ref} id="legacy" className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={PROJECTS.find(p => p.id === 'moinabad-township').gallery[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">The Legacy</div>
          <h2 className="font-heading text-4xl md:text-5xl">
            Two Decades. <span className="italic text-gradient-gold">One Promise.</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-5 font-light">
            From Adarsh Nagar in 2009 to Golden Palm City in 2026, our journey has been built on
            transparency, design excellence, and an obsession with on-time delivery.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Scroll-driven animated center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block overflow-hidden">
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-gold via-gold/60 to-gold/10"
            />
          </div>

          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 md:px-10">
                  <motion.div
                    whileHover={{ borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.04)' }}
                    className={`p-6 border border-gold/30 bg-navy-deep/60 backdrop-blur-sm transition-all duration-400 ${i % 2 === 0 ? 'md:text-right' : ''}`}
                  >
                    <div className="font-numbers text-gold text-3xl font-bold">{t.year}</div>
                    <h3 className="font-heading text-xl mt-2">{t.title}</h3>
                    <p className="text-white/70 text-sm mt-2 font-light">{t.desc}</p>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="hidden md:flex w-5 h-5 rounded-full bg-gold ring-4 ring-gold/25 items-center justify-center relative z-10 shrink-0"
                >
                  <div className="w-2 h-2 bg-navy rounded-full" />
                </motion.div>
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Voices of Trust</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">Customer Stories</h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <Quote className="w-20 h-20 text-gold/20 absolute -top-6 -left-2" />
          <AnimatePresence mode="wait">
            <motion.div key={i}
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
              <button key={k} onClick={() => setI(k)} aria-label={`testimonial ${k + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${k === i ? 'w-10 bg-gold' : 'w-5 bg-navy/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Investment Calculator ─────────────────────────────────────
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
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Investor Intelligence</div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy">
            Visualise Your <span className="italic text-gradient-gold">Wealth Growth</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Calibrated against historic Telangana plot appreciation across our delivered portfolio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-2">
            <Card className="p-8 border-navy/10 luxe-shadow">
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
                <Button onClick={submit} className="w-full bg-navy hover:bg-navy-deep text-white h-12 transition-all duration-300 hover:scale-[1.02]">
                  Get Personalised Report <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-3">
            <Card className="p-8 border-navy/10 luxe-shadow bg-navy text-white h-full">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Future Value', val: formatINR(future), color: 'text-white' },
                  { label: 'Net Gain', val: formatINR(gain), color: 'text-emerald-300' },
                  { label: 'Multiple', val: `${multiple}x`, color: 'text-white' },
                ].map(x => (
                  <div key={x.label}>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-gold">{x.label}</div>
                    <div className={`font-numbers text-2xl md:text-3xl font-bold mt-1 ${x.color}`}>{x.val}</div>
                  </div>
                ))}
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="chartGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 11 }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 11 }}
                      tickFormatter={(v) => v >= 10000000 ? `${(v / 10000000).toFixed(1)}Cr` : `${(v / 100000).toFixed(0)}L`} />
                    <Tooltip
                      contentStyle={{ background: '#061425', border: '1px solid #D4AF37', borderRadius: 4 }}
                      formatter={(v) => [formatINR(v), 'Value']} />
                    <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2.5} fill="url(#chartGold)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Schedule Visit Form ──────────────────────────────────────
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
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Concierge Visit</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy leading-tight">
              Walk the Land. <span className="italic text-gradient-gold">Feel the Vision.</span>
            </h2>
            <p className="text-muted-foreground mt-5 font-light leading-relaxed">
              Schedule a curated site visit with our senior advisor. We arrange transportation from
              Hyderabad city centre, a private walkthrough of your chosen project, and a no-pressure consultation.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Clock, t: 'Within 30 mins', d: 'Confirmation call from your relationship manager' },
                { icon: Shield, t: 'Zero Pressure', d: 'Transparent property guidance — no aggressive tactics' },
                { icon: Award, t: 'Premium Hospitality', d: 'Curated tour with refreshments and concierge' },
              ].map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{b.t}</div>
                    <div className="text-sm text-muted-foreground">{b.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 p-5 bg-navy text-white">
              <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers mb-2">Head Office</div>
              <div className="text-sm font-light">{BRAND.office.line1}, {BRAND.office.line2}</div>
              <div className="text-sm font-light">{BRAND.office.area}, {BRAND.office.city} – {BRAND.office.pincode}</div>
              <div className="flex gap-4 mt-3 text-xs">
                <a href={`tel:${BRAND.phone}`} className="text-gold hover:text-white transition-colors">
                  <Phone className="w-3 h-3 inline mr-1" /> {BRAND.phoneIntl}
                </a>
                <a href={`mailto:${BRAND.email}`} className="text-gold hover:text-white transition-colors">
                  <Mail className="w-3 h-3 inline mr-1" /> {BRAND.email}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <Card className="p-8 luxe-shadow border-navy/10">
              <h3 className="font-heading text-2xl text-navy mb-6">Book Your Private Visit</h3>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-navy">Full Name *</Label>
                    <Input className="mt-1.5 h-11" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-navy">Phone *</Label>
                    <Input className="mt-1.5 h-11" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-widest text-navy">Email</Label>
                  <Input className="mt-1.5 h-11" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-widest text-navy">Project of Interest</Label>
                  <Select value={form.project} onValueChange={v => setForm({ ...form, project: v })}>
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
                    <Input className="mt-1.5 h-11" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-widest text-navy">Time Slot</Label>
                    <Select value={form.time} onValueChange={v => setForm({ ...form, time: v })}>
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
                  <Textarea className="mt-1.5" rows={3} value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    placeholder="Anything specific you'd like us to prepare?" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 bg-gold hover:bg-gold-dark text-navy font-semibold text-base transition-all duration-300 hover:scale-[1.02]">
                  {loading ? 'Booking…' : <><span>Confirm Site Visit</span> <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>
                <p className="text-xs text-center text-muted-foreground">Your details are confidential and used only by our sales team.</p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Blogs ────────────────────────────────────────────────────
function Blogs() {
  return (
    <section id="blogs" className="py-24 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Insights &amp; Intelligence</div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy">
              Stories from the <span className="italic text-gradient-gold">Growth Corridor</span>
            </h2>
          </motion.div>
          <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white transition-all">
            All Articles <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {BLOGS.map((b, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-white group cursor-pointer border border-border hover:border-gold/40 transition-all duration-500
                shadow-sm hover:shadow-[0_20px_50px_rgba(11,31,53,0.12)]"
            >
              <div className="h-56 overflow-hidden">
                <motion.img src={b.img} alt={b.title} className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }} transition={{ duration: 1.4 }} loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  <span className="text-gold-dark">{b.tag}</span> • <span>{b.date}</span> • <span>{b.read}</span>
                </div>
                <h3 className="font-heading text-xl text-navy group-hover:text-gold-dark transition-colors duration-300 leading-snug">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{b.excerpt}</p>
                <div className="mt-5 inline-flex items-center text-sm text-navy group-hover:text-gold-dark transition-colors">
                  Read more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Band ─────────────────────────────────────────────────
function CTABand({ onCTA }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <img src={FLAGSHIP.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/85" />
      </motion.div>
      <div className="relative container mx-auto px-6 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-numbers mb-3">Limited Inventory at Golden Palm City</div>
          <h2 className="font-heading text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
            Your address of distinction <span className="italic text-gradient-gold">awaits.</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mt-5 font-light">
            Join 12,000+ families who trusted Kings Pride Infra with the most important decision of their lives.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button onClick={onCTA} size="lg" className="bg-gold hover:bg-gold-dark text-navy font-semibold h-14 px-10 gold-shadow transition-all duration-300 hover:scale-105">
              Schedule Site Visit <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a href={`tel:${BRAND.phone}`}>
              <Button variant="outline" size="lg" className="h-14 px-10 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white transition-all">
                <Phone className="w-5 h-5 mr-2" /> {BRAND.phoneIntl}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-navy-deep text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <KPFullMark />
            <p className="text-white/60 text-sm font-light leading-relaxed mt-5">
              {BRAND.legalName}. {BRAND.tagline}.
            </p>
            <div className="mt-4 text-xs text-white/40 flex items-center gap-1">
              <Globe className="w-3 h-3" /> {BRAND.website}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-5 text-gold">Projects</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {PROJECTS.slice(0, 7).map(p => (
                <li key={p.id}>
                  <a href="#projects" className="hover:text-gold transition-colors duration-200">
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
              <Input placeholder="Email address" className="bg-navy border-white/20 text-white placeholder:text-white/40 focus:border-gold" />
              <Button className="bg-gold hover:bg-gold-dark text-navy transition-all duration-300 hover:scale-105 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-6 text-xs text-white/40 leading-relaxed">
              {APPROVALS.join(' • ')}
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {BRAND.legalName}. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a className="hover:text-gold transition-colors" href="#">Privacy</a>
            <a className="hover:text-gold transition-colors" href="#">Terms</a>
            <a className="hover:text-gold transition-colors" href="#">RERA Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Floating Actions ─────────────────────────────────────────
function FloatingActions({ onCTA }) {
  return (
    <>
      <a href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Kings%20Pride%20Infra`} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group">
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <span className="absolute right-16 bg-white text-navy text-xs px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
          Chat with us
        </span>
      </a>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy text-white border-t border-gold/20 grid grid-cols-3">
        <a href={`tel:${BRAND.phone}`} className="py-3 text-center text-xs flex flex-col items-center gap-1 hover:bg-navy-deep transition-colors">
          <Phone className="w-4 h-4 text-gold" /> Call
        </a>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="py-3 text-center text-xs flex flex-col items-center gap-1 bg-green-600">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <button onClick={onCTA} className="py-3 text-center text-xs flex flex-col items-center gap-1 bg-gold text-navy font-semibold">
          <Calendar className="w-4 h-4" /> Visit
        </button>
      </div>
    </>
  )
}

// ─── Lead Dialog ──────────────────────────────────────────────
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
        <div className="bg-navy text-white p-8">
          <div className="flex items-center gap-3 mb-4">
            <KPDiamond size={36} />
            <div>
              <div className="text-gold text-[10px] tracking-[0.4em] uppercase font-numbers">Private Consultation</div>
              <DialogTitle className="font-heading text-xl text-white">
                {project ? `Enquire: ${project.name}` : 'Schedule Your Site Visit'}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-white/70">
            Share your details and our senior advisor will arrange a curated visit within 24 hours.
          </DialogDescription>
        </div>
        <div className="p-8 space-y-4">
          <div>
            <Label className="text-xs uppercase tracking-widest text-navy">Full Name *</Label>
            <Input className="mt-1.5 h-11" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-navy">Phone *</Label>
            <Input className="mt-1.5 h-11" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-navy">Email</Label>
            <Input className="mt-1.5 h-11" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <Button onClick={submit} disabled={loading} className="w-full h-12 bg-gold hover:bg-gold-dark text-navy font-semibold transition-all duration-300">
            {loading ? 'Submitting…' : <><span>Request Callback</span> <ArrowRight className="w-4 h-4 ml-2" /></>}
          </Button>
          <p className="text-xs text-center text-muted-foreground">By submitting, you agree to be contacted by our sales team.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Project Detail Dialog ────────────────────────────────────
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
            <Button onClick={() => { onBook(p); onOpenChange(false) }} className="flex-1 bg-gold hover:bg-gold-dark text-navy font-semibold transition-all duration-300">
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

// ─── Root App ─────────────────────────────────────────────────
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
      <ScrollProgress />
      <SectionNav />
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
