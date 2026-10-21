import type { Metadata } from 'next'
import { LearnIndex } from '@/components/learn-index'

export const metadata: Metadata = {
  title: 'Learn about natural hazards — TerraWatch',
  description: 'How earthquakes, tsunamis, floods, wildfires and more form, and how to stay safe.',
}

export default function LearnPage() {
  return <LearnIndex />
}
