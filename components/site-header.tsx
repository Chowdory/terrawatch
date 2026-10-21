'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useLanguage } from './language-provider'

export function SiteHeader() {
  const { t, locale, setLocale } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()

  const links = [
    { href: '/', label: t.nav.live },
    { href: '/learn', label: t.nav.learn },
    { href: '/prepare', label: t.nav.prepare },
  ]

  return (
    <header className="no-print sticky top-0 z-[1100] border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Globe2 className="size-4" aria-hidden="true" />
          </span>
          <span>TerraWatch</span>
        </Link>

        <nav aria-label="Main" className="ml-2 hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  active
                    ? 'bg-secondary font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div
            role="group"
            aria-label={t.header.language}
            className="flex rounded-md border p-0.5 text-xs font-medium"
          >
            {(['en', 'de'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={locale === l}
                className={cn(
                  'rounded px-2 py-1 uppercase transition-colors',
                  locale === l
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t.header.theme}
          >
            <Sun className="size-4 dark:hidden" aria-hidden="true" />
            <Moon className="hidden size-4 dark:block" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav aria-label="Main mobile" className="flex border-t sm:hidden">
        {links.map((link) => {
          const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex-1 py-2 text-center text-sm',
                active ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground',
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
