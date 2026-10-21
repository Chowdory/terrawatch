'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { dictionaries, type Dictionary, type Locale } from '@/lib/dictionary'

const STORAGE_KEY = 'terrawatch-locale'

interface LanguageContextValue {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'de') {
      setLocaleState(stored)
    } else if (navigator.language.toLowerCase().startsWith('de')) {
      setLocaleState('de')
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useRelativeTime() {
  const { t } = useLanguage()
  return (time: number) => {
    const diff = Math.max(0, Date.now() - time)
    const minutes = Math.floor(diff / 60_000)
    if (minutes < 1) return t.time.justNow
    if (minutes < 60) return t.time.minutes(minutes)
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return t.time.hours(hours)
    return t.time.days(Math.floor(hours / 24))
  }
}
