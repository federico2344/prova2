import { useState, useRef, useEffect } from 'react'
import { menuData } from '../data/siteData.js'
import { formatPrice } from '../lib/utils.js'

function Dish({ dish }) {
  return (
    <li className="flex items-baseline gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-semibold text-charcoal">{dish.name}</h4>
          {dish.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-gold"
            >
              {tag}
            </span>
          ))}
        </div>
        {dish.description && (
          <p className="mt-1 text-sm leading-relaxed text-charcoal/60">{dish.description}</p>
        )}
      </div>
      {dish.price != null && (
        <span className="shrink-0 font-display text-lg text-price">{formatPrice(dish.price)}</span>
      )}
    </li>
  )
}

function Section({ section }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 sm:p-8">
      {section.title && (
        <div className="mb-4 border-b border-charcoal/10 pb-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-charcoal">{section.title}</h3>
            {section.fixedPrice != null && (
              <span className="font-display text-lg text-terracotta">
                {formatPrice(section.fixedPrice)} a persona
              </span>
            )}
          </div>
          {section.note && <p className="mt-1 text-sm italic text-charcoal/60">{section.note}</p>}
        </div>
      )}
      <ul className="divide-y divide-charcoal/10">
        {section.dishes.map((dish) => (
          <Dish key={dish.name} dish={dish} />
        ))}
      </ul>
    </div>
  )
}

function getDefaultMenuId() {
  const now = new Date()
  const day = now.getDay()   // 0=dom, 1=lun, …, 6=sab
  const hour = now.getHours()
  // Sabato → sempre menù serale (copre sia pranzo sia cena del sabato)
  if (day === 6) return 'serale'
  // Negli altri giorni: prima delle 17 → pranzo, dopo → serale
  return hour >= 17 ? 'serale' : 'pranzo'
}

export default function MenuTabs() {
  const [activeId, setActiveId] = useState(() => getDefaultMenuId())
  const active = menuData.find((c) => c.id === activeId) ?? menuData[0]
  const isDegustazione = active.id === 'degustazione'

  // Ref al container dei tab per scrollare l'attivo in vista
  const tabsRef = useRef(null)
  const activeTabRef = useRef(null)

  useEffect(() => {
    const container = tabsRef.current
    const activeEl = activeTabRef.current
    if (!container || !activeEl) return

    // Centra il tab attivo nel container scrollabile su mobile
    const containerLeft = container.getBoundingClientRect().left
    const elLeft = activeEl.getBoundingClientRect().left
    const elWidth = activeEl.offsetWidth
    const containerWidth = container.offsetWidth
    const scrollTarget = container.scrollLeft + elLeft - containerLeft - (containerWidth / 2) + (elWidth / 2)
    container.scrollTo({ left: scrollTarget, behavior: 'smooth' })
  }, [activeId])

  return (
    <div>
      {/* Tab — scrollabili su mobile, centrati su desktop */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Categorie del menù"
        className="flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {menuData.map((cat) => {
          const selected = cat.id === active.id
          return (
            <button
              key={cat.id}
              ref={selected ? activeTabRef : null}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(cat.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selected
                  ? 'bg-terracotta text-cream shadow'
                  : 'border border-charcoal/15 bg-white text-charcoal/70 hover:border-terracotta/40 hover:text-terracotta'
              }`}
            >
              {cat.title}
            </button>
          )
        })}
      </div>

      {/* Contenuto — appare subito senza aspettare scroll */}
      <div
        key={active.id}
        className="mx-auto mt-10 max-w-3xl animate-fadeIn"
      >
        {active.description && (
          <p className="mb-8 text-center text-charcoal/65">{active.description}</p>
        )}

        <div className={isDegustazione ? 'grid gap-6 md:grid-cols-2' : 'space-y-6'}>
          {active.sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </div>

        {isDegustazione && (
          <p className="mt-6 text-center text-sm italic text-charcoal/55">
            Menù degustazione disponibile per l'intero tavolo. Abbinamento vini su richiesta.
          </p>
        )}
      </div>
    </div>
  )
}
