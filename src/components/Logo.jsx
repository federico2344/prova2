import { useState } from 'react'

/**
 * Logo del locale. Usa l'immagine scontornata (PNG con sfondo trasparente) in
 * /images/general/logo-nav.png. Se il file manca, mostra un fallback testuale
 * così l'header non resta mai vuoto.
 *
 * Props:
 *  - size: 'sm' (navbar) | 'lg' (footer)
 *  - variant: 'dark' (su sfondo chiaro) | 'light' (su legno/foto scuri) — usato dal fallback
 */
const BLUES = { dark: '#2F6E8F', light: '#A7CCE0' }

export default function Logo({ size = 'sm', variant = 'dark', className = '' }) {
  const [broken, setBroken] = useState(false)
  const big = size === 'lg'
  const light = variant === 'light'

  if (!broken) {
    return (
      <img
        src="/images/general/logo-nav.png"
        alt="Locanda Blues — Risto-Pub · Live Music"
        onError={() => setBroken(true)}
        className={`${big ? 'h-24' : 'h-20 md:h-24'} w-auto ${className}`}
      />
    )
  }

  /* ── Fallback testuale ──────────────────────────────────────────────── */
  return (
    <span className={`flex flex-col leading-none select-none ${className}`}>
      <span className="flex items-end gap-1.5">
        <span
          className={`font-display font-bold uppercase tracking-[0.02em] ${
            light ? 'text-cream' : 'text-terracotta'
          } ${big ? 'text-3xl' : 'text-xl md:text-2xl'}`}
        >
          Locanda
        </span>
        <span
          className={`${big ? 'text-4xl -mb-1' : 'text-2xl md:text-3xl -mb-0.5'}`}
          style={{ fontFamily: '"Kaushan Script", cursive', color: light ? BLUES.light : BLUES.dark }}
        >
          Blues
        </span>
      </span>
      <span
        className={`mt-1 font-body uppercase ${
          light ? 'text-cream/65' : 'text-charcoal/55'
        } ${big ? 'text-[0.62rem] tracking-[0.34em]' : 'text-[0.5rem] tracking-[0.28em] md:text-[0.58rem]'}`}
      >
        Risto-Pub · Live Music
      </span>
    </span>
  )
}
