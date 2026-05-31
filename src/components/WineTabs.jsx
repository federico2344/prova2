import { useState, useRef, useEffect } from 'react'
import { wines } from '../data/siteData.js'
import { formatPrice } from '../lib/utils.js'

function WineRow({ wine }) {
  return (
    <li className="flex items-baseline gap-3 py-3.5 first:pt-0 last:pb-0">
      <div className="flex-1">
        <p className="font-medium text-charcoal leading-snug">{wine.name}</p>
        {wine.description && (
          <p className="mt-0.5 text-sm text-charcoal/60 leading-snug">{wine.description}</p>
        )}
      </div>
      <span className="shrink-0 font-display text-base text-price">{formatPrice(wine.price)}</span>
    </li>
  )
}

function WineGroup({ title, items }) {
  return (
    <div>
      {title && (
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-terracotta">
          {title}
        </h3>
      )}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-charcoal/5 sm:p-6">
        <ul className="divide-y divide-charcoal/10">
          {items.map((wine) => (
            <WineRow key={wine.name} wine={wine} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function WineTabs() {
  const [activeId, setActiveId] = useState(wines.sections[0]?.id)
  const active = wines.sections.find((s) => s.id === activeId) ?? wines.sections[0]

  const tabsRef = useRef(null)
  const activeTabRef = useRef(null)

  // Scrolla il tab attivo al centro del container su mobile
  useEffect(() => {
    const container = tabsRef.current
    const activeEl = activeTabRef.current
    if (!container || !activeEl) return

    const containerLeft = container.getBoundingClientRect().left
    const elLeft = activeEl.getBoundingClientRect().left
    const elWidth = activeEl.offsetWidth
    const containerWidth = container.offsetWidth
    const scrollTarget =
      container.scrollLeft + elLeft - containerLeft - containerWidth / 2 + elWidth / 2
    container.scrollTo({ left: scrollTarget, behavior: 'smooth' })
  }, [activeId])

  return (
    <div>
      {/* Tab — scroll orizzontale su mobile, wrap centrato su desktop */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Categorie carta dei vini"
        className="flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {wines.sections.map((section) => {
          const selected = section.id === active.id
          return (
            <button
              key={section.id}
              ref={selected ? activeTabRef : null}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(section.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selected
                  ? 'bg-gold text-charcoal shadow'
                  : 'border border-charcoal/15 bg-white text-charcoal/70 hover:border-gold/60 hover:text-gold'
              }`}
            >
              {section.title}
            </button>
          )
        })}
      </div>

      {/* Contenuto — appare subito senza aspettare scroll */}
      <div key={active.id} className="mx-auto mt-10 max-w-3xl animate-fadeIn">
        {active.items && <WineGroup items={active.items} />}

        {active.subsections && (
          <div className="space-y-8">
            {active.subsections.map((sub) => (
              <WineGroup key={sub.title} title={sub.title} items={sub.items} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
