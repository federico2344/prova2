import { restaurant } from '../data/siteData.js'
import PageHeader from '../components/PageHeader.jsx'

export default function PrivacyPage() {
  const legal = restaurant.legal || {}
  const titolare = legal.companyName || restaurant.name
  const contactEmail = legal.pec || restaurant.email

  return (
    <>
      <PageHeader
        eyebrow="Informativa"
        title="Privacy Policy"
        subtitle="Informazioni sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
      />
      <section className="container-x py-12 max-w-3xl prose prose-charcoal">
        <h2>Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento dei dati è <strong>{titolare}</strong>
          {legal.legalAddress && <>, con sede in {legal.legalAddress}</>}
          {legal.vatNumber && <> (P.IVA {legal.vatNumber})</>}.
          <br />
          Per qualsiasi richiesta è possibile scrivere a:{' '}
          <a href={`mailto:${contactEmail}`} className="text-crimson hover:underline">{contactEmail}</a>.
        </p>

        <h2>Dati raccolti e finalità</h2>
        <p>
          Questo sito è un sito vetrina informativo del ristorante {restaurant.name}.
          Non sono presenti form di contatto, registrazione utenti, sistemi di pagamento o profilazione pubblicitaria.
        </p>
        <p>I dati eventualmente trattati sono:</p>
        <ul>
          <li>
            <strong>Dati di navigazione (log del server)</strong>: indirizzo IP, browser, sistema operativo, data
            e ora della visita. Raccolti automaticamente dall'infrastruttura di hosting (Netlify) per finalità
            di sicurezza, diagnostica tecnica e prevenzione di abusi. Conservati per un massimo di 30 giorni.
          </li>
          <li>
            <strong>Comunicazioni dirette</strong>: se l'utente sceglie di contattare il ristorante via telefono,
            WhatsApp o email tramite i link presenti sul sito, i dati forniti vengono trattati esclusivamente
            per rispondere alla richiesta e gestire l'eventuale prenotazione.
          </li>
        </ul>

        <h2>Base giuridica</h2>
        <p>
          Il trattamento dei log di navigazione si fonda sul legittimo interesse del titolare alla sicurezza
          e al corretto funzionamento del sito (art. 6.1.f GDPR). Le comunicazioni dirette si basano sul consenso
          dell'interessato manifestato con l'invio della richiesta (art. 6.1.a GDPR).
        </p>

        <h2>Destinatari dei dati</h2>
        <p>
          I dati non sono comunicati a terzi né diffusi. Vengono trattati esclusivamente dal personale del ristorante
          autorizzato e dai fornitori tecnici (hosting Netlify) in qualità di responsabili del trattamento.
        </p>

        <h2>Trasferimenti extra UE</h2>
        <p>
          Il provider di hosting (Netlify, Inc.) ha sede negli Stati Uniti e aderisce al Data Privacy Framework
          UE-USA, che garantisce un adeguato livello di protezione dei dati.
        </p>

        <h2>Diritti dell'interessato</h2>
        <p>
          In qualsiasi momento l'utente può esercitare i diritti previsti dagli articoli 15-22 del GDPR:
          accesso, rettifica, cancellazione, limitazione, opposizione, portabilità. È inoltre possibile proporre
          reclamo al Garante per la Protezione dei Dati Personali (www.garanteprivacy.it).
        </p>
        <p>
          Per esercitare tali diritti scrivere a:{' '}
          <a href={`mailto:${contactEmail}`} className="text-crimson hover:underline">{contactEmail}</a>.
        </p>

        <h2>Cookie</h2>
        <p>
          Per informazioni sui cookie utilizzati dal sito si rimanda alla{' '}
          <a href="/cookie" className="text-crimson hover:underline">Cookie Policy</a>.
        </p>

        <p className="text-sm text-charcoal/60 mt-8">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long' })}
        </p>
      </section>
    </>
  )
}
