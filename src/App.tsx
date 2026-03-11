import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SEO from './components/SEO'
import Home from './pages/Home'
import Biographie from './pages/Biographie'
import Medias from './pages/Medias'
import Agenda from './pages/Agenda'
import Presse from './pages/Presse'
import Enseignement from './pages/Enseignement'
import Contact from './pages/Contact'
import Repertoire from './pages/Repertoire'
import AdminChat from './pages/AdminChat'

export default function App(): React.JSX.Element {
  return (
    // SEUL CHANGEMENT : bg-white au lieu de bg-neutral-950 text-neutral-100
    <div className="min-h-screen bg-white flex flex-col">
      <Routes>
        {/* Route admin sans Header/Footer */}
        <Route path="/admin" element={<AdminChat />} />

        {/* Routes publiques avec Header/Footer */}
        <Route path="*" element={
          <>
            <SEO />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/biographie" element={<Biographie />} />
                <Route path="/repertoire" element={<Repertoire />} />
                <Route path="/medias" element={<Medias />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/presse" element={<Presse />} />
                <Route path="/enseignement" element={<Enseignement />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                    <h1 className="text-6xl font-cormorant font-bold text-emerald-deep mb-4">404</h1>
                    <p className="text-xl text-neutral-600 mb-8">Cette page n'existe pas.</p>
                    <a href="/" className="inline-block px-6 py-3 bg-emerald-deep text-white rounded-lg hover:opacity-90 transition">
                      Retour à l'accueil
                    </a>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}