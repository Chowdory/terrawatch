import type { Metadata } from 'next'
import { PrepareCenter } from '@/components/prepare-center'

export const metadata: Metadata = {
  title: 'Emergency preparedness — TerraWatch',
  description: 'Interactive emergency kit checklist and printable family emergency plan.',
}

export default function PreparePage() {
  return <PrepareCenter />
}
