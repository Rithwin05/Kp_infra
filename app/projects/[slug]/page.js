import { notFound } from 'next/navigation'
import { getAllProjectSlugs, getProjectBySlug, getRelatedProjects, BRAND } from '@/lib/projects'
import ProjectClient from './ProjectClient'

export function generateStaticParams() {
  return getAllProjectSlugs()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Kings Pride Infra',
      description: 'The requested project could not be found.',
    }
  }

  const title = `${project.name} | ${project.approval || 'Approved'} Layout in ${project.location} — ${BRAND.shortName}`
  const description = project.shortDescription || `${project.name} by ${BRAND.displayName} — ${project.tagline}. Located in ${project.location}. Explore master plan, plot sizes, amenities and site visit.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: project.image || project.coverImage || BRAND.logo,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image || project.coverImage || BRAND.logo],
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(slug, 3)

  return <ProjectClient project={project} relatedProjects={relatedProjects} />
}

