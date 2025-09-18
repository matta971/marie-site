import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(): React.JSX.Element {
  return (
    <footer className="footer-bg">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="text-anthracite font-title text-lg italic">ME</span>
              </div>
              <div className="text-white font-title text-lg">
                Marie Emeraude<br />
                Alcime
              </div>
            </div>
            <p className="text-small text-gray-300 leading-relaxed">
              Mezzo-soprano passionnée, explorant les répertoires classiques 
              et contemporains avec sensibilité et technique.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="title-card text-white mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link to="/biographie" className="footer-link block">
                Biographie
              </Link>
              <Link to="/repertoire" className="footer-link block">
                Répertoire
              </Link>
              <Link to="/medias" className="footer-link block">
                Médias
              </Link>
              <Link to="/enseignement" className="footer-link block">
                Enseignement
              </Link>
            </nav>
          </div>

          {/* Informations pratiques */}
          <div>
            <h3 className="title-card text-white mb-4">Informations</h3>
            <div className="space-y-2 text-small text-gray-300">
              <p>Disponible pour :</p>
              <ul className="space-y-1">
                <li>• Productions lyriques</li>
                <li>• Concerts & récitals</li>
                <li>• Master-classes</li>
                <li>• Collaborations artistiques</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="title-card text-white mb-4">Contact</h3>
            <div className="space-y-2 text-small text-gray-300">
              <p>
                <a href="mailto:contact@marie-emeraude-alcime.fr" className="footer-link">
                  contact@marie-emeraude-alcime.fr
                </a>
              </p>
              <p>
                <a href="tel:+33123456789" className="footer-link">
                  +33 1 23 45 67 89
                </a>
              </p>
              <div className="pt-4">
                <Link to="/contact" className="btn-primary">
                  Formulaire de contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-caption text-gray-400">
            <div>
              © {new Date().getFullYear()} Marie Émeraude Alcime. Tous droits réservés.
            </div>
            <div className="mt-2 md:mt-0 flex gap-4">
              <a href="#" className="footer-link">Mentions légales</a>
              <a href="#" className="footer-link">Politique de confidentialité</a>
              <a href="#" className="footer-link">Crédits</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}