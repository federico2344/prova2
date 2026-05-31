import { Link } from 'react-router-dom'
import { restaurant } from '../data/siteData.js'
import { telLink } from '../lib/utils.js'
import Logo from './Logo.jsx'

const navLinks = [
  { to: '/menu', label: 'I Menù' },
  { to: '/chi-siamo', label: 'Il Ristorante' },
  { to: '/vini', label: 'Carta dei Vini' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { social } = restaurant
  const booking = telLink(restaurant.phone)

  return (
    <footer
      className="bg-charcoal py-14 text-cream/80"
      style={{ paddingBottom: 'max(3.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand + indirizzo */}
          <div>
            <Logo
              variant="light"
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              {restaurant.address.street}
              <br />
              {restaurant.address.city}
            </p>
            <a
              href={booking}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Chiama per prenotare →
            </a>
          </div>

          {/* Navigazione */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-cream/50">Naviga</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti + social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-cream/50">Contatti</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={telLink(restaurant.phone)} className="transition hover:text-gold">
                  {restaurant.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${restaurant.email}`} className="transition hover:text-gold">
                  {restaurant.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                Instagram
              </a>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                Facebook
              </a>
              <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                Tripadvisor
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/50 space-y-2">
          {restaurant.legal && (restaurant.legal.companyName || restaurant.legal.vatNumber) && (
            <p>
              {restaurant.legal.companyName && <>{restaurant.legal.companyName} — </>}
              {restaurant.legal.legalAddress && <>{restaurant.legal.legalAddress} — </>}
              {restaurant.legal.vatNumber && <>P.IVA {restaurant.legal.vatNumber}</>}
              {restaurant.legal.fiscalCode && <> — C.F. {restaurant.legal.fiscalCode}</>}
              {restaurant.legal.pec && <> — PEC: {restaurant.legal.pec}</>}
            </p>
          )}
          <p>
            © {year} {restaurant.name}. Tutti i diritti riservati. —{' '}
            <Link to="/privacy" className="hover:text-gold underline-offset-2 hover:underline">Privacy Policy</Link>
            {' · '}
            <Link to="/cookie" className="hover:text-gold underline-offset-2 hover:underline">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
