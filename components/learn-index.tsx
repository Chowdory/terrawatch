'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HAZARDS, LEARN_CONTENT, type Hazard } from '@/lib/learn-content'
import { TYPE_COLORS } from '@/lib/disasters'
import { useLanguage } from './language-provider'
import { HazardIcon } from './hazard-icon'

export const HAZARD_COLORS: Record<Hazard, string> = { ...TYPE_COLORS, landslide: '#78716c' }

export function LearnIndex() {
  const { t, locale } = useLanguage()
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:px-6">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">{t.learn.eyebrow}</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">{t.learn.title}</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">{t.learn.subtitle}</p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HAZARDS.map((hazard) => {
          const color = HAZARD_COLORS[hazard]
          return (
            <li key={hazard}>
              <Link
                href={`/learn/${hazard}`}
                className="group flex h-full flex-col gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-foreground/30"
              >
                <span
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  <HazardIcon type={hazard} className="size-5" />
                </span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <h2 className="font-semibold">{t.types[hazard]}</h2>
                  <p className="text-pretty text-sm text-muted-foreground">
                    {LEARN_CONTENT[hazard][locale].summary}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium">
                  {t.learn.read}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
