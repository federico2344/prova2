import { useEffect, useRef, useState } from 'react'

/**
 * Anima i figli quando entrano nel viewport (fade + slide up).
 * Usa IntersectionObserver: zero dipendenze, leggerissimo.
 *
 * Props:
 *  - as: tag/elemento da renderizzare (default 'div')
 *  - delay: ritardo in ms per effetti "a cascata" su elementi vicini
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Rispetta chi preferisce ridurre le animazioni (accessibilità)
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // Soglia bassa: basta che 1px dell'elemento entri nel viewport
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
