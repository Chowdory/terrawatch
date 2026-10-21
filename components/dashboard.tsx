'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { AlertTriangle, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DISASTER_TYPES,
  SEVERITY_RANK,
  TYPE_COLORS,
  type DisasterResponse,
  type DisasterType,
  type Severity,
} from '@/lib/disasters'
import { useLanguage } from './language-provider'
import { EventFeed } from './event-feed'
import { StatsBar } from './stats-bar'

const DisasterMap = dynamic(() => import('./disaster-map'), {
  ssr: false,
  loading: () => <MapPlaceholder />,
})

function MapPlaceholder() {
  const { t } = useLanguage()
  return (
    <div className="flex size-full items-center justify-center bg-muted text-sm text-muted-foreground">
      {t.map.loading}
    </div>
  )
}

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error('Failed to load')
    return r.json() as Promise<DisasterResponse>
  })

export function Dashboard({ initialData }: { initialData: DisasterResponse }) {
  const { t, locale } = useLanguage()
  const { data, error } = useSWR('/api/events', fetcher, {
    fallbackData: initialData,
    refreshInterval: 5 * 60 * 1000,
    revalidateOnMount: false,
  })

  const [activeTypes, setActiveTypes] = useState<Set<DisasterType>>(new Set())
  const [minSeverity, setMinSeverity] = useState<Severity>('low')
  const [sort, setSort] = useState<'newest' | 'severity'>('newest')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const events = data?.events ?? []

  const counts = useMemo(() => {
    const c = {} as Record<DisasterType, number>
    for (const type of DISASTER_TYPES) c[type] = 0
    for (const e of events) c[e.type]++
    return c
  }, [events])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = events.filter(
      (e) =>
        (activeTypes.size === 0 || activeTypes.has(e.type)) &&
        SEVERITY_RANK[e.severity] >= SEVERITY_RANK[minSeverity] &&
        (!q || e.place.toLowerCase().includes(q) || e.title.toLowerCase().includes(q)),
    )
    if (sort === 'severity') {
      list.sort(
        (a, b) =>
          SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity] ||
          (b.magnitude ?? 0) - (a.magnitude ?? 0) ||
          b.time - a.time,
      )
    }
    return list
  }, [events, activeTypes, minSeverity, sort, query])

  const toggleType = (type: DisasterType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  const presentTypes = DISASTER_TYPES.filter((type) => counts[type] > 0)
  const downSources = data
    ? (['usgs', 'gdacs'] as const).filter((s) => !data.sources[s]).map((s) => s.toUpperCase())
    : []

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-10">
      <section className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {t.hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {t.hero.title}
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">{t.hero.subtitle}</p>
      </section>

      <StatsBar events={events} />

      {(error || downSources.length > 0) && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm"
        >
          <AlertTriangle className="size-4 text-amber-600" aria-hidden="true" />
          {error ? t.status.error : downSources.map((s) => t.status.sourceDown(s)).join(' · ')}
        </div>
      )}

      <section aria-label={t.feed.title} className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            active={activeTypes.size === 0}
            onClick={() => setActiveTypes(new Set())}
            label={t.feed.allTypes}
            count={events.length}
          />
          {presentTypes.map((type) => (
            <FilterChip
              key={type}
              active={activeTypes.has(type)}
              onClick={() => toggleType(type)}
              label={t.types[type]}
              count={counts[type]}
              color={TYPE_COLORS[type]}
            />
          ))}
        </div>

        <div className="grid overflow-hidden rounded-xl border bg-card lg:grid-cols-[1fr_380px]">
          <div className="relative h-[55vh] min-h-80 lg:h-[640px]">
            <DisasterMap events={filtered} selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          <div className="flex flex-col border-t lg:h-[640px] lg:border-t-0 lg:border-l">
            <div className="flex flex-col gap-2 border-b p-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">{t.feed.title}</h2>
                {data && (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {t.status.updated}{' '}
                    {new Date(data.updatedAt).toLocaleTimeString(locale === 'de' ? 'de-DE' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
              <label className="relative">
                <span className="sr-only">{t.feed.search}</span>
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.feed.search}
                  className="h-9 w-full rounded-md border bg-background pr-3 pl-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </label>
              <div className="flex gap-2">
                <label className="flex flex-1 flex-col gap-1 text-[11px] text-muted-foreground">
                  {t.feed.minSeverity}
                  <select
                    value={minSeverity}
                    onChange={(e) => setMinSeverity(e.target.value as Severity)}
                    className="h-8 rounded-md border bg-background px-2 text-sm text-foreground"
                  >
                    {(['low', 'medium', 'high'] as const).map((s) => (
                      <option key={s} value={s}>
                        {t.severity[s]}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex flex-1 flex-col gap-1 text-[11px] text-muted-foreground">
                  <span id="sort-label">{t.feed.sort}</span>
                  <div role="group" aria-labelledby="sort-label" className="flex h-8 rounded-md border p-0.5">
                    {(['newest', 'severity'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={sort === s}
                        onClick={() => setSort(s)}
                        className={cn(
                          'flex-1 rounded text-xs font-medium',
                          sort === s ? 'bg-secondary text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {s === 'newest' ? t.feed.sortNewest : t.feed.sortSeverity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto max-lg:max-h-[70vh]">
              <EventFeed
                key={`${[...activeTypes].join()}-${minSeverity}-${sort}-${query}`}
                events={filtered}
                total={events.length}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  count,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  color?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
        active ? 'border-foreground bg-foreground text-background' : 'hover:bg-muted',
      )}
    >
      {color && <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />}
      {label}
      <span className={cn('font-mono text-xs', active ? 'opacity-70' : 'text-muted-foreground')}>{count}</span>
    </button>
  )
}
