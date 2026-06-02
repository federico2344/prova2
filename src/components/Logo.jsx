/**
 * Logotype testuale "Locanda Blues" — niente dipendenza da immagini, sempre nitido.
 *  - "Locanda"  → Oswald condensato, ambra (brand)
 *  - "Blues"    → corsivo Kaushan Script, blu elettrico (accento)
 *  - sottotitolo → "Risto-Pub · Live Music"
 *
 * Props:
 *  - size: 'sm' (navbar) | 'lg' (footer)
 *  - variant: mantenuto per compatibilità (il tema è sempre scuro)
 *  - className: classi extra (margini ecc.)
 */
export default function Logo({ size = 'sm', className = '' }) {
  const big = size === 'lg'

  return (
    <span className={`flex flex-col leading-none select-none ${className}`}>
      <span className="flex items-end gap-1.5">
        <span
          className={`font-display font-bold uppercase tracking-[0.06em] text-terracotta ${
            big ? 'text-4xl' : 'text-2xl md:text-[1.7rem]'
          }`}
        >
          Locanda
        </span>
        <span
          className={`text-gold ${big ? 'text-4xl -mb-1' : 'text-2xl md:text-3xl -mb-0.5'}`}
          style={{ fontFamily: '"Kaushan Script", cursive' }}
        >
          Blues
        </span>
      </span>
      <span
        className={`mt-1 font-body uppercase text-charcoal/55 ${
          big ? 'text-[0.62rem] tracking-[0.34em]' : 'text-[0.5rem] tracking-[0.28em] md:text-[0.58rem]'
        }`}
      >
        Risto-Pub · Live Music
      </span>
    </span>
  )
}
