export const DISASTER_TYPES = [
  'earthquake',
  'tsunami',
  'flood',
  'wildfire',
  'cyclone',
  'volcano',
  'drought',
] as const

export type DisasterType = (typeof DISASTER_TYPES)[number]
export type Severity = 'low' | 'medium' | 'high'

export interface DisasterEvent {
  id: string
  type: DisasterType
  title: string
  place: string
  lat: number
  lng: number
  time: number
  severity: Severity
  magnitude: number | null
  detail: string
  url: string
  source: 'USGS' | 'GDACS'
}

export const TYPE_COLORS: Record<DisasterType, string> = {
  earthquake: '#f97316',
  tsunami: '#2563eb',
  flood: '#06b6d4',
  wildfire: '#dc2626',
  cyclone: '#8b5cf6',
  volcano: '#db2777',
  drought: '#ca8a04',
}

export const SEVERITY_RANK: Record<Severity, number> = { low: 0, medium: 1, high: 2 }

interface UsgsFeature {
  id: string
  properties: {
    mag: number | null
    place: string | null
    time: number
    url: string
    title: string
    tsunami: number
    alert: string | null
  }
  geometry: { coordinates: [number, number, number] }
}

interface GdacsFeature {
  geometry: { type: string; coordinates: [number, number] }
  properties: {
    eventtype: string
    eventid: number
    episodeid: number
    name: string
    country: string
    fromdate: string
    alertlevel: string
    severitydata?: { severity: number; severitytext: string }
    url?: { report?: string }
  }
}

const GDACS_TYPES: Record<string, DisasterType> = {
  FL: 'flood',
  WF: 'wildfire',
  TC: 'cyclone',
  VO: 'volcano',
  DR: 'drought',
}

function magnitudeSeverity(mag: number, alert: string | null): Severity {
  if (alert === 'red' || alert === 'orange' || mag >= 7) return 'high'
  if (alert === 'yellow' || mag >= 6) return 'medium'
  return 'low'
}

function gdacsSeverity(level: string): Severity {
  const l = level.toLowerCase()
  if (l === 'red') return 'high'
  if (l === 'orange') return 'medium'
  return 'low'
}

async function fetchUsgs(): Promise<DisasterEvent[]> {
  const res = await fetch(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
    { next: { revalidate: 300 } },
  )
  if (!res.ok) throw new Error(`USGS ${res.status}`)
  const data: { features: UsgsFeature[] } = await res.json()
  return data.features.map((f) => {
    const mag = f.properties.mag ?? 0
    const isTsunami = f.properties.tsunami === 1
    return {
      id: `usgs-${f.id}`,
      type: isTsunami ? 'tsunami' : 'earthquake',
      title: f.properties.title,
      place: f.properties.place ?? 'Unknown location',
      lng: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
      time: f.properties.time,
      severity: magnitudeSeverity(mag, f.properties.alert),
      magnitude: mag,
      detail: `M ${mag.toFixed(1)} · ${f.geometry.coordinates[2].toFixed(0)} km`,
      url: f.properties.url,
      source: 'USGS',
    } satisfies DisasterEvent
  })
}

async function fetchGdacs(): Promise<DisasterEvent[]> {
  const res = await fetch(
    'https://www.gdacs.org/gdacsapi/api/events/geteventlist/EVENTS4APP',
    { next: { revalidate: 600 }, headers: { accept: 'application/json' } },
  )
  if (!res.ok) throw new Error(`GDACS ${res.status}`)
  const data: { features: GdacsFeature[] } = await res.json()
  const events: DisasterEvent[] = []
  for (const f of data.features) {
    const type = GDACS_TYPES[f.properties.eventtype]
    if (!type || f.geometry.type !== 'Point') continue
    const p = f.properties
    events.push({
      id: `gdacs-${p.eventtype}-${p.eventid}`,
      type,
      title: p.name,
      place: p.country || p.name,
      lng: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
      time: new Date(`${p.fromdate}Z`).getTime(),
      severity: gdacsSeverity(p.alertlevel),
      magnitude: null,
      detail: p.severitydata?.severitytext?.trim() ?? '',
      url:
        p.url?.report ??
        `https://www.gdacs.org/report.aspx?eventid=${p.eventid}&eventtype=${p.eventtype}`,
      source: 'GDACS',
    })
  }
  return events
}

export async function getDisasterEvents() {
  const [usgs, gdacs] = await Promise.allSettled([fetchUsgs(), fetchGdacs()])
  const events = [
    ...(usgs.status === 'fulfilled' ? usgs.value : []),
    ...(gdacs.status === 'fulfilled' ? gdacs.value : []),
  ].sort((a, b) => b.time - a.time)

  return {
    events,
    sources: {
      usgs: usgs.status === 'fulfilled',
      gdacs: gdacs.status === 'fulfilled',
    },
    updatedAt: Date.now(),
  }
}

export type DisasterResponse = Awaited<ReturnType<typeof getDisasterEvents>>
