import { useState } from 'react'
import { wines } from '../data/siteData.js'
import { formatPrice } from '../lib/utils.js'

function Row({ wine }) {
  const hasPrice = wine.price != null
  return (
    <li className="break-inside-avoid py-2">
      <div className="menu-row">
        <span className="font-medium leading-snug text-charcoal">{wine.name}</span>
        {hasPrice && <span className="menu-leader" aria-hidden="true" />}
        {hasPrice && <span className="font-display font-semibold text-price">{formatPrice(wine.price)}</span>}
      </div>
      {wine.description && <p className="mt-0.5 text-sm leading-snug text-charcoal/55">{wine.description}</p>}
    </li>
  )
}

function Group({ title, items }) {
  return (
    <div className="mb-8 break-inside-avoid">
      {title && (
        <h3 className="mb-2 border-b-2 border-terracotta/30 pb-2 font-display text-lg font-bold uppercase tracking-wide text-charcoal">
          {title}
        </h3>
      )}
      <ul>{items.map((w) => <Row key={`${w.name}-${w.description ?? ''}`} wine={w} />)}</ul>
    </div>
  )
}

export default function WineTabs() {
  const [activeId, setActiveId] = useState(wines.sections[0]?.id)
  const active = wines.sections.find((s) => s.id === activeId) ?? wines.sections[0]

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-y border-charcoal/15 py-4">
        {wines.sections.map((s) => {
          const selected = s.id === active.id
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`font-display text-sm font-bold uppercase tracking-[0.1em] transition ${
                selected
                  ? 'text-terracotta underline decoration-2 underline-offset-8'
                  : 'text-charcoal/50 hover:text-charcoal'
              }`}
            >
              {s.title}
            </button>
          )
        })}
      </div>

      <div key={active.id} className="mx-auto mt-10 max-w-4xl animate-fadeIn">
        {active.items && (
          <ul className="gap-x-14 md:columns-2">
            {active.items.map((w) => <Row key={`${w.name}-${w.description ?? ''}`} wine={w} />)}
          </ul>
        )}
        {active.subsections && (
          <div className="gap-x-14 md:columns-2">
            {active.subsections.map((sub) => <Group key={sub.title} title={sub.title} items={sub.items} />)}
          </div>
        )}
      </div>
    </div>
  )
}
