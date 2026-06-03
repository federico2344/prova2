import { useState } from 'react'
import { menuData } from '../data/siteData.js'
import { formatPrice } from '../lib/utils.js'

function DishRow({ dish }) {
  const hasPrice = dish.price != null
  return (
    <li className="py-2.5">
      <div className="menu-row">
        <span className="font-semibold text-charcoal">
          {dish.name}
          {dish.tags?.map((t) => (
            <span key={t} className="ml-2 align-middle text-[0.62rem] font-semibold uppercase tracking-wider text-gold">
              · {t}
            </span>
          ))}
        </span>
        {hasPrice && <span className="menu-leader" aria-hidden="true" />}
        {hasPrice && <span className="font-display font-semibold text-price">{formatPrice(dish.price)}</span>}
      </div>
      {dish.description && <p className="mt-0.5 text-sm leading-snug text-charcoal/60">{dish.description}</p>}
    </li>
  )
}

function Section({ section }) {
  return (
    <div className="mb-9 break-inside-avoid">
      <div className="mb-2 flex items-baseline justify-between gap-3 border-b-2 border-terracotta/30 pb-2">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-charcoal">{section.title}</h3>
        {section.fixedPrice != null && <span className="stamp shrink-0">{formatPrice(section.fixedPrice)} a persona</span>}
      </div>
      {section.note && <p className="mb-2 text-sm italic text-charcoal/60">{section.note}</p>}
      <ul>
        {section.dishes.map((d) => (
          <DishRow key={`${d.name}-${d.description ?? ''}-${d.price ?? ''}`} dish={d} />
        ))}
      </ul>
    </div>
  )
}

export default function MenuTabs() {
  const [activeId, setActiveId] = useState(menuData[0]?.id)
  const active = menuData.find((c) => c.id === activeId) ?? menuData[0]

  return (
    <div>
      {/* Selettore categorie: link di testo, non più "pillole" */}
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 border-y border-charcoal/15 py-4">
        {menuData.map((cat) => {
          const selected = cat.id === active.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`font-display text-sm font-bold uppercase tracking-[0.12em] transition ${
                selected
                  ? 'text-terracotta underline decoration-2 underline-offset-8'
                  : 'text-charcoal/50 hover:text-charcoal'
              }`}
            >
              {cat.title}
            </button>
          )
        })}
      </div>

      <div key={active.id} className="mx-auto mt-10 max-w-4xl animate-fadeIn">
        {active.description && (
          <p className="mb-10 text-center italic text-charcoal/65">{active.description}</p>
        )}
        <div className="gap-x-14 md:columns-2">
          {active.sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}
