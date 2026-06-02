/**
 * Header introduttivo per le pagine interne: banner scuro con eyebrow + titolo
 * + sottotitolo, sotto la navbar fissa. Dà coerenza visiva a tutto il sito.
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="relative overflow-hidden bg-ink pt-28 pb-16 text-charcoal md:pt-36 md:pb-20">
      {/* Texture decorativa leggera — aloni ambra/blu (l'anima di Locanda Blues) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, #D98A1C 0, transparent 42%), radial-gradient(circle at 82% 70%, #3DA8DC 0, transparent 46%)',
        }}
      />
      <div className="container-x relative text-center">
        {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
        <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal/70">{subtitle}</p>
        )}
      </div>
    </header>
  )
}
