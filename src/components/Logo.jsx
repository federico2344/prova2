/**
 * Logotype testuale "Locanda Blues":
 *  - "Locanda"  → Bitter slab, rosso mattone (o panna su sfondo scuro)
 *  - "Blues"    → corsivo Kaushan Script, blu (come l'insegna in legno)
 *  - sottotitolo → "Risto-Pub · Live Music"
 *
 * Props:
 *  - size: 'sm' (navbar) | 'lg' (footer)
 *  - variant: 'dark' (su sfondo chiaro) | 'light' (su foto/legno scuro)
 */
const BLUES = { dark: '#2F6E8F', light: '#A7CCE0' }

export default function Logo({ size = 'sm', variant = 'dark', className = '' }) {
  const big = size === 'lg'
  const light = variant === 'light'

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
