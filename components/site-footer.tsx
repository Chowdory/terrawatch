'use client'

import { useLanguage } from './language-provider'

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="no-print border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground md:px-6">
        <p>{t.footer.data}</p>
        <p>{t.footer.disclaimer}</p>
      </div>
    </footer>
  )
}
