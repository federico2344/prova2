import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Su ogni cambio di rotta riporta lo scroll in cima alla pagina.
 * Se l'URL contiene un'ancora (es. /#eventi), scrolla invece a quell'elemento.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Aspetta che la pagina sia montata, poi scrolla all'elemento con quell'id
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo({ top: 0, left: 0 })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}
