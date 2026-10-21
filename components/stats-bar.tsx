'use client'

import type { DisasterEvent } from '@/lib/disasters'
import { useLanguage } from './language-provider'

export function StatsBar({ events }: { events: DisasterEvent[] }) {
  const { t } = useLanguage()
  const high = events.filter((e) => e.severity === 'high').length
  const quakes = events.filter((e) => e.magnitude !== null)
  const strongest = quakes.reduce<DisasterEvent | null>(
    (max, e) => (!max || (e.magnitude ?? 0) > (max.magnitude ?? 0) ? e : max),
    null,
  )
  const tsunami = events.filter((e) => e.type === 'tsunami').length

  const stats = [
    { label: t.stats.total, value: events.length.toString(), sub: null },
    { label: t.stats.high, value: high.toString(), sub: null, alert: high > 0 },
    {
      label: t.stats.strongest,
      value: strongest ? `M ${strongest.magnitude?.toFixed(1)}` : '—',
      sub: strongest?.place ?? null,
    },
    { label: t.stats.tsunami, value: tsunami.toString(), sub: null, alert: tsunami > 0 },
  ]

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 bg-card p-4">
          <dt className="text-xs text-muted-foreground">{s.label}</dt>
          <dd
            className={
              s.alert
                ? 'font-mono text-2xl font-semibold text-red-600 dark:text-red-400'
                : 'font-mono text-2xl font-semibold'
            }
          >
            {s.value}
          </dd>
          {s.sub && <dd className="truncate text-xs text-muted-foreground">{s.sub}</dd>}
        </div>
      ))}
    </dl>
  )
}
