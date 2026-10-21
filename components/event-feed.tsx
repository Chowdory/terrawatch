'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TYPE_COLORS, type DisasterEvent } from '@/lib/disasters'
import { useLanguage, useRelativeTime } from './language-provider'
import { HazardIcon } from './hazard-icon'

const PAGE_SIZE = 40

const SEVERITY_STYLES = {
  low: 'bg-secondary text-secondary-foreground',
  medium: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  high: 'bg-red-500/15 text-red-700 dark:text-red-300',
} as const

interface EventFeedProps {
  events: DisasterEvent[]
  total: number
  selectedId: string | null
  onSelect: (id: string) => void
}

export function EventFeed({ events, total, selectedId, onSelect }: EventFeedProps) {
  const { t } = useLanguage()
  const relative = useRelativeTime()
  const [limit, setLimit] = useState(PAGE_SIZE)
  const visible = events.slice(0, limit)

  if (events.length === 0) {
    return <p className="p-6 text-center text-sm text-muted-foreground">{t.feed.empty}</p>
  }

  return (
    <div className="flex flex-col">
      <p className="px-4 pb-2 text-xs text-muted-foreground" aria-live="polite">
        {t.feed.showing(Math.min(limit, events.length), total)}
      </p>
      <ul className="flex flex-col divide-y">
        {visible.map((event) => {
          const selected = event.id === selectedId
          return (
            <li key={event.id}>
              <div
                className={cn(
                  'group flex items-start gap-3 px-4 py-3 transition-colors',
                  selected ? 'bg-accent' : 'hover:bg-muted/60',
                )}
              >
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${TYPE_COLORS[event.type]}22`, color: TYPE_COLORS[event.type] }}
                >
                  <HazardIcon type={event.type} className="size-4" />
                </span>
                <button
                  type="button"
                  onClick={() => onSelect(event.id)}
                  aria-pressed={selected}
                  className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
                >
                  <span className="flex w-full items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {t.types[event.type]}
                    </span>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        SEVERITY_STYLES[event.severity],
                      )}
                    >
                      {t.severity[event.severity]}
                    </span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
                      {relative(event.time)}
                    </span>
                  </span>
                  <span className="line-clamp-2 text-sm font-medium leading-snug">{event.place}</span>
                  {event.detail && (
                    <span className="line-clamp-1 font-mono text-xs text-muted-foreground">
                      {event.detail}
                    </span>
                  )}
                </button>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 rounded p-1 text-muted-foreground hover:text-foreground"
                  aria-label={`${t.feed.details}: ${event.place} (${event.source})`}
                >
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </li>
          )
        })}
      </ul>
      {limit < events.length && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + PAGE_SIZE)}
          className="m-4 rounded-md border py-2 text-sm font-medium hover:bg-muted"
        >
          {t.feed.loadMore}
        </button>
      )}
    </div>
  )
}
