import React from "react";

export default function Biographie(): React.JSX.Element {
  return (
    <div className="bg-emerald-800 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Layout principal - Texte à gauche, image à droite */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Colonne de gauche - Contenu textuel */}
          <div className="space-y-8">
            <h1 className="text-5xl font-serif mb-8 text-ivory">Biographie</h1>
            
            <div className="space-y-6 text-ivory/90 leading-relaxed">
              <p>
                Marie-Émeraude Alcime est une mezzo-soprano originaire de Guadeloupe. 
                Issue d'une famille de musiciens, elle débute très tôt le piano, la flûte 
                traversière et les percussions traditionnelles. Après un baccalauréat 
                littéraire option musique, elle poursuit des études supérieures en 
                musicologie et métiers de la scène (Rouen, Nancy), avant d'intégrer 
                le chœur de l'Opéra-Théâtre de Metz Métropole.
              </p>
              
              <p>
                Sur scène, on a pu l'entendre dans <em>Les Contes d'Hoffmann</em> 
                d'Offenbach (Metz) et <em>La vie parisienne</em> (Metz, Massy). 
                Au concert, son répertoire inclut l'<em>Oratorio de Noël</em> 
                (Saint-Saëns), le <em>Stabat Mater</em> (Pergolèse) et la 
                <em>Petite messe solennelle</em> (Rossini). Parallèlement, elle 
                développe une activité de cheffe de chœur et professeure de chant.
              </p>
              
              <p>
                Formée dans une approche complète de l'art lyrique, Marie-Émeraude 
                combine technique vocale rigoureuse et sensibilité artistique. 
                Son parcours, entre tradition caribéenne et formation classique 
                européenne, nourrit une interprétation personnelle et authentique 
                du répertoire lyrique français et italien.
              </p>
            </div>
            
            {/* Section parcours professionnel */}
            <div className="mt-12">
              <h2 className="text-2xl font-serif text-yellow-300 mb-6">Parcours & Formation</h2>
              <div className="space-y-4 text-emerald-200">
                <div className="border-l-2 border-yellow-300 pl-4">
                  <h3 className="font-semibold text-emerald-100">Formation musicologique</h3>
                  <p className="text-sm">Université de Rouen & Nancy - Musicologie et métiers de la scène</p>
                </div>
                <div className="border-l-2 border-emerald-600 pl-4">
                  <h3 className="font-semibold text-emerald-100">Opéra-Théâtre de Metz Métropole</h3>
                  <p className="text-sm">Membre du chœur - Participations dans diverses productions</p>
                </div>
                <div className="border-l-2 border-emerald-600 pl-4">
                  <h3 className="font-semibold text-emerald-100">Activité pédagogique</h3>
                  <p className="text-sm">Cheffe de chœur et professeure de chant</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-amber-100 rounded-2xl overflow-hidden max-w-md w-full">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop"
                alt="Marie Émeraude Alcime"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Section téléchargements - En bas */}
        <div className="mt-16 border-t border-emerald-700 pt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif text-yellow-300 mb-4">Téléchargements</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center space-x-2 text-emerald-200 hover:text-yellow-300 transition-colors">
                    <span className="text-yellow-300">📄</span>
                    <span>Biographie courte (PDF)</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 text-emerald-200 hover:text-yellow-300 transition-colors">
                    <span className="text-yellow-300">📸</span>
                    <span>Photos haute définition (ZIP)</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 text-emerald-200 hover:text-yellow-300 transition-colors">
                    <span className="text-yellow-300">🎵</span>
                    <span>Liste du répertoire (PDF)</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-serif text-yellow-300 mb-4">Langues de travail</h3>
              <ul className="text-emerald-200 space-y-2">
                <li>• Français (langue maternelle)</li>
                <li>• Italien (opéra)</li>
                <li>• Anglais (professionnel)</li>
                <li>• Allemand (répertoire)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-serif text-yellow-300 mb-4">Contact professionnel</h3>
              <div className="space-y-2 text-emerald-200">
                <p>
                  <a href="mailto:booking@example.com" className="hover:text-yellow-300 transition-colors">
                    booking@example.com
                  </a>
                </p>
                <p className="text-sm">Disponible pour :</p>
                <ul className="text-sm space-y-1">
                  <li>• Productions lyriques</li>
                  <li>• Concerts & récitals</li>
                  <li>• Master-classes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};