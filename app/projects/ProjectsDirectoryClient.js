'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Filter,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Trees,
} from 'lucide-react'
import { BRAND, STATS, FILTERS } from '@/lib/projects'

export default function ProjectsDirectoryClient({ initialProjects }) {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // Filter category check
      let matchesCategory = true
      if (selectedFilter === 'Ongoing') matchesCategory = p.status === 'Ongoing'
      else if (selectedFilter === 'Completed') matchesCategory = p.status === 'Completed'
      else if (selectedFilter === 'Farm Land') matchesCategory = p.category === 'Farm Land'
      else if (selectedFilter === 'DTCP') matchesCategory = (p.approval || '').includes('DTCP')
      else if (selectedFilter === 'HMDA') matchesCategory = (p.approval || '').includes('HMDA')

      // Search query check
      let matchesSearch = true
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        matchesSearch =
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          (p.approval || '').toLowerCase().includes(q)
      }

      return matchesCategory && matchesSearch
    })
  }, [initialProjects, selectedFilter, searchQuery])

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#C5A880]/30 selection:text-slate-950">
      {/* ─── Architectural Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors border border-slate-200"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-white flex items-center justify-center p-1 shadow-sm">
                <img src={BRAND.logo} alt="KP Infra Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-serif text-lg tracking-wider font-semibold text-slate-950">
                  KINGS PRIDE <span className="text-[#C5A880]">INFRA</span>
                </div>
                <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono -mt-1">
                  11 Landmark Developments
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BRAND.phoneIntl}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{BRAND.phone}</span>
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs tracking-wide transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Schedule a Visit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Intro ──────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs tracking-widest uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            Official Project Directory • 11 Master-Planned Ventures
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-950 tracking-tight max-w-4xl mx-auto">
            Plotted Communities & Agro-Farmlands Engineered for Life
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-light leading-relaxed">
            Every venture in KP Infra’s 22-year portfolio is backed by 100% statutory clear titles, statutory DTCP/TG-RERA approvals, and prime highway connectivity along Telangana’s high-growth corridors.
          </p>

          {/* ASBL-Style 4-Pillar Stat Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-slate-950">{STATS.yearsOfLegacy}+</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">Years Trust</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-slate-950">{STATS.totalProjects || 11}</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">Ventures</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-slate-950">{STATS.happyFamilies.toLocaleString()}+</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">Delighted Families</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-slate-950">{STATS.acresDeveloped}+</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">Acres Master-Planned</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search & Filter Controls ────────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Filter Pills */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 w-full md:w-auto pb-1 md:pb-0">
              {FILTERS.map((f) => {
                const isActive = selectedFilter === f
                return (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-950 text-white font-medium shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search venture name, corridor, approval..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-950 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects Grid ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-semibold text-slate-900">No matching developments found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching with a different term.</p>
            <button
              onClick={() => { setSelectedFilter('All'); setSearchQuery('') }}
              className="mt-4 px-4 py-2 rounded-full bg-slate-950 text-xs text-white hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-400 overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={project.image || project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/images/renders/goldenPalmTower.png'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* Top tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase backdrop-blur-md ${
                      project.isFlagship
                        ? 'bg-[#C5A880] text-slate-950 font-semibold shadow-sm'
                        : project.status === 'Ongoing'
                        ? 'bg-slate-950/80 text-white border border-white/20'
                        : 'bg-white/90 text-slate-900 border border-slate-200'
                    }`}>
                      {project.isFlagship ? '★ Flagship' : project.status}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/90 text-slate-900 border border-slate-200 backdrop-blur-md shadow-sm">
                      {project.approval}
                    </span>
                  </div>

                  {/* Price Tag Overlay at Bottom Left */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <div className="font-serif text-lg font-medium drop-shadow-md">
                      {project.price}
                    </div>
                    <div className="text-[11px] text-slate-200 font-mono drop-shadow-md">
                      {project.plotRange}
                    </div>
                  </div>
                </div>

                {/* Project Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#947854]">
                      {project.category} • {project.totalAreaShort || project.totalArea}
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-slate-950 group-hover:text-[#947854] transition-colors leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.shortDescription || project.tagline}
                    </p>
                  </div>

                  {/* Location strip */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href={`/projects/${project.slug || project.id}`}
                      className="w-full py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-medium text-center flex items-center justify-center gap-1 transition-colors border border-slate-200"
                    >
                      <span>Explore Story</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>

                    {project.brochureUrl ? (
                      <a
                        href={project.brochureUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Brochure</span>
                      </a>
                    ) : (
                      <Link
                        href={`/projects/${project.slug || project.id}#book-visit`}
                        className="w-full py-2.5 px-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Visit</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ─── Architectural Footer ────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif text-sm font-semibold text-slate-900">{BRAND.legalName}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Telangana’s Benchmark Real Estate Developer Since 2003 • Headquartered in Mehdipatnam, Hyderabad
            </div>
          </div>
          <div className="flex items-center gap-6 text-slate-600">
            <Link href="/" className="hover:text-slate-950 transition-colors">Home</Link>
            <Link href="/projects" className="text-slate-950 font-semibold">Developments</Link>
            <Link href="/#philosophy" className="hover:text-slate-950 transition-colors">Philosophy</Link>
            <Link href="/#contact" className="hover:text-slate-950 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

      {/* ─── Mobile Sticky Action Bar ─────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a
          href={`tel:${BRAND.mobile1}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-medium"
        >
          <Phone className="w-4 h-4 text-[#C5A880] mb-0.5" />
          <span>Call</span>
        </a>
        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi KP Infra, I am browsing your portfolio of projects.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-200"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/#contact"
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-slate-950 text-white font-medium text-[11px] tracking-wide shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Book Visit</span>
        </Link>
        <Link
          href="/"
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-medium"
        >
          <Home className="w-4 h-4 text-[#C5A880] mb-0.5" />
          <span>Home</span>
        </Link>
      </div>

      <div className="md:hidden h-16" />
    </div>
  )
}
