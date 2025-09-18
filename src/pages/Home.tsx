import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="section-bg-secondary section-padding pt-20">
        <div className="section-container grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu à gauche */}
          <div>
            <h1 className="title-hero mb-6">
              Marie Émeraude<br />
              Alcime
            </h1>
            <div className="flex gap-4 mb-8">
              <Link to="/repertoire" className="btn-secondary">
                Répertoire
              </Link>
              <button className="btn-secondary">
                Écouter
              </button>
            </div>
          </div>
          
          {/* Image à droite */}
          <div className="relative">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop"
                alt="Marie Émeraude Alcime"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Biographie */}
      <section className="section-bg-primary section-padding">
        <div className="section-container grid md:grid-cols-2 gap-12 items-start">
          {/* Image à gauche */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800&auto=format&fit=crop"
                alt="Marie Émeraude Alcime - Portrait"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          
          {/* Contenu à droite */}
          <div>
            <h2 className="title-section">Biographie</h2>
            <div className="text-body space-y-4 mb-6">
              <p>
                <span className="lettrine">A</span>
                lors quid autem sunt et ut corpore veritatis sunt blanditiis pariis ut
                corporis nobis distinctio quis perferendis soluta ullam. Quid
                distinctio libero eos autem eos voluptas sed ullam.
              </p>
              <p>
                A veniam neseciore est repellam eidam Aut nihilo aut reprehenderit aut nihilo
                error tenetur rerum aut esse modi tenetur. Qui quorum qui eprendi aspernatur aut  
                a unt repelli Quo lure rerum nesciunt ullaa nihllus undique dolorem
                voluptatibus qui voluptats.
              </p>
              <p>
                A repellat lonorlora aur uls dignissimo sem natura ullam est explicabo quae no  
                ulhue peaferendis. Haec cosnectatur aut antionsa faciliaque aut eratia vitae
              </p>
            </div>
            
            {/* Signature */}
            <div className="mb-6">
              <div className="signature">MA</div>
              <div className="text-small">
                <div className="font-medium">Marie Emeraude Alcime</div>
                <div>Cantatrice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Répertoire */}
      <section className="section-bg-secondary section-padding">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="title-section text-center">Répertoire</h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Découvrez les opéras principaux et les collaborations artistiques récurrentes qui définiront la
            carrière pour reprendre, ainsi opus marche donet condamné apparaîtra en que
            imperdiarum sunt Anantimurque ut autem amari non quod ipsum.
          </p>
          <div className="border-t border-accent pt-6 w-24 mx-auto"></div>
        </div>
      </section>

      {/* Section Formulaire de contact */}
      <section className="section-bg-primary section-padding">
        <div className="section-container grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu à gauche */}
          <div>
            <h2 className="title-section">Formulaire de contact</h2>
          </div>
          
          {/* Formulaire à droite */}
          <div className="card">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Objet"
                  className="form-input"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="form-textarea"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section Enseignement */}
      <section className="section-bg-primary section-padding">
        <div className="section-container">
          <h2 className="title-section text-center">Enseignement</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cours particuliers */}
            <article className="group">
              <div className="card-accent smooth-hover">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-accent text-xl">🎵</span>
                </div>
                <h3 className="title-card text-white">Cours particuliers</h3>
                <p className="text-small text-emerald-100">
                  Cours de chant adaptés à votre niveau et vos objectifs
                </p>
              </div>
            </article>

            {/* Master-classes */}
            <article className="group">
              <div className="card-accent smooth-hover">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-accent text-xl">🎭</span>
                </div>
                <h3 className="title-card text-white">Master-classes</h3>
                <p className="text-small text-emerald-100">
                  Sessions intensives d'interprétation et de technique vocale
                </p>
              </div>
            </article>

            {/* Coaching vocal */}
            <article className="group">
              <div className="card-accent smooth-hover">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-accent text-xl">🎤</span>
                </div>
                <h3 className="title-card text-white">Coaching vocal</h3>
                <p className="text-small text-emerald-100">
                  Préparation aux auditions et perfectionnement technique
                </p>
              </div>
            </article>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/enseignement" className="btn-primary">
              Découvrir tous les cours
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}