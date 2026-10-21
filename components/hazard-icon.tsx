import { Activity, CloudRain, Flame, Mountain, Sun, Tornado, Waves, MountainSnow } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { Hazard } from '@/lib/learn-content'

const ICONS: Record<Hazard, React.ComponentType<LucideProps>> = {
  earthquake: Activity,
  tsunami: Waves,
  flood: CloudRain,
  wildfire: Flame,
  cyclone: Tornado,
  volcano: Mountain,
  drought: Sun,
  landslide: MountainSnow,
}

export function HazardIcon({ type, ...props }: { type: Hazard } & LucideProps) {
  const Icon = ICONS[type]
  return <Icon aria-hidden="true" {...props} />
}
