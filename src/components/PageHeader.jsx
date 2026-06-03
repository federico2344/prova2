/**
 * Header introduttivo per le pagine interne: banda di legno scuro con eyebrow +
 * titolo + sottotitolo, sotto la navbar fissa. Dà coerenza a tutto il sito.
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="wood relative overflow-hidden pt-32 pb-16 text-cream md:pt-40 md:pb-20">
      {/* Aloni caldi (ottone/mattone) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, #B17A2C 0, transparent 42%), radial-gradient(circle at 82% 75%, #8C2E22 0, transparent 46%)',
        }}
      />
      <div className="container-x relative text-center">
        {eyebrow && <p className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/75">{subtitle}</p>
        )}
      </div>
    </header>
  )
}
