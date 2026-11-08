'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Heart,
  HelpCircle,
  Home,
  Info,
  Layers,
  MapPin,
  Maximize2,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  Play,
  Ruler,
  Share2,
  Shield,
  Sparkles,
  TrendingUp,
  X,
  Building2,
  Trees,
  Car,
  Clock,
  Send,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import { BRAND } from '@/lib/projects'

export default function ProjectClient({ project, relatedProjects = [] }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Visit booking state
  const [visitForm, setVisitForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)',
    notes: '',
  })

  // Investment calculator state
  const [calcInvestment, setCalcInvestment] = useState(2500000)
  const [calcYears, setCalcYears] = useState(5)
  const [calcRate, setCalcRate] = useState(18)

  const futureValue = Math.round(
    calcInvestment * Math.pow(1 + calcRate / 100, calcYears)
  )
  const capitalGain = futureValue - calcInvestment

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: `${project.name} | Kings Pride Infra`,
          text: project.tagline,
          url: window.location.href,
        }).catch(() => {})
      } else {
        navigator.clipboard.writeText(window.location.href)
        setCopiedLink(true)
        toast.success('Project link copied to clipboard!')
        setTimeout(() => setCopiedLink(false), 2500)
      }
    }
  }

  const handleVisitSubmit = async (e) => {
    e.preventDefault()
    if (!visitForm.name || !visitForm.phone) {
      toast.error('Please provide your name and contact phone number.')
      return
    }
    setBookingLoading(true)
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...visitForm,
          project: project.name,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(`Site visit requested for ${project.name}! Our senior relationship manager will call you within 30 minutes to confirm arrangements.`)
        setVisitForm({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: 'Morning (10:00 AM - 1:00 PM)',
          notes: '',
        })
      } else {
        toast.error('Could not submit booking. Please reach us directly via phone or WhatsApp.')
      }
    } catch {
      toast.error('Network connection issue. Please try again or call us directly.')
    } finally {
      setBookingLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview & Story', icon: Info },
    { id: 'masterplan', label: 'Master Plan & Layout', icon: Layers },
    { id: 'amenities', label: 'World-Class Amenities', icon: Sparkles },
    { id: 'location', label: 'Location & Connectivity', icon: MapPin },
    { id: 'gallery', label: `Gallery (${project.gallery?.length || 0})`, icon: Eye },
    { id: 'calculator', label: 'Investment Calculator', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-[#071320] text-slate-100 font-body selection:bg-[#D4AF37]/30 selection:text-[#F4D078]">
      {/* ─── Top Utility Announcement Bar ─────────────────────────────── */}
      <div className="bg-[#050D17] border-b border-[#D4AF37]/15 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D4AF37] font-semibold">{project.status}:</span>
            <span>{project.tagline}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${BRAND.phoneIntl}`} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{BRAND.phone}</span>
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi KP Infra team, I am interested in ${project.name} (${project.location}). Please share details and arrange a site visit.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors hidden sm:flex items-center gap-1"
            >
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Primary Sticky Luxury Header ─────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#071320]/90 border-b border-[#D4AF37]/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#D4AF37] transition-colors border border-white/10"
              title="Back to All Projects"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 overflow-hidden bg-[#0B1F35] flex items-center justify-center p-1 shadow-lg shadow-[#D4AF37]/10">
                <img src={BRAND.logo} alt="KP Infra Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-lg font-bold tracking-wider text-white">
                  KINGS PRIDE <span className="text-[#D4AF37]">INFRA</span>
                </div>
                <div className="text-[10px] tracking-widest uppercase text-slate-400 font-numbers -mt-1">
                  Est. 2003 • 22+ Years of Legacy
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#D4AF37] transition-colors border border-white/10"
              title="Share Project"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {project.brochureUrl && (
              <a
                href={project.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#F4D078] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Brochure</span>
              </a>
            )}

            <a
              href="#book-visit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-[#071320] font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Site Visit</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/#projects" className="hover:text-[#D4AF37] transition-colors">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#D4AF37] font-medium truncate">{project.name}</span>
        </nav>
      </div>

      {/* ─── Cinematic Full-Bleed Hero ───────────────────────────────── */}
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-end overflow-hidden pb-16 pt-8">
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image || project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover object-center scale-105 filter brightness-90 transform motion-safe:hover:scale-100 transition-transform duration-1000 ease-out"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/renders/goldenPalmTower.png'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071320] via-[#071320]/75 to-[#071320]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.15),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.isFlagship && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md">
                    ★ Flagship Development
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/15 text-[#F4D078]">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {project.approval}
                </span>
                {project.rera && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {project.rera}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                  {project.name}
                </h1>
                <p className="text-lg sm:text-xl text-[#F4D078] font-light mt-2 max-w-2xl">
                  {project.tagline}
                </p>
              </div>

              {/* Location pin */}
              <div className="flex items-center gap-2 text-sm text-slate-300 font-light">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{project.location}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{project.distance}</span>
              </div>

              {/* Highlights pills */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.highlights.slice(0, 4).map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs bg-slate-900/80 border border-slate-700/60 text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Action Box */}
            <div className="lg:col-span-4">
              <div className="backdrop-blur-xl bg-[#0B1F35]/85 border border-[#D4AF37]/30 rounded-2xl p-6 shadow-2xl shadow-black/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {project.priceLabel || 'Pricing'}
                </div>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-[#F4D078] mt-1">
                  {project.price}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Plots: <span className="text-slate-200 font-semibold">{project.plotRange}</span>
                </div>

                <div className="mt-5 space-y-2.5">
                  <a
                    href="#book-visit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 active:scale-98 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Private Site Visit</span>
                  </a>

                  {project.brochureUrl && (
                    <a
                      href={project.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4 text-[#D4AF37]" />
                      <span>Download Brochure (PDF)</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi KP Infra team, please share the official price list, available plot numbers and brochure for ${project.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium text-center flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Instant Price Breakdown on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Key Facts Strip ─────────────────────────────────────────── */}
      <section className="border-y border-[#D4AF37]/20 bg-[#050D17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="border-l-2 border-[#D4AF37] pl-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Total Area</div>
              <div className="font-heading text-lg font-bold text-white mt-0.5">{project.totalAreaShort || project.totalArea}</div>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Plot Sizes</div>
              <div className="font-heading text-lg font-bold text-white mt-0.5">{project.plotRange}</div>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Status</div>
              <div className="font-heading text-lg font-bold text-[#F4D078] mt-0.5">{project.status}</div>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Approval</div>
              <div className="font-heading text-lg font-bold text-white mt-0.5">{project.approval}</div>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Possession</div>
              <div className="font-heading text-lg font-bold text-white mt-0.5">{project.possession}</div>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Road Widths</div>
              <div className="font-heading text-lg font-bold text-white mt-0.5">{project.roadWidths || '33 ft & 40 ft'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sticky Tab Bar ─────────────────────────────────────────── */}
      <div className="sticky top-20 z-40 bg-[#071320]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md shadow-[#D4AF37]/20 font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-[#D4AF37]'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── Main Content Area ───────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TAB 1: OVERVIEW & STORY */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">The Architectural Vision</span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
                    About {project.name}
                  </h2>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-base space-y-4">
                  <p>{project.fullDescription || project.shortDescription}</p>
                  <p className="text-slate-400">
                    Developed with full statutory approvals, meticulous engineering, and deep respect for Vaastu principles, {project.name} represents our signature balance between peaceful, verdant living and solid wealth creation.
                  </p>
                </div>

                {/* USPs */}
                {project.usps && project.usps.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-heading font-semibold text-white mb-3">
                      Key Investment Advantages
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.usps.map((usp, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-200 leading-relaxed">{usp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Composition (if available e.g. GPC) */}
                {project.composition && (
                  <div className="pt-6 border-t border-slate-800">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4">
                      Master Plan Area Composition
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {Object.entries(project.composition).map(([k, item]) => (
                        <div key={k} className="p-4 rounded-xl bg-slate-900/80 border border-[#D4AF37]/20 text-center">
                          <div className="font-heading text-2xl font-bold text-[#F4D078]">{item.pct}%</div>
                          <div className="text-xs font-semibold text-white mt-1">{item.label}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{item.sqYds} sq.yds</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Quick Summary */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold tracking-wider uppercase text-[#D4AF37]">
                    Project Specifications
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Development Type</span>
                      <span className="text-white font-medium text-right">{project.type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Total Area</span>
                      <span className="text-white font-medium">{project.totalArea}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Plot Dimensions</span>
                      <span className="text-white font-medium">{project.plotRange}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Approvals</span>
                      <span className="text-[#F4D078] font-medium">{project.approval}</span>
                    </div>
                    {project.rera && (
                      <div className="flex justify-between py-2 border-b border-slate-800">
                        <span className="text-slate-400">RERA Registration</span>
                        <span className="text-white font-mono">{project.rera}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">Orientation</span>
                      <span className="text-white font-medium">{project.facing || '100% Vaastu Compliant'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">Possession</span>
                      <span className="text-emerald-400 font-semibold">{project.possession}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Brochure Download CTA */}
                {project.brochureUrl && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1F35] to-[#122b4a] border border-[#D4AF37]/30 text-center space-y-3">
                    <FileText className="w-10 h-10 text-[#D4AF37] mx-auto" />
                    <div className="font-heading text-lg font-bold text-white">Official Project Brochure</div>
                    <p className="text-xs text-slate-300">
                      Download the high-resolution architectural catalog, plot layout numbers, and project prospectus.
                    </p>
                    <a
                      href={project.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MASTER PLAN & LAYOUT */}
        {activeTab === 'masterplan' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Engineering Blueprints</span>
              <h2 className="font-heading text-3xl font-bold text-white mt-1">Master Plan & Layout Drawings</h2>
              <p className="text-sm text-slate-300 mt-2">
                Every layout is drafted by licensed civil architects and town planners with generous road widths, clear plot numbering, utility corridors, and dedicated green park buffers.
              </p>
            </div>

            {/* Layout Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.layoutPdf && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-white">Full Layout Plan Index</h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-[#D4AF37]/20 text-[#F4D078]">
                      Official Plan
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Comprehensive master layout displaying individual plot demarcations, road widths, open parks, and commercial zones.
                  </p>
                  <a
                    href={project.layoutPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#F4D078] border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Master Layout (PDF)</span>
                  </a>
                </div>
              )}

              {project.parkPdf && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-white">Landscaped Park Plan</h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300">
                      Landscape Design
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Detailed park architecture with jogging tracks, gazebo pavilions, flowering flora, and children play equipment.
                  </p>
                  <a
                    href={project.parkPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Park Plan (PDF)</span>
                  </a>
                </div>
              )}

              {project.building3dPdf && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-white">3D Elevation Drawings</h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-blue-500/20 text-blue-300">
                      Architecture
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Official architectural elevations, farmhouse models, and exterior facade design standards.
                  </p>
                  <a
                    href={project.building3dPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View 3D Elevation (PDF)</span>
                  </a>
                </div>
              )}

              {project.interior3dPdf && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-white">Interior 3D Concept Views</h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-purple-500/20 text-purple-300">
                      Interior Showcase
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sample weekend farmhouse interior perspectives, living spaces, and furnishing concepts.
                  </p>
                  <a
                    href={project.interior3dPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Interior 3D (PDF)</span>
                  </a>
                </div>
              )}
            </div>

            {/* Blocks table (if available) */}
            {project.blocks && project.blocks.length > 0 && (
              <div className="pt-6">
                <h3 className="font-heading text-xl font-bold text-white mb-4">Block-wise Area Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {project.blocks.map((b, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                      <div className="text-xs uppercase text-[#D4AF37] font-bold">Block {b.name}</div>
                      <div className="text-sm font-semibold text-white mt-1">{b.area}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AMENITIES & INFRASTRUCTURE */}
        {activeTab === 'amenities' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Premium Lifestyle Infrastructure</span>
              <h2 className="font-heading text-3xl font-bold text-white mt-1">World-Class Community Amenities</h2>
              <p className="text-sm text-slate-300 mt-2">
                Every amenity is engineered to elevate your daily quality of life while ensuring durable, low-maintenance community upkeep for decades to come.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.amenities?.map((amenity, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-[#D4AF37]/40 transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-white">{amenity}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Designed to state-of-the-art municipal and DTCP/HMDA infrastructure standards.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOCATION & CONNECTIVITY */}
        {activeTab === 'location' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Strategic Location Advantage</span>
              <h2 className="font-heading text-3xl font-bold text-white mt-1">Growth Corridor & Connectivity</h2>
              <p className="text-sm text-slate-300 mt-2">
                Strategically positioned in Telangana’s highest-velocity economic corridor along National Highway 44, upcoming Regional Ring Road (RRR), and multi-billion-dollar pharma & data centre clusters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Nearby Distances */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#D4AF37]" />
                  <span>Proximity to Key Landmarks</span>
                </h3>
                <div className="space-y-2.5">
                  {project.nearby?.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-4 hover:border-[#D4AF37]/30 transition-all"
                    >
                      <span className="text-sm text-slate-200 font-medium">{item.name}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#F4D078] border border-[#D4AF37]/30 whitespace-nowrap">
                        {item.dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighbours & SEZs */}
              <div className="lg:col-span-5 space-y-4">
                {project.neighbours && project.neighbours.length > 0 && (
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#D4AF37]" />
                      <span>Neighbouring Industrial Giants</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Located adjacent to major employers generating 50,000+ high-paying engineering, pharmaceutical, and technology jobs.
                    </p>
                    <div className="space-y-2">
                      {project.neighbours.map((n, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map Prompt */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1F35] to-[#071320] border border-[#D4AF37]/30 text-center space-y-3">
                  <MapPin className="w-8 h-8 text-[#D4AF37] mx-auto" />
                  <div className="font-heading text-lg font-bold text-white">Need GPS Location or Escorted Visit?</div>
                  <p className="text-xs text-slate-300">
                    We offer complimentary luxury chauffeured site visits from anywhere in Hyderabad directly to {project.name}.
                  </p>
                  <a
                    href="#book-visit"
                    className="inline-block py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Schedule Chauffeured Visit
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY & LIGHTBOX */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Visual Excellence</span>
                <h2 className="font-heading text-3xl font-bold text-white mt-1">Project Photo & Drone Gallery</h2>
              </div>
              <span className="text-xs text-slate-400">
                Click any image to view in ultra-high resolution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.gallery?.map((imgSrc, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-[#D4AF37]/50 transition-all shadow-lg"
                >
                  <img
                    src={imgSrc}
                    alt={`${project.name} - Photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = project.image || '/images/renders/goldenPalmTower.png'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex items-center gap-2 text-xs text-[#F4D078] font-semibold">
                      <Maximize2 className="w-4 h-4" />
                      <span>View Full Resolution</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: INVESTMENT CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Strategic Wealth Projection</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
                Land Appreciation Calculator
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Simulate potential capital appreciation for plots in {project.name} based on historical corridor growth rates (15% - 24% p.a.).
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-[#D4AF37]/30 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Initial Investment Amount</span>
                    <span className="text-[#F4D078] font-bold font-numbers text-sm">
                      ₹ {calcInvestment.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={20000000}
                    step={100000}
                    value={calcInvestment}
                    onChange={(e) => setCalcInvestment(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-numbers">
                    <span>₹ 5 Lakhs</span>
                    <span>₹ 1 Crore</span>
                    <span>₹ 2 Crores</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Holding Period (Years)</span>
                    <span className="text-[#F4D078] font-bold font-numbers text-sm">
                      {calcYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={calcYears}
                    onChange={(e) => setCalcYears(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-numbers">
                    <span>1 Year</span>
                    <span>5 Years</span>
                    <span>10 Years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Estimated Annual Appreciation Rate</span>
                    <span className="text-[#F4D078] font-bold font-numbers text-sm">
                      {calcRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={30}
                    step={1}
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-numbers">
                    <span>10% (Conservative)</span>
                    <span>18% (Corridor Avg)</span>
                    <span>30% (High Growth)</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 p-6 rounded-2xl bg-[#0B1F35] border border-[#D4AF37]/30 text-center space-y-4">
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  Estimated Future Portfolio Value
                </div>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-[#F4D078]">
                  ₹ {futureValue.toLocaleString('en-IN')}
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300">
                  Estimated Profit: <span className="text-emerald-400 font-bold">+₹ {capitalGain.toLocaleString('en-IN')}</span>
                </div>
                <a
                  href="#book-visit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider block hover:brightness-110 transition-all"
                >
                  Lock In Current Price
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── VIP Site Visit Booking Section ───────────────────────────── */}
      <section id="book-visit" className="py-20 border-t border-[#D4AF37]/20 bg-[#050D17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">VIP Concierge Experience</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Schedule Your Private Site Tour
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Experience {project.name} in person with our senior real estate advisors. We provide door-to-door luxury air-conditioned transportation upon request.
            </p>
          </div>

          <form onSubmit={handleVisitSubmit} className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-[#D4AF37]/30 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Abdul Rahman"
                  value={visitForm.name}
                  onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-[#D4AF37] text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={visitForm.phone}
                  onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-[#D4AF37] text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={visitForm.email}
                  onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-[#D4AF37] text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  value={visitForm.date}
                  onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-[#D4AF37] text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Preferred Time Window
                </label>
                <select
                  value={visitForm.time}
                  onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-[#D4AF37] text-white text-sm outline-none transition-colors"
                >
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Sunset Hour (4:30 PM - 6:30 PM)">Sunset Hour (4:30 PM - 6:30 PM)</option>
                  <option value="Weekend Special Tour">Weekend Special Tour</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Selected Project
                </label>
                <input
                  type="text"
                  disabled
                  value={project.name}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-[#F4D078] font-bold text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Special Requests or Pick-Up Location
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please arrange chauffeured cab from Jubilee Hills for 3 family members..."
                value={visitForm.notes}
                onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-[#D4AF37] text-white text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/30 hover:brightness-110 active:scale-98 disabled:opacity-50 transition-all"
            >
              {bookingLoading ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm Free VIP Site Visit</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-slate-400">
              🔒 Your contact information is kept strictly confidential. No spam, ever.
            </div>
          </form>
        </div>
      </section>

      {/* ─── Other Curated Projects ─────────────────────────────────── */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-20 border-t border-slate-800 bg-[#071320]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Curated Portfolio</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">Explore Other Projects</h2>
              </div>
              <Link href="/#projects" className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
                <span>View All 10 Projects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.slug || rel.id}`}
                  className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={rel.image || rel.coverImage}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-950/80 text-[#F4D078] border border-white/10">
                        {rel.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#D4AF37] font-semibold uppercase">{rel.category}</div>
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#F4D078] transition-colors mt-0.5">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{rel.shortDescription || rel.tagline}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold">{rel.price}</span>
                      <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Lightbox Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && project.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1))
              }
              className="absolute left-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <img
                src={project.gallery[lightboxIndex]}
                alt={`${project.name} gallery image`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = project.image || '/images/renders/goldenPalmTower.png'
                }}
              />
              <div className="mt-4 text-xs text-slate-400">
                {project.name} — Image {lightboxIndex + 1} of {project.gallery.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#D4AF37]/20 bg-[#030810] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-heading text-sm font-bold text-white">
              {BRAND.legalName}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Telangana’s Premier Real Estate Developer Since 2003 • Headquartered in Mehdipatnam, Hyderabad
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <Link href="/#projects" className="hover:text-[#D4AF37] transition-colors">All Projects</Link>
            <Link href="/#calculator" className="hover:text-[#D4AF37] transition-colors">Calculator</Link>
            <Link href="/#contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
      {/* ─── Mobile Sticky Action Bar for Project ───────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#071320]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_25px_rgba(0,0,0,0.6)]">
        <a
          href={`tel:${BRAND.mobile1}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg bg-white/5 active:bg-white/15 text-slate-200 text-[10px] font-semibold"
        >
          <Phone className="w-4 h-4 text-[#D4AF37] mb-0.5" />
          <span>Call Sales</span>
        </a>
        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi KP Infra team, I am interested in ${project.name} (${project.location}). Please share details and arrange a site visit.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg bg-emerald-500/15 active:bg-emerald-500/25 text-emerald-300 text-[10px] font-semibold"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#book-visit"
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F4D078] to-[#B8860B] text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-md active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </a>
        <Link
          href="/projects"
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg bg-white/5 active:bg-white/15 text-slate-200 text-[10px] font-semibold"
        >
          <Building2 className="w-4 h-4 text-[#D4AF37] mb-0.5" />
          <span>Projects</span>
        </Link>
      </div>

      <div className="md:hidden h-16" />
    </div>
  )
}

