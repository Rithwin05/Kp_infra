'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Filter,
  MapPin,
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
    <div className="min-h-screen bg-[#071320] text-slate-100 font-body selection:bg-[#D4AF37]/30 selection:text-[#F4D078]">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#071320]/90 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#D4AF37] transition-colors border border-white/10"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 overflow-hidden bg-[#0B1F35] flex items-center justify-center p-1 shadow-lg shadow-[#D4AF37]/10">
                <img src={BRAND.logo} alt="KP Infra Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-heading text-lg font-bold tracking-wider text-white">
                  KINGS PRIDE <span className="text-[#D4AF37]">INFRA</span>
                </div>
                <div className="text-[10px] tracking-widest uppercase text-slate-400 font-numbers -mt-1">
                  Project Portfolio
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BRAND.phoneIntl}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{BRAND.phone}</span>
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Intro ──────────────────────────────────────────────── */}
      <section className="relative py-16 border-b border-slate-800 bg-gradient-to-b from-[#091829] to-[#071320] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D4AF37]/15 text-[#F4D078] border border-[#D4AF37]/30">
            22+ Years of Real Estate Excellence
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Landmark Projects
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light">
            Discover K.P. Infra’s curated portfolio of highway-facing gated layouts, HMDA & DTCP approved residential plotted communities, and high-yielding farmland estates across Telangana.
          </p>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="font-heading text-2xl font-bold text-[#F4D078]">{STATS.yearsOfLegacy}+</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Years Legacy</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="font-heading text-2xl font-bold text-[#F4D078]">{STATS.projectsDelivered}</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Projects</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="font-heading text-2xl font-bold text-[#F4D078]">{STATS.happyFamilies.toLocaleString()}+</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Happy Families</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="font-heading text-2xl font-bold text-[#F4D078]">{STATS.acresDeveloped}+</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Acres Developed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search & Filter Controls ────────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-[#071320]/95 backdrop-blur-md border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Filter Pills */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 w-full md:w-auto">
              {FILTERS.map((f) => {
                const isActive = selectedFilter === f
                return (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {f}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-[#D4AF37] outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects Grid ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-heading font-semibold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your category filter or search terms.</p>
            <button
              onClick={() => { setSelectedFilter('all'); setSearchQuery('') }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-black/50"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <img
                    src={project.image || project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* Top tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      project.isFlagship
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950'
                        : 'bg-slate-950/80 backdrop-blur-md text-[#F4D078] border border-white/10'
                    }`}>
                      {project.isFlagship ? '★ Flagship' : project.status}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      {project.approval}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-xs">
                    <div className="text-[#F4D078] font-heading font-bold text-lg drop-shadow">
                      {project.price}
                    </div>
                    <div className="text-[11px] text-slate-300 drop-shadow">
                      {project.plotRange}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      {project.category} • {project.totalAreaShort || project.totalArea}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#F4D078] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {project.shortDescription || project.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href={`/projects/${project.slug || project.id}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold text-center flex items-center justify-center gap-1 group-hover:border-[#D4AF37]/40 transition-all"
                    >
                      <span>Explore Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </Link>

                    <Link
                      href={`/projects/${project.slug || project.id}#book-visit`}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1 hover:brightness-110 transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Visit</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#D4AF37]/20 bg-[#030810] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-heading text-sm font-bold text-white">{BRAND.legalName}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Telangana’s Premier Real Estate Developer Since 2003 • Headquartered in Mehdipatnam, Hyderabad
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-[#D4AF37] text-[#D4AF37] font-semibold">Projects</Link>
            <Link href="/#contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
