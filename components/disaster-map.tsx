'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { useTheme } from 'next-themes'
import { TYPE_COLORS, type DisasterEvent } from '@/lib/disasters'
import { useLanguage, useRelativeTime } from './language-provider'

interface DisasterMapProps {
  events: DisasterEvent[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function radiusFor(event: DisasterEvent) {
  if (event.magnitude !== null) return Math.max(4, (event.magnitude - 3.5) * 4)
  return event.severity === 'high' ? 12 : event.severity === 'medium' ? 9 : 6
}

function FlyToSelected({ event }: { event: DisasterEvent | undefined }) {
  const map = useMap()
  useEffect(() => {
    if (event) map.flyTo([event.lat, event.lng], Math.max(map.getZoom(), 5), { duration: 1.2 })
  }, [event, map])
  return null
}

export default function DisasterMap({ events, selectedId, onSelect }: DisasterMapProps) {
  const { resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const relative = useRelativeTime()
  const isDark = resolvedTheme === 'dark'
  const selected = events.find((e) => e.id === selectedId)

  const sorted = [...events].sort((a, b) => radiusFor(b) - radiusFor(a))

  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      minZoom={2}
      worldCopyJump
      scrollWheelZoom
      className="size-full"
    >
      <TileLayer
        key={isDark ? 'dark' : 'light'}
        attribution="Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors"
        maxZoom={16}
        url={`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${isDark ? 'Dark' : 'Light'}_Gray_Base/MapServer/tile/{z}/{y}/{x}`}
      />
      {sorted.map((event) => {
        const color = TYPE_COLORS[event.type]
        const isSelected = event.id === selectedId
        return (
          <CircleMarker
            key={event.id}
            center={[event.lat, event.lng]}
            radius={radiusFor(event) + (isSelected ? 4 : 0)}
            pathOptions={{
              color: isSelected ? (isDark ? '#fff' : '#111') : color,
              weight: isSelected ? 3 : 1.5,
              fillColor: color,
              fillOpacity: event.severity === 'high' ? 0.75 : 0.5,
            }}
            eventHandlers={{ click: () => onSelect(event.id) }}
          >
            <Popup>
              <div className="flex min-w-48 flex-col gap-1">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color }}
                >
                  {t.types[event.type]} · {t.severity[event.severity]}
                </span>
                <strong className="text-sm leading-snug">{event.place}</strong>
                {event.detail && <span className="text-xs opacity-80">{event.detail}</span>}
                <span className="text-xs opacity-70">
                  {relative(event.time)} · {event.source}
                </span>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 text-xs font-medium underline"
                >
                  {t.feed.details}
                </a>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
      <FlyToSelected event={selected} />
    </MapContainer>
  )
}
