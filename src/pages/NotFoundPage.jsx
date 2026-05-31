import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream">
      <div className="container-x text-center">
        <p className="eyebrow">Errore 404</p>
        <h1 className="text-4xl font-bold text-charcoal sm:text-5xl">Pagina non trovata</h1>
        <p className="mt-4 text-charcoal/70">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
