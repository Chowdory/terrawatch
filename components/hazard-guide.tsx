'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, Radio } from 'lucide-react'
import { LEARN_CONTENT, type Hazard } from '@/lib/learn-content'
import { useLanguage } from './language-provider'
import { HazardIcon } from './hazard-icon'
import { HAZARD_COLORS } from './learn-index'

export function HazardGuide({ hazard }: { hazard: Hazard }) {
  const { t, locale } = useLanguage()
  const guide = LEARN_CONTENT[hazard][locale]
  const color = HAZARD_COLORS[hazard]

  const phases = [
    { title: t.learn.before, items: guide.before, step: '01' },
    { title: t.learn.during, items: guide.during, step: '02' },
    { title: t.learn.after, items: guide.after, step: '03' },
  ]

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10 md:px-6">
      <Link
        href="/learn"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t.learn.back}
      </Link>

      <header className="flex flex-col gap-4">
        <span
          className="flex size-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}22`, color }}
        >
          <HazardIcon type={hazard} className="size-6" />
        </span>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">{t.types[hazard]}</h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">{guide.summary}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-xl border bg-card p-5">
          <h2 className="font-semibold">{t.learn.howItForms}</h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">{guide.howItForms}</p>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="size-4 text-amber-600" aria-hidden="true" />
            {t.learn.warningSigns}
          </h2>
          <ul className="flex flex-col gap-2 text-sm">
            {guide.warningSigns.map((sign) => (
              <li key={sign} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {phases.map((phase) => (
          <div key={phase.step} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{phase.title}</h2>
              <span className="font-mono text-xs text-muted-foreground">{phase.step}</span>
            </div>
            <ol className="flex flex-col gap-2.5 text-sm">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2 leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      {hazard !== 'landslide' && (
        <Link
          href="/"
          className="flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Radio className="size-4" aria-hidden="true" />
          {t.learn.seeLive}
        </Link>
      )}
    </main>
  )
}
