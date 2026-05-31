/**
 * Header introduttivo per le pagine interne: banner scuro con eyebrow + titolo
 * + sottotitolo, sotto la navbar fissa. Dà coerenza visiva a tutto il sito.
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="relative overflow-hidden bg-charcoal pt-28 pb-16 text-cream md:pt-36 md:pb-20">
      {/* Texture decorativa leggera */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #B8872A 0, transparent 40%), radial-gradient(circle at 80% 60%, #8B1A1A 0, transparent 45%)',
        }}
      />
      <div className="container-x relative text-center">
        {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/70">{subtitle}</p>
        )}
      </div>
    </header>
  )
}
