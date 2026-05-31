import { restaurant } from '../data/siteData.js'
import PageHeader from '../components/PageHeader.jsx'

export default function CookiePage() {
  const legal = restaurant.legal || {}
  const contactEmail = legal.pec || restaurant.email

  return (
    <>
      <PageHeader
        eyebrow="Informativa"
        title="Cookie Policy"
        subtitle="Informazioni sull'uso dei cookie ai sensi del Provvedimento del Garante Privacy del 10 giugno 2021."
      />
      <section className="container-x py-12 max-w-3xl prose prose-charcoal">
        <h2>Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti visitati salvano sul dispositivo dell'utente per
          ricordare informazioni o tracciare l'attività di navigazione. Possono essere "tecnici" (necessari al
          funzionamento) o "di profilazione" (utilizzati a fini pubblicitari e di analisi statistica).
        </p>

        <h2>Cookie utilizzati da questo sito</h2>
        <p>
          <strong>Il sito {restaurant.name} non utilizza cookie di profilazione né cookie analytics di terze parti.</strong>
        </p>
        <p>
          Tutti i contenuti del sito (font, immagini, codice) sono serviti direttamente dal nostro dominio:
          non ci sono richieste a servizi esterni come Google Fonts, Google Analytics, Facebook Pixel o
          piattaforme pubblicitarie.
        </p>
        <p>L'unico cookie eventualmente presente è:</p>
        <ul>
          <li>
            <strong>Sessione di autenticazione del pannello di amministrazione</strong> (Netlify Identity):
            attivo esclusivamente sull'area riservata <code>/admin</code> e riguarda unicamente il personale
            del ristorante che accede per gestire i contenuti. Non riguarda i visitatori del sito.
          </li>
        </ul>

        <h2>Perché non è presente un banner cookie</h2>
        <p>
          Ai sensi della normativa vigente, il banner di consenso è richiesto unicamente per cookie di
          profilazione e tracciamento di terze parti. Poiché questo sito non ne utilizza, il banner non è
          necessario.
        </p>

        <h2>Come disabilitare i cookie</h2>
        <p>
          L'utente può comunque configurare il proprio browser per bloccare tutti i cookie o ricevere un
          avviso prima della loro memorizzazione. Le istruzioni sono disponibili nelle impostazioni del
          browser utilizzato (Chrome, Firefox, Safari, Edge).
        </p>

        <h2>Contatti</h2>
        <p>
          Per qualsiasi dubbio è possibile scrivere a:{' '}
          <a href={`mailto:${contactEmail}`} className="text-crimson hover:underline">{contactEmail}</a>.
        </p>

        <p className="text-sm text-charcoal/60 mt-8">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long' })}
        </p>
      </section>
    </>
  )
}
