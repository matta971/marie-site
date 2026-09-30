import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './i18n'
import './index.css'

/**
 * Retire du head les balises que le composant SEO va réécrire.
 *
 * react-helmet-async ajoute ses balises sans retirer celles déjà présentes :
 * celles du gabarit `index.html` et, sur les pages prérendues, celles figées
 * au build. Une fois le JavaScript exécuté, chaque page portait donc deux
 * titres, deux canoniques et deux descriptions, ce que Google lit dans la page
 * rendue. SEO.tsx les recrée toutes au premier rendu.
 */
function retirerBalisesFigees() {
  document.head
    .querySelectorAll(
      'title, meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], ' +
      'meta[property^="article:"], link[rel="canonical"], link[rel="alternate"][hreflang], ' +
      'script[type="application/ld+json"]'
    )
    .forEach(balise => balise.remove())
}

retirerBalisesFigees()


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<HelmetProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</HelmetProvider>
</React.StrictMode>
)