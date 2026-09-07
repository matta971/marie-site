import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Remet la page en haut à chaque changement de route.
 *
 * React Router ne touche pas au défilement : sans ce composant, on arrive sur la
 * nouvelle page à la hauteur où l'on avait quitté la précédente, souvent en
 * plein milieu du contenu.
 *
 * Le saut est instantané et non animé : une animation depuis le bas d'une page
 * longue donne un défilement interminable, et elle est de toute façon ignorée
 * si le visiteur a demandé de réduire les animations.
 */
export default function ScrollToTop(): null {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}
