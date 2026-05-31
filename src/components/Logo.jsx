import { useState } from 'react'

/**
 * Mostra il logo PNG se disponibile, altrimenti un fallback testuale
 * con i colori del brand (olive + crimson), identico al logo reale.
 *
 * Props:
 *  - variant: 'dark' | 'light'
 *    'dark'  → usato su navbar con sfondo chiaro (colori originali logo)
 *    'light' → usato su navbar trasparente o footer scuro (tutto bianco)
 *  - className: classi aggiuntive per dimensioni / blend mode
 */
export default function Logo({ variant = 'dark', className = '' }) {
  const [broken, setBroken] = useState(false)

  if (!broken) {
    return (
      <img
        src="/images/general/logo.png"
        alt="L'Altra Osteria Roma"
        className={className}
        onError={() => setBroken(true)}
      />
    )
  }

  /* ── Fallback testuale ────────────────────────────────────────────── */
  const isLight = variant === 'light'

  return (
    <span className="flex flex-col leading-none select-none">
      <span
        className="font-display italic tracking-wide"
        style={{
          fontSize: '1.1em',
          color: isLight ? '#fff' : '#5A5A3C', // olive del logo
        }}
      >
        L'altra
      </span>
      <span
        className="font-display font-semibold tracking-widest uppercase"
        style={{
          fontSize: '1.25em',
          color: isLight ? '#fff' : '#8B1A1A', // crimson del logo
          letterSpacing: '0.05em',
        }}
      >
        Osteria
      </span>
      <span
        className="font-body tracking-[0.3em] uppercase"
        style={{
          fontSize: '0.55em',
          color: isLight ? 'rgba(255,255,255,0.7)' : '#9E8B7A',
          marginTop: '2px',
        }}
      >
        Roma
      </span>
    </span>
  )
}
