import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

export default function AdminGuidePage() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex, nofollow'
    document.head.appendChild(m)
    return () => { document.head.removeChild(m) }
  }, [])

  useEffect(() => {
    const identity = window.netlifyIdentity
    if (!identity) {
      window.location.replace('/admin/')
      return
    }
    const handle = (user) => {
      if (user) setStatus('ok')
      else window.location.replace('/admin/')
    }
    if (identity.currentUser) {
      const existing = identity.currentUser()
      if (existing) { setStatus('ok'); return }
    }
    identity.on('init', handle)
    identity.on('login', () => setStatus('ok'))
    identity.on('logout', () => window.location.replace('/admin/'))
    const timeout = setTimeout(() => {
      const u = identity.currentUser && identity.currentUser()
      handle(u)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  if (status !== 'ok') {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-cream">
        <p className="text-charcoal/60">Verifica accesso…</p>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Manuale del pannello"
        title="Guida al pannello di gestione"
        subtitle="Manuale completo, spiegato passo passo. Nessuna conoscenza tecnica richiesta."
      />
      <section className="container-x py-12 max-w-3xl mx-auto">
        <nav className="mb-12 rounded-xl border border-blush bg-cream/60 p-6 text-sm">
          <p className="font-semibold uppercase tracking-widest text-xs text-charcoal/60 mb-4">Indice</p>
          <ul className="space-y-2">
            <li><a href="#cose" className="text-terracotta hover:underline">1. Cos'è il pannello di gestione</a></li>
            <li><a href="#prima-volta" className="text-terracotta hover:underline">2. Entrare la prima volta</a></li>
            <li><a href="#home" className="text-terracotta hover:underline">3. La schermata iniziale (home)</a></li>
            <li><a href="#editor" className="text-terracotta hover:underline">4. La schermata di modifica</a></li>
            <li><a href="#info" className="text-terracotta hover:underline">5. Modificare le informazioni del ristorante</a></li>
            <li><a href="#menu" className="text-terracotta hover:underline">6. Gestire il menù</a></li>
            <li><a href="#vini" className="text-terracotta hover:underline">7. Gestire la birreria &amp; i drink</a></li>
            <li><a href="#team" className="text-terracotta hover:underline">8. Gestire le anime del locale</a></li>
            <li><a href="#tema" className="text-terracotta hover:underline">9. Personalizzare colori e font del sito (Tema)</a></li>
            <li><a href="#foto" className="text-terracotta hover:underline">10. Caricare e gestire le foto</a></li>
            <li><a href="#pubblica" className="text-terracotta hover:underline">11. Salvare e pubblicare le modifiche</a></li>
            <li><a href="#navigare" className="text-terracotta hover:underline">12. Navigare tra le sezioni</a></li>
            <li><a href="#trovare" className="text-terracotta hover:underline">13. Trovare velocemente un piatto o vino</a></li>
            <li><a href="#errori" className="text-terracotta hover:underline">14. Errori comuni e come risolverli</a></li>
            <li><a href="#sicurezza" className="text-terracotta hover:underline">15. Sicurezza e buone abitudini</a></li>
            <li><a href="#eventi-cms" className="text-terracotta hover:underline">16. Gestire Eventi &amp; Live</a></li>
            <li><a href="#spazi-cms" className="text-terracotta hover:underline">17. Gestire Intrattenimenti &amp; Spazi</a></li>
            <li><a href="#testi-cms" className="text-terracotta hover:underline">18. Modificare i Testi della Home</a></li>
          </ul>
        </nav>

        <article className="prose max-w-none">

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="cose">1. Cos'è il pannello di gestione</h2>
          <p>
            Il pannello di gestione (chiamato anche "pannello admin" o "back-office") è una
            <strong> pagina web protetta da password</strong> dove tu, gestore del ristorante,
            puoi modificare i contenuti del sito senza chiamare nessun tecnico.
            Tutto quello che cambi qui appare automaticamente sul sito vero — quello che vedono
            i tuoi clienti — entro un paio di minuti.
          </p>
          <p><strong>Dal pannello puoi:</strong></p>
          <ul>
            <li>Cambiare nome del ristorante, descrizione, telefono, email, indirizzo</li>
            <li>Modificare orari di apertura</li>
            <li>Aggiungere, modificare o eliminare piatti del menù</li>
            <li>Aggiornare la birreria e i drink con nuove voci e prezzi</li>
            <li>Cambiare la foto in cima alla home e le altre foto del sito</li>
            <li>Aggiornare i link a Instagram e Facebook</li>
            <li><strong>Personalizzare colori e font del sito</strong></li>
            <li>Modificare i dati aziendali (P.IVA, codice fiscale, ecc.) richiesti per legge</li>
          </ul>
          <p>
            <strong>Non serve installare nulla.</strong> Si usa direttamente dal browser
            (il programma con cui navighi internet — Chrome, Safari, Edge o Firefox), sia da
            computer che da telefono e tablet. <strong>Da computer è molto più comodo</strong>
            perché lo schermo è grande e si vede tutto bene.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="prima-volta">2. Entrare la prima volta</h2>
          <p>Segui esattamente questi passi:</p>
          <ol>
            <li>
              <strong>Apri il browser</strong> (il programma con cui apri internet — di solito
              Chrome o Safari). Lo trovi cliccando la sua icona sul desktop del computer o sulla
              schermata principale del telefono.
            </li>
            <li>
              In alto, dove di solito scrivi gli indirizzi dei siti (la "barra degli indirizzi"),
              <strong> cancella tutto</strong> e scrivi l'indirizzo del tuo sito seguito da
              <code>/admin</code>. Esempio:{' '}
              <code>locandablues.it/admin</code>
              {' '}o l'URL temporaneo Netlify se non avete ancora un dominio.
            </li>
            <li>Premi il tasto <strong>Invio</strong> della tastiera.</li>
            <li>
              Vedrai una pagina con il logo del ristorante e un pulsante grande scuro con scritto{' '}
              <strong>"Accedi con Netlify Identity"</strong>. Cliccalo.
            </li>
            <li>
              <strong>Si apre una finestra (modale)</strong> sopra alla pagina. Dentro trovi i
              campi <strong>email</strong> e <strong>password</strong>. Inserisci le credenziali
              che ti sono state fornite, attento a maiuscole/minuscole.
            </li>
            <li>Clicca <strong>"Log in"</strong>. Se le credenziali sono corrette, entri nel pannello.</li>
          </ol>

          <h3>Se hai dimenticato la password</h3>
          <ol>
            <li>Sulla pagina di login clicca <strong>"Accedi con Netlify Identity"</strong> per aprire la modale.</li>
            <li>Dentro alla modale, sotto i campi email/password, clicca su <strong>"Forgot password?"</strong> (Password dimenticata).</li>
            <li>
              Inserisci la tua email e clicca <strong>"Send recovery email"</strong>.
            </li>
            <li>
              Controlla la posta. Entro 1-2 minuti ricevi un'email da Netlify
              (mittente tipo <code>noreply@netlify.com</code>) con un link "Reset your password".
              <strong> Se non la trovi, guarda nella cartella Spam o Posta indesiderata.</strong>
            </li>
            <li>
              Clicca il link nell'email: ti porta sul sito e si apre automaticamente una finestra
              per impostare la nuova password. Scrivila due volte e conferma. Sei subito dentro.
            </li>
          </ol>

          <h3>Consiglio: salva la pagina di accesso</h3>
          <p>
            Per non doverti ricordare l'indirizzo ogni volta:
          </p>
          <ul>
            <li>
              <strong>Da computer (Chrome/Safari/Edge):</strong> mentre sei sulla pagina di login,
              premi i tasti <code>Ctrl + D</code> (su Mac: <code>Cmd + D</code>) per aggiungere
              ai segnalibri. La prossima volta clicchi il segnalibro e sei subito lì.
            </li>
            <li>
              <strong>Da iPhone/iPad (Safari):</strong> tocca il pulsante quadrato con la freccia
              che esce verso l'alto (in basso al centro), poi "Aggiungi a Home". Avrai un'icona
              sulla schermata principale come fosse una app.
            </li>
            <li>
              <strong>Da Android (Chrome):</strong> tocca i tre puntini in alto a destra,
              poi "Aggiungi a schermata Home".
            </li>
          </ul>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="home">3. La schermata iniziale (home del pannello)</h2>
          <p>
            Quando entri vedi una <strong>card bianca centrata sullo schermo</strong> con il
            titolo <strong>RACCOLTE</strong> e sotto un elenco di 8 voci:
          </p>
          <ul>
            <li><strong>Informazioni Ristorante</strong> — nome, orari, indirizzo, telefono, foto in cima alla home, dati aziendali</li>
            <li><strong>Menù</strong> — tutti i piatti suddivisi per categoria (Pizzeria, Cucina, Panini &amp; Sfizi, Dolci, Menù Fissi) e per sezione (Antipasti, Pizze, ecc.)</li>
            <li><strong>Birreria &amp; Drink</strong> — birre, cocktail e vini suddivisi per categoria</li>
            <li><strong>Eventi &amp; Live</strong> — i prossimi concerti e il muro di locandine della home</li>
            <li><strong>Le anime del locale</strong> — le sezioni Cucina &amp; Pizzeria, Birreria e Live Club</li>
            <li><strong>Intrattenimenti &amp; Spazi</strong> — gli spazi del locale (Live Club, Studio 12.84, Vineria, Sala Chalet, Calcio Balilla, Giardino) mostrati in "Il Locale"</li>
            <li><strong>Testi della Home</strong> — titoli e frasi delle sezioni della homepage (manifesto, pizze, birreria, ecc.)</li>
            <li><strong>Tema del sito</strong> — colori e font del sito (con anteprima live)</li>
          </ul>
          <p>
            <strong>Per modificare una sezione</strong>, ti basta cliccare sulla voce che ti
            interessa. Si aprirà subito la pagina di modifica corrispondente (saltiamo
            automaticamente passaggi inutili).
          </p>
          <p>
            <strong>Per tornare a questa home da qualsiasi pagina di modifica:</strong>
          </p>
          <ul>
            <li>Clicca la freccia <strong>←</strong> in alto a sinistra, OPPURE</li>
            <li>Clicca la scritta <strong>"Contenuti"</strong> in alto a sinistra dell'header</li>
          </ul>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="editor">4. La schermata di modifica</h2>
          <p>Dopo che hai cliccato una raccolta, vedi una schermata divisa in tre aree:</p>
          <ul>
            <li>
              <strong>Sidebar a sinistra</strong>: l'elenco delle 8 raccolte. Da qui passi
              velocemente da una sezione all'altra senza tornare alla home.
            </li>
            <li>
              <strong>Area centrale</strong>: tutti i campi modificabili della sezione selezionata.
              Ogni campo ha un'etichetta (es. "Nome ristorante", "Telefono") e una casella per
              scrivere o un pulsante per caricare.
            </li>
            <li>
              <strong>Anteprima a destra</strong>: mentre scrivi, qui vedi <strong>in tempo
              reale</strong> come apparirà sul sito. Aggiornata istantaneamente.
            </li>
          </ul>
          <p>
            <strong>In alto al centro</strong> trovi due pulsanti importanti:
            <strong> Salva</strong> e <strong>Pubblica</strong>. Vedi sezione 11 per cosa fanno.
          </p>
          <p>
            <strong>In basso a destra</strong> c'è un pulsante rosso "Guida" fluttuante: cliccandolo
            si apre questa stessa pagina in una nuova scheda.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="info">5. Modificare le informazioni del ristorante</h2>
          <p>
            Dalla home centrale clicca <strong>"Informazioni Ristorante"</strong>.
            Si apre il form con tutti i campi divisi per gruppi. <strong>I gruppi (Indirizzo,
            Orari, Social, Dati aziendali) sono collassati di default</strong>: clicca sulla
            freccia <strong>&gt;</strong> a sinistra del titolo del gruppo per espanderlo.
            Te li elenco tutti uno per uno.
          </p>

          <h3>Dati base</h3>
          <ul>
            <li>
              <strong>Nome ristorante</strong>: il nome che appare in tutti i titoli del sito
              e nei link di prenotazione. Es: "Locanda Blues".
            </li>
            <li>
              <strong>Tagline</strong>: la frase corta che appare sotto il nome nella home.
              Tipo "Cucina, birre e musica dal vivo a Roma Nord".
            </li>
            <li>
              <strong>Testo introduttivo (home)</strong>: il paragrafo più lungo che appare
              nella pagina principale, dopo il nome. Spiega chi siete in poche righe.
            </li>
          </ul>

          <h3>Contatti</h3>
          <ul>
            <li>
              <strong>Telefono</strong>: il numero come preferisci scriverlo, anche con spazi
              ed il prefisso (esempio: <code>+39 06 3031 0097</code>). Il sito ricava in
              automatico la versione "tutto attaccato" per i link "chiama" sui cellulari.
            </li>
            <li>
              <strong>Email</strong>: indirizzo email per contatti. Deve essere un'email valida
              (con <code>@</code> e dominio). Se sbagli formato il sistema ti dà errore in rosso
              e <strong>non ti fa salvare finché non correggi</strong>.
            </li>
          </ul>

          <h3>Indirizzo</h3>
          <ul>
            <li><strong>Via e numero civico</strong>: es. "Via Cassia 1284 (La Giustiniana)".</li>
            <li><strong>CAP e città</strong>: es. "00189 Roma".</li>
            <li>
              <strong>Link Google Maps</strong>: opzionale ma consigliato. Apri Google Maps, cerca
              il ristorante, clicca "Condividi" e copia il link. Incollalo qui. Sul sito apparirà
              un link "Vedi su Google Maps" cliccabile.
            </li>
          </ul>

          <h3>Orari di apertura</h3>
          <p>
            Vedi un elenco di "fasce orarie". Ogni riga rappresenta uno o più giorni con i loro
            orari. Per ciascuna riga compila:
          </p>
          <ul>
            <li><strong>Giorni</strong>: testo libero, esempio "Martedì – Sabato" o "Domenica e Lunedì".</li>
            <li><strong>Orario pranzo</strong>: opzionale, esempio "12:30 – 15:00".</li>
            <li><strong>Orario cena</strong>: opzionale, esempio "19:30 – 00:30".</li>
            <li>
              <strong>Giorno di chiusura</strong>: una casella da spuntare. Se la spunti, quei
              giorni siete chiusi e gli orari vengono ignorati.
            </li>
          </ul>
          <p>
            <strong>Per aggiungere una fascia oraria:</strong> clicca il pulsante "Aggiungi
            Fascia oraria" che trovi sotto l'ultima riga esistente. Compare una nuova riga vuota
            da compilare.<br />
            <strong>Per rimuovere una fascia:</strong> sulla riga che vuoi eliminare, clicca
            la "X" che vedi a destra. Se la X è grigia/disabilitata significa che hai raggiunto
            il numero minimo di fasce (vedi sezione 14).
          </p>

          <h3>Social</h3>
          <ul>
            <li>
              <strong>Link Instagram</strong>: devi incollare l'URL completo della pagina, deve
              iniziare con <code>https://www.instagram.com/</code>. Se incolli solo
              "@locandablues" il sistema ti dà errore.
            </li>
            <li>
              <strong>Link Facebook</strong>: stesso discorso, deve iniziare con
              <code>https://www.facebook.com/</code>.
            </li>
          </ul>
          <p>Se non avete una pagina su uno dei social, lascia il campo vuoto e basta.</p>

          <h3>Foto in cima alla home (prima schermata)</h3>
          <p>
            È la grande foto che si vede in cima alla pagina iniziale, accanto al titolo.
            Cliccala per sostituirla (vedi sezione 10). Consigliata orizzontale e ben illuminata.
          </p>

          <h3>Dati aziendali (importante: obbligatori per legge)</h3>
          <p>
            La legge italiana (D.Lgs. 70/2003) richiede che ogni sito di un'attività commerciale
            mostri questi dati nel footer della pagina. Compila tutto:
          </p>
          <ul>
            <li><strong>Ragione sociale</strong>: il nome ufficiale della società/ditta individuale</li>
            <li><strong>Partita IVA</strong>: 11 cifre</li>
            <li><strong>Codice fiscale</strong></li>
            <li><strong>Sede legale</strong>: indirizzo completo della sede</li>
            <li><strong>Email PEC</strong>: la posta elettronica certificata</li>
          </ul>
          <p>
            Compaiono in piccolo nel footer di ogni pagina. Sono anche citati nella nostra
            Privacy Policy come "titolare del trattamento" — quindi è importante che siano
            esatti.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="tema">9. Personalizzare colori e font del sito (Tema)</h2>
          <p>
            Dalla home centrale clicca <strong>"Tema del sito"</strong> (l'ultima voce). Si apre
            una schermata divisa in due: a sinistra i campi per cambiare colori e font, a
            destra <strong>l'anteprima live</strong> che ti mostra un esempio realistico del
            sito (titolo, descrizione, pizze con prezzi, bottone Prenota, scheda Live Club) che
            <strong> si aggiorna istantaneamente</strong> mentre modifichi.
          </p>
          <p>
            È una funzione potente: <strong>cambia visivamente tutto il sito</strong>.
          </p>

          <h3>I 5 colori personalizzabili</h3>
          <ul>
            <li>
              <strong>Colore principale</strong>: usato per <em>bottoni, link, titoli sezione</em>
              come "ANTIPASTI", "PIZZE". Default: bordeaux del logo (#6E1A1A).
            </li>
            <li>
              <strong>Colore accento</strong>: usato per <em>badge, eyebrow</em> (le scritte
              piccole sopra ai titoli, tipo "Dal forno a legna"). Default: ambra-miele del logo (#C8902F).
            </li>
            <li>
              <strong>Colore dei prezzi</strong>: usato per i <em>prezzi del menù e dei drink</em>.
              Categoria separata perché è frequente volerli di un colore diverso. Default: ambra (#A8701C).
            </li>
            <li>
              <strong>Colore sfondo</strong>: il colore di base di tutto il sito. Default: carta/panna
              chiara (#F4EAD7).
            </li>
            <li>
              <strong>Colore testo principale</strong>: il colore del corpo del testo (descrizioni,
              paragrafi). Default: legno scuro caldo (#271511).
            </li>
          </ul>
          <p>
            <strong>Come si usa il color picker:</strong> clicca sul rettangolo colorato accanto
            al nome. Si apre un selettore. Puoi cliccare sul cerchio per scegliere visivamente
            o inserire un codice esadecimale (es. <code>#1A1A1A</code>) per essere preciso.
            Clicca fuori per confermare.
          </p>

          <h3>I 2 font personalizzabili</h3>
          <ul>
            <li>
              <strong>Font dei titoli</strong>: il font usato per nomi di piatti, titoli sezione,
              titolo del ristorante. Scegli da un elenco di 4:
              <ul>
                <li><em>Bitter</em> (default): slab serif caldo, stile "menù di legno"</li>
                <li><em>Playfair Display</em>: serif elegante, classico romantico</li>
                <li><em>Cormorant Garamond</em>: serif rinascimentale, più sottile</li>
                <li><em>DM Serif Display</em>: serif moderno, più "design contemporaneo"</li>
              </ul>
            </li>
            <li>
              <strong>Font del corpo del testo</strong>: il font usato per descrizioni e
              paragrafi. Scegli tra:
              <ul>
                <li><em>Inter</em> (default): senza grazie moderno, ottima leggibilità</li>
                <li><em>Manrope</em>: senza grazie geometrico, più "tech"</li>
                <li><em>Lora</em>: serif elegante, look più tradizionale</li>
              </ul>
            </li>
          </ul>

          <h3>Attenzione</h3>
          <p>
            Hai libertà totale: <strong>puoi anche fare combinazioni illeggibili</strong>
            (es. testo bianco su sfondo bianco, font che non si abbina). Se il sito diventa
            brutto o non leggibile, ricarica i valori di default (i codici colori e i nomi
            font li trovi qui sopra) per tornare allo stile originale.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="menu">6. Gestire il menù</h2>
          <p>
            Dalla home centrale clicca <strong>"Menù"</strong>. Si apre la pagina di modifica
            del menù completo del ristorante.
          </p>

          <h3>La struttura ad "alberello"</h3>
          <p>Il menù è organizzato a tre livelli:</p>
          <ol>
            <li>
              <strong>Categorie</strong> (es. "Pizzeria", "Cucina", "Panini &amp; Sfizi", "Menù Fissi"):
              sono i tab principali che il cliente vede in cima alla pagina /menu del sito.
            </li>
            <li>
              <strong>Sezioni</strong> (es. "Antipasti", "Primi", "Secondi", "Dolci"):
              le suddivisioni dentro a ciascuna categoria.
            </li>
            <li>
              <strong>Piatti</strong>: i singoli piatti con nome, descrizione (opzionale) e
              prezzo.
            </li>
          </ol>

          <h3>Visualizzazione "alberello" nel pannello</h3>
          <p>
            Vedi un elenco di categorie. A sinistra di ogni categoria c'è una freccia
            <strong> &gt;</strong>. Cliccala per "aprire" quella categoria e vedere le sezioni.
            Stesso meccanismo per le sezioni: clicca la freccia per aprire e vedere i piatti.
          </p>

          <h3>Modificare un piatto esistente</h3>
          <ol>
            <li>Espandi la categoria che ti interessa cliccando la freccia <strong>&gt;</strong>.</li>
            <li>Espandi la sezione (es. "Antipasti").</li>
            <li>Trova il piatto e cliccalo per aprirlo.</li>
            <li>
              Modifica <strong>Nome</strong>, <strong>Descrizione</strong> (opzionale) o
              <strong> Prezzo</strong>.
            </li>
            <li>Scorri in alto e clicca <strong>"Salva"</strong>, poi <strong>"Pubblica"</strong>.</li>
          </ol>
          <p>
            <strong>Attenzione al prezzo</strong>: è solo un numero. Scrivi <code>13</code>
            non <code>13€</code> o <code>13,00 €</code>. Per i decimali usa il <strong>punto</strong>
            (es. <code>13.50</code>), non la virgola. Il simbolo € viene aggiunto automaticamente
            sul sito.
          </p>

          <h3>Aggiungere un piatto nuovo</h3>
          <ol>
            <li>Apri la categoria e la sezione dove vuoi inserirlo.</li>
            <li>
              In fondo all'elenco dei piatti esistenti c'è un pulsante
              <strong> "Aggiungi Piatto"</strong>. Cliccalo.
            </li>
            <li>Compila <strong>Nome</strong> (obbligatorio), <strong>Descrizione</strong> (opzionale), <strong>Prezzo</strong>.</li>
            <li>Salva e pubblica.</li>
          </ol>

          <h3>Eliminare un piatto</h3>
          <ol>
            <li>Apri la categoria e la sezione che lo contiene.</li>
            <li>Sulla riga del piatto cerca la <strong>X</strong> a destra. Cliccala.</li>
            <li>Conferma. Salva e pubblica.</li>
          </ol>

          <h3>Riordinare piatti, sezioni, categorie</h3>
          <p>
            Sulla riga di ogni elemento c'è una <strong>icona "drag" (un quadratino con tre
            linee orizzontali)</strong> di solito al centro. <strong>Clicca e tieni premuto</strong>
            su quell'icona, poi <strong>trascina su o giù</strong> per spostare l'elemento.
            <strong> L'ordine qui = l'ordine sul sito.</strong>
          </p>

          <h3>Menù fissi (prezzo fisso)</h3>
          <p>
            Per i menù fissi (es. "Menù Pizza", "Menù Carne"), la sezione ha un campo
            <strong> "Prezzo fisso €/persona"</strong>. Compila quel campo con il prezzo per
            persona (es. <code>25</code>) e <strong>lascia VUOTO il prezzo dei singoli piatti</strong>
            della sezione. Sul sito apparirà il totale in alto e l'elenco dei piatti senza
            prezzi accanto.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="vini">7. Gestire la birreria &amp; i drink</h2>
          <p>
            Dalla home clicca <strong>"Birreria &amp; Drink"</strong>. La struttura è simile al menù
            ma con 2 livelli principali (3 quando servono le sottocategorie):
          </p>
          <ul>
            <li><strong>Categorie</strong>: "Birre alla Spina", "Birre in Bottiglia", "Cocktail &amp; Mixology", "Vini", "Bollicine &amp; Liquori".</li>
            <li><strong>Voci</strong>: nome, descrizione (stile, gradazione, formato…), prezzo.</li>
            <li>
              <strong>Sottocategorie</strong>: permettono di suddividere ulteriormente una
              categoria, esempio "IPA — 33cl", "Easy Rider", "Cocktail della Locanda".
            </li>
          </ul>
          <p>
            <strong>Il prezzo è facoltativo</strong>: per le birre alla spina (che hanno più
            formati) puoi lasciarlo vuoto e indicare i prezzi nella descrizione.
          </p>
          <p>Le procedure per aggiungere/modificare/eliminare/riordinare sono identiche al menù.</p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="team">8. Gestire le anime del locale</h2>
          <p>
            Dalla home clicca <strong>"Le anime del locale"</strong>. Vedi l'elenco delle
            sezioni (Cucina &amp; Pizzeria, Birreria, Live Club). Per ognuna puoi modificare:
          </p>
          <ul>
            <li>
              <strong>Ruolo</strong>: esempio "Cucina &amp; Pizzeria", "Birreria &amp; Mixology", "Live Club".
            </li>
            <li>
              <strong>Nome</strong> della sezione (es. "Il Forno a Legna", "Le Spine").
            </li>
            <li>
              <strong>Biografia</strong>: testo che la racconta. Appare sul sito sotto la foto.
              Tipicamente 3-5 righe.
            </li>
            <li>
              <strong>Foto</strong>: una foto rappresentativa, ben illuminata. Vedi sezione
              10 per come caricarla.
            </li>
          </ul>

          <h3>Aggiungere una sezione nuova</h3>
          <p>
            Clicca <strong>"Aggiungi Persona"</strong> in fondo all'elenco. Compila i campi
            della nuova sezione.
          </p>

          <h3>Riordinare le sezioni</h3>
          <p>Trascina le voci su o giù con l'icona drag. L'ordine = l'ordine sulla pagina Il Locale.</p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="foto">10. Caricare e gestire le foto</h2>
          <p>
            Ogni campo "Foto" ha la sua <strong>libreria dedicata</strong>: quando clicchi su
            un campo foto del team, vedi SOLO le foto del team. Non si mescolano con quelle
            delle altre sezioni. Così è impossibile sbagliare.
          </p>

          <h3>Caricare una foto da computer/telefono</h3>
          <ol>
            <li>Clicca sul campo foto (es. la foto in cima alla home, o la foto di una sezione).</li>
            <li>
              Si apre una finestra <strong>"Risorse multimediali"</strong> con le foto già presenti.
            </li>
            <li>
              In alto a destra clicca il pulsante nero <strong>"Upload"</strong> (Carica).
            </li>
            <li>
              Si apre il <strong>file manager</strong> del tuo computer/telefono. Vai nella
              cartella dove hai salvato la foto, cliccala, poi clicca "Apri" (o "Scegli" su telefono).
            </li>
            <li>La foto appare nella libreria. Cliccala per selezionarla.</li>
            <li>
              In alto clicca <strong>"Inserisci selezionato"</strong>.
              La foto è ora nel campo. Salva e pubblica per renderla effettiva.
            </li>
          </ol>

          <h3>Sostituire una foto già caricata</h3>
          <ol>
            <li>Clicca sul campo foto attuale.</li>
            <li>Si apre la libreria. Carica la nuova foto o seleziona una già presente.</li>
            <li>Clicca "Inserisci selezionato".</li>
          </ol>

          <h3>Eliminare una foto da una lista</h3>
          <p>
            In alcune sezioni le foto sono in elenco (es. il muro di locandine in "Eventi &amp; Live"):
            sulla riga della foto da rimuovere clicca la <strong>X</strong> a destra. Salva e pubblica.
          </p>

          <h3>Formati supportati e consigli</h3>
          <ul>
            <li>Formati: <strong>JPG</strong>, <strong>PNG</strong>, <strong>WebP</strong>.</li>
            <li>
              <strong>Foto in cima alla home</strong>: foto orizzontale, ben illuminata. Risoluzione
              consigliata 1920×1080 ma il sistema gestisce qualsiasi formato.
            </li>
            <li>
              <strong>Foto team</strong>: foto verticali del volto, sfondo pulito.
            </li>
            <li>
              <strong>Non preoccuparti delle dimensioni del file</strong>: il sito comprime
              automaticamente le foto al momento della pubblicazione. Puoi caricare anche
              foto da 10 MB e funzioneranno (le comprimiamo a ~300 KB senza perdita visibile
              di qualità).
            </li>
          </ul>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="pubblica">11. Salvare e pubblicare le modifiche</h2>
          <p>
            Quando hai modificato qualcosa, in alto al centro/destra compaiono due pulsanti
            molto importanti:
          </p>
          <ul>
            <li>
              <strong>Pulsante "Salva"</strong> (più chiaro): salva le modifiche come
              <strong> bozza</strong>. Le tue modifiche sono al sicuro nel sistema, ma sul sito
              vero (quello che vedono i clienti) <strong>non si vede ancora nulla</strong>.
              Utile se devi tornare più tardi a finire o vuoi fare più modifiche prima di
              renderle pubbliche.
            </li>
            <li>
              <strong>Pulsante "Pubblica"</strong> (più scuro/colorato): rende effettive le
              modifiche. Dopo aver cliccato, parte un processo automatico che ricostruisce
              il sito.
            </li>
          </ul>

          <h3>Quanto tempo ci mette ad apparire sul sito vero?</h3>
          <p>
            <strong>1-2 minuti</strong>. Dopo aver cliccato "Pubblica", aspetta un paio di
            minuti, poi ricarica la pagina del sito (premi F5 su computer, o trascina giù
            dalla cima della pagina su telefono) e vedrai le modifiche.
          </p>

          <h3>Se ti penti prima di pubblicare</h3>
          <p>
            Se hai fatto modifiche ma non hai ancora cliccato "Pubblica", puoi semplicemente
            chiudere il browser senza salvare. Le modifiche bozza vanno perse e il sito resta
            com'era. Oppure clicca "Esci senza salvare" se compare.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="navigare">12. Navigare tra le sezioni</h2>
          <p>
            Una volta che sei dentro a una pagina di modifica (es. Menù), per passare a un'altra
            sezione (es. Vini) hai due opzioni:
          </p>
          <ol>
            <li>
              <strong>Sidebar a sinistra</strong>: clicca direttamente la voce che ti interessa
              (es. "Carta dei Vini"). Vai dritto al form di modifica.
            </li>
            <li>
              <strong>Torna alla home</strong>: clicca <strong>"Contenuti"</strong> in alto
              a sinistra del header, oppure la freccia <strong>←</strong> sopra il titolo della
              sezione corrente. Vedi di nuovo la card centrale con le 8 raccolte.
            </li>
          </ol>
          <p>
            <strong>Attenzione</strong>: se cambi sezione senza prima salvare/pubblicare, le
            modifiche non pubblicate si perdono. Pubblica prima di passare ad altro.
          </p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="trovare">13. Trovare velocemente un piatto o vino</h2>
          <p>
            Il pannello non ha una ricerca interna ai piatti/vini. Però puoi usare la
            <strong> ricerca del browser</strong>, che è altrettanto efficace:
          </p>
          <ol>
            <li>Entra nella raccolta (es. "Menù") ed espandi tutte le categorie e sezioni dove può trovarsi.</li>
            <li>
              Premi sulla tastiera la combinazione <strong>Ctrl + F</strong> (su Mac:
              <strong> Cmd + F</strong>).
            </li>
            <li>
              Si apre una piccola barra di ricerca in alto del browser. Scrivici il nome del
              piatto (es. "tartare").
            </li>
            <li>
              Il browser evidenzia in giallo tutte le occorrenze. Usa le frecce su/giù per
              passare da un risultato all'altro.
            </li>
          </ol>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="errori">14. Errori comuni e come risolverli</h2>

          <h3>"Il campo si colora di rosso e non riesco a salvare"</h3>
          <p>
            Significa che hai inserito un valore che non rispetta il formato richiesto.
            Sotto al campo trovi un messaggio rosso che spiega cosa non va. Esempi tipici:
          </p>
          <ul>
            <li><strong>Email senza @</strong>: aggiungi @ e dominio (es. info@locandablues.it)</li>
            <li>
              <strong>Link Instagram/Facebook senza https://</strong>: incolla il link completo
              che inizia con <code>https://www.instagram.com/</code> o simili
            </li>
            <li>
              <strong>Prezzo con virgola o simbolo €</strong>: usa il punto (13.50, non 13,50)
              e niente €
            </li>
            <li>
              <strong>Telefono "solo cifre" con spazi</strong>: scrivi solo numeri,
              es. 390630310097 (questo non ti riguarda, ora c'è un campo unico)
            </li>
          </ul>

          <h3>"La X per cancellare un elemento è grigia"</h3>
          <p>
            Alcune liste (categorie, sezioni, team, fasce orarie) hanno un <strong>numero
            minimo</strong> di elementi per evitare che il sito resti con sezioni vuote. Se la X
            è disabilitata, significa che sei al minimo: puoi <strong>modificare</strong>
            l'elemento esistente ma non puoi cancellarlo. Tipicamente:
          </p>
          <ul>
            <li>Almeno 1 categoria di menù</li>
            <li>Almeno 1 sezione per ogni categoria</li>
            <li>Almeno 1 membro del team</li>
            <li>Almeno 1 fascia oraria</li>
          </ul>

          <h3>"Ho pubblicato una modifica sbagliata"</h3>
          <p>
            Niente panico: riapri il campo, correggilo, salva e pubblica di nuovo. Il sito si
            aggiorna in 1-2 minuti con la versione corretta.<br />
            Se hai fatto una modifica grossa e non ricordi com'era prima, contatta
            l'amministratore tecnico: il sistema salva ogni versione precedente nella cronologia
            (Git), quindi è possibile recuperare una versione di ieri/settimana scorsa.
          </p>

          <h3>"Le modifiche non appaiono sul sito vero"</h3>
          <p>Verifica nell'ordine:</p>
          <ol>
            <li>Hai cliccato <strong>Pubblica</strong> (non solo "Salva")?</li>
            <li>Sono passati almeno 2 minuti?</li>
            <li>
              Hai ricaricato la pagina del sito con <strong>Ctrl + F5</strong> (forza il
              browser a riscaricare invece di usare la versione in cache)?
            </li>
          </ol>
          <p>Se dopo questi controlli non vedi le modifiche, contatta l'amministratore tecnico.</p>

          <h3>"Non riesco a entrare nel pannello"</h3>
          <p>Verifica:</p>
          <ol>
            <li>L'indirizzo è scritto bene? Deve finire con <code>/admin</code>.</li>
            <li>La password è giusta? Controlla maiuscole/minuscole. Spesso aiuta copiarla/incollarla.</li>
            <li>Se appare "Email not found", controlla di scrivere l'email senza errori.</li>
            <li>Reset password con "Forgot password?" se nient'altro funziona.</li>
          </ol>

          <h3>"Ho personalizzato i colori ma il sito è illeggibile"</h3>
          <p>
            Vai su <strong>Informazioni Ristorante → Tema del sito</strong> e ripristina i
            valori di default che trovi qui:
          </p>
          <ul>
            <li>Colore principale: <code>#6E1A1A</code></li>
            <li>Colore accento: <code>#C8902F</code></li>
            <li>Colore dei prezzi: <code>#A8701C</code></li>
            <li>Colore sfondo: <code>#F4EAD7</code></li>
            <li>Colore testo principale: <code>#271511</code></li>
            <li>Font dei titoli: <em>Bitter</em></li>
            <li>Font del corpo: <em>Inter</em></li>
          </ul>
          <p>Salva e pubblica. Torni allo stile originale.</p>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="sicurezza">15. Sicurezza e buone abitudini</h2>
          <ul>
            <li>
              <strong>Attiva la verifica in due passaggi (2FA)</strong> sul tuo account Netlify.
              Chiede un codice numerico generato dal tuo telefono ogni volta che entri da un
              dispositivo nuovo. È la difesa più importante contro chi cercasse di rubarti
              l'accesso. Si attiva dalle impostazioni del tuo account Netlify.
            </li>
            <li>
              <strong>Non condividere mai email e password</strong> con persone esterne al
              ristorante, neanche per email o WhatsApp. Se più persone devono accedere, ognuna
              deve avere il proprio account (chiedi all'amministratore tecnico di inviare un
              invito separato).
            </li>
            <li>
              <strong>Usa una password lunga e unica</strong>: almeno 12 caratteri, non
              riutilizzata su altri siti. Se non riesci a ricordarle, usa un gestore password
              (es. Bitwarden, oppure quello integrato in Chrome/Safari).
            </li>
            <li>
              <strong>Esci dal pannello quando hai finito</strong>: clicca sull'icona del tuo
              account in alto a destra e seleziona "Esci". Soprattutto se usi un computer
              condiviso (es. quello in sala).
            </li>
            <li>
              <strong>Modifica una cosa alla volta</strong> e verifica il risultato sul sito
              vero prima di passare al successivo. Eviti di scoprire un errore quando hai già
              fatto dieci modifiche.
            </li>
            <li>
              <strong>Prima di cambiamenti grossi</strong> (es. nuova carta dei vini stagionale,
              ridisegno del tema colori): fai uno screenshot della versione attuale del sito.
              In questo modo hai sempre un confronto se qualcosa non torna.
            </li>
          </ul>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="eventi-cms">16. Gestire Eventi &amp; Live</h2>
          <p>
            Dalla home clicca <strong>"Eventi &amp; Live"</strong>. Da qui gestisci i concerti e le
            locandine mostrati sul sito:
          </p>
          <ul>
            <li><strong>Testo introduttivo</strong>: la frase sotto il titolo "Musica dal vivo".</li>
            <li>
              <strong>Prossimi live</strong>: l'elenco dei concerti. Per ognuno compili
              <strong> Giorno</strong> (es. "Ven"), <strong>Numero del giorno</strong> (es. "12"),
              <strong> Mese</strong> (es. "Giu"), <strong>Nome band/serata</strong>,
              <strong> Genere</strong>, <strong>Orario</strong> (es. "Live 22:00") e una
              <strong> Locandina</strong> (foto, opzionale). Trascina per riordinare.
            </li>
            <li>
              <strong>Muro di locandine</strong>: le immagini delle locandine mostrate in fondo alla
              sezione Live della home. Aggiungile/riordinale come le altre foto.
            </li>
          </ul>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="spazi-cms">17. Gestire Intrattenimenti &amp; Spazi</h2>
          <p>
            Dalla home clicca <strong>"Intrattenimenti &amp; Spazi"</strong>. Sono gli spazi mostrati
            nella pagina <strong>"Il Locale"</strong> (Live Club, Studio 12.84, Vineria, Sala Chalet,
            Calcio Balilla, Giardino). Puoi modificare:
          </p>
          <ul>
            <li><strong>Etichetta</strong> e <strong>Titolo</strong> della sezione, più un <strong>Testo introduttivo</strong>.</li>
            <li>
              L'elenco degli <strong>Spazi</strong>: per ognuno <strong>Titolo</strong>,
              <strong> Descrizione</strong> e un <strong>Link</strong> opzionale (es. la pagina
              Facebook dello Studio 12.84). <strong>Se inserisci il link, la card diventa cliccabile</strong>;
              se lo lasci vuoto resta solo informativa.
            </li>
          </ul>

          {/* ─────────────────────────────────────────────────────────────── */}
          <h2 id="testi-cms">18. Modificare i Testi della Home</h2>
          <p>
            Dalla home clicca <strong>"Testi della Home"</strong>. Qui cambi <strong>titoli e frasi</strong>
            delle sezioni della pagina iniziale <strong>senza toccare il codice</strong>. Ogni gruppo ha i suoi campi:
          </p>
          <ul>
            <li><strong>Prima schermata</strong> (in cima alla home): etichetta sopra il titolo, frase descrittiva, riga orari.</li>
            <li><strong>Manifesto</strong>, <strong>Pizze</strong>, <strong>Birreria</strong>, <strong>Le anime</strong>, <strong>Musica dal vivo</strong>, <strong>Fascia finale</strong>: etichetta e titolo (e, dove presente, il testo).</li>
          </ul>
          <p>Scrivi nei campi, poi <strong>Salva</strong> e <strong>Pubblica</strong>: il sito si aggiorna in 1-2 minuti.</p>

          <p className="text-sm text-charcoal/60 mt-12 border-t border-blush pt-6">
            Hai trovato qualcosa di poco chiaro in questa guida? Segnalalo all'amministratore
            tecnico: aggiorneremo la pagina per renderla ancora migliore.
          </p>
        </article>
      </section>
    </>
  )
}
