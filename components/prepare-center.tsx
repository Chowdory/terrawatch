'use client'

import { useEffect, useState } from 'react'
import { Check, Phone, Plus, Printer, RotateCcw, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KIT_ITEMS } from '@/lib/learn-content'
import { useLanguage } from './language-provider'

const STORAGE_KEY = 'terrawatch-prepare'

interface Plan {
  meetingPoint: string
  meetingPointOut: string
  outOfArea: string
  medical: string
  pets: string
  notes: string
}

interface PrepareState {
  kit: string[]
  members: string[]
  plan: Plan
}

const EMPTY: PrepareState = {
  kit: [],
  members: [],
  plan: { meetingPoint: '', meetingPointOut: '', outOfArea: '', medical: '', pets: '', notes: '' },
}

export function PrepareCenter() {
  const { t, locale } = useLanguage()
  const [state, setState] = useState<PrepareState>(EMPTY)
  const [loaded, setLoaded] = useState(false)
  const [memberDraft, setMemberDraft] = useState('')

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) })
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, loaded])

  const toggleKit = (id: string) =>
    setState((s) => ({
      ...s,
      kit: s.kit.includes(id) ? s.kit.filter((k) => k !== id) : [...s.kit, id],
    }))

  const updatePlan = (key: keyof Plan, value: string) =>
    setState((s) => ({ ...s, plan: { ...s.plan, [key]: value } }))

  const addMember = () => {
    const value = memberDraft.trim()
    if (!value) return
    setState((s) => ({ ...s, members: [...s.members, value] }))
    setMemberDraft('')
  }

  const done = state.kit.length
  const total = KIT_ITEMS.length
  const pct = Math.round((done / total) * 100)

  const planFields: { key: keyof Plan; label: string; multiline?: boolean }[] = [
    { key: 'meetingPoint', label: t.prepare.meetingPoint },
    { key: 'meetingPointOut', label: t.prepare.meetingPointOut },
    { key: 'outOfArea', label: t.prepare.outOfArea },
    { key: 'medical', label: t.prepare.medical, multiline: true },
    { key: 'pets', label: t.prepare.pets },
    { key: 'notes', label: t.prepare.notes, multiline: true },
  ]

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:px-6">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">{t.prepare.eyebrow}</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">{t.prepare.title}</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">{t.prepare.subtitle}</p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
        <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold">{t.prepare.emergencyNumbers}</p>
          <p className="font-mono text-sm text-muted-foreground">{t.prepare.numbersHint}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="kit-title" className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <h2 id="kit-title" className="text-lg font-semibold">
                {t.prepare.kitTitle}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">{t.prepare.kitProgress(done, total)}</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t.prepare.kitTitle}
            >
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <ul className="flex flex-col gap-1">
            {KIT_ITEMS.map((item) => {
              const checked = state.kit.includes(item.id)
              return (
                <li key={item.id}>
                  <label
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted',
                      checked && 'text-muted-foreground line-through',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleKit(item.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-ring',
                        checked && 'border-primary bg-primary text-primary-foreground',
                      )}
                      aria-hidden="true"
                    >
                      {checked && <Check className="size-3.5" />}
                    </span>
                    {item[locale]}
                  </label>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="plan-title" className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="plan-title" className="text-lg font-semibold">
                {t.prepare.planTitle}
              </h2>
              <p className="text-sm text-muted-foreground">{t.prepare.planHint}</p>
            </div>
            <div className="no-print flex gap-2">
              <button
                type="button"
                onClick={() => setState(EMPTY)}
                className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                {t.prepare.reset}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Printer className="size-3.5" aria-hidden="true" />
                {t.prepare.print}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium" id="members-label">
              {t.prepare.members}
            </span>
            {state.members.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-labelledby="members-label">
                {state.members.map((m, i) => (
                  <li
                    key={`${m}-${i}`}
                    className="flex items-center gap-1 rounded-full bg-secondary py-1 pr-1 pl-3 text-sm"
                  >
                    {m}
                    <button
                      type="button"
                      onClick={() => setState((s) => ({ ...s, members: s.members.filter((_, j) => j !== i) }))}
                      className="no-print rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                      aria-label={`${t.prepare.remove} ${m}`}
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="no-print flex gap-2">
              <input
                value={memberDraft}
                onChange={(e) => setMemberDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter' || e.nativeEvent.isComposing || e.keyCode === 229) return
                  e.preventDefault()
                  addMember()
                }}
                placeholder={t.prepare.memberPlaceholder}
                aria-labelledby="members-label"
                className="h-9 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-1 rounded-md border px-3 text-sm hover:bg-muted"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                {t.prepare.addMember}
              </button>
            </div>
          </div>

          {planFields.map((field) => (
            <label key={field.key} className="flex flex-col gap-1.5 text-sm font-medium">
              {field.label}
              {field.multiline ? (
                <textarea
                  rows={2}
                  value={state.plan[field.key]}
                  onChange={(e) => updatePlan(field.key, e.target.value)}
                  className="rounded-md border bg-background px-3 py-2 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              ) : (
                <input
                  value={state.plan[field.key]}
                  onChange={(e) => updatePlan(field.key, e.target.value)}
                  className="h-9 rounded-md border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              )}
            </label>
          ))}
        </section>
      </div>
    </main>
  )
}
