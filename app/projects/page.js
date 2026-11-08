import Link from 'next/link'
import { getAllProjects, BRAND, STATS } from '@/lib/projects'
import ProjectsDirectoryClient from './ProjectsDirectoryClient'

export const metadata = {
  title: 'Our Projects Portfolio | Kings Pride Infra — Plotted Layouts & Farmlands',
  description: 'Explore KP Infra’s complete portfolio of 11 landmark developments across Telangana, including Golden Palm City (NH-44 Jadcherla), Vantage Farms, Doctor’s Colony, Chandan Valley, Farm House ETB and our delivered HMDA communities.',
}

export default function ProjectsDirectoryPage() {
  const allProjects = getAllProjects()
  return <ProjectsDirectoryClient initialProjects={allProjects} />
}

