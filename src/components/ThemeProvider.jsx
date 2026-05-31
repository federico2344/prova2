import { useEffect } from 'react'
import { theme } from '../data/siteData.js'

const FONT_STACKS = {
  'Playfair Display': '"Playfair Display", Georgia, serif',
  'Cormorant Garamond': '"Cormorant Garamond", Garamond, serif',
  'DM Serif Display': '"DM Serif Display", "Times New Roman", serif',
  Inter: 'Inter, system-ui, sans-serif',
  Manrope: 'Manrope, system-ui, sans-serif',
  Lora: 'Lora, Georgia, serif',
}

function hexToRgbTriplet(hex) {
  if (!hex) return null
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6 && clean.length !== 3) return null
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  if ([r, g, b].some(Number.isNaN)) return null
  return `${r} ${g} ${b}`
}

export default function ThemeProvider() {
  useEffect(() => {
    const t = theme || {}
    const root = document.documentElement

    const apply = (cssVar, hex) => {
      const triplet = hexToRgbTriplet(hex)
      if (triplet) root.style.setProperty(cssVar, triplet)
    }

    apply('--c-brand', t.colorBrand)
    apply('--c-gold', t.colorAccent)
    apply('--c-price', t.colorPrice)
    apply('--c-cream', t.colorBackground)
    apply('--c-charcoal', t.colorText)

    const displayFont = FONT_STACKS[t.fontDisplay]
    const bodyFont = FONT_STACKS[t.fontBody]
    if (displayFont) root.style.setProperty('--font-display', displayFont)
    if (bodyFont) root.style.setProperty('--font-body', bodyFont)
  }, [])

  return null
}
