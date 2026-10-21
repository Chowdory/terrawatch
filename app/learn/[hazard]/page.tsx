import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HazardGuide } from '@/components/hazard-guide'
import { HAZARDS, LEARN_CONTENT, type Hazard } from '@/lib/learn-content'

const isHazard = (value: string): value is Hazard => (HAZARDS as readonly string[]).includes(value)

export function generateStaticParams() {
  return HAZARDS.map((hazard) => ({ hazard }))
}

export async function generateMetadata({ params }: PageProps<'/learn/[hazard]'>): Promise<Metadata> {
  const { hazard } = await params
  if (!isHazard(hazard)) return {}
  const name = hazard.charAt(0).toUpperCase() + hazard.slice(1)
  return {
    title: `${name} safety guide — TerraWatch`,
    description: LEARN_CONTENT[hazard].en.summary,
  }
}

export default async function HazardPage({ params }: PageProps<'/learn/[hazard]'>) {
  const { hazard } = await params
  if (!isHazard(hazard)) notFound()
  return <HazardGuide hazard={hazard} />
}
