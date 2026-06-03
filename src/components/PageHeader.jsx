/**
 * Intestazione delle pagine interne: niente banda scura (era molto "template").
 * Titolo su carta, allineato a sinistra, con etichetta a timbro e filetto mattone.
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="bg-cream pt-28 pb-10 md:pt-32 md:pb-12">
      <div className="container-x">
        {eyebrow && <span className="stamp">{eyebrow}</span>}
        <h1 className="mt-4 font-display text-4xl font-bold text-charcoal sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-charcoal/70">{subtitle}</p>}
        <div className="mt-6 h-1 w-20 rounded bg-terracotta/70" />
      </div>
    </header>
  )
}
