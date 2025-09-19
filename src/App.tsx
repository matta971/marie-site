import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Biographie from './pages/Biographie'
import Medias from './pages/Medias'
import Agenda from './pages/Agenda'
import Presse from './pages/Presse'
import Enseignement from './pages/Enseignement'
import Contact from './pages/Contact'
import Repertoire from './pages/Repertoire'

export default function App(): React.JSX.Element {
  return (
    // SEUL CHANGEMENT : bg-white au lieu de bg-neutral-950 text-neutral-100
    <div className="min-h-screen bg-white flex flex-col">
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
          <Route path="*" element={<div className="p-10">Page non trouvée.</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}