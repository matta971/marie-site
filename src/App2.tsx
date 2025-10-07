// src/App.tsx - VERSION DE TEST
import { useNotionData } from './hooks/useNotionData';
import { getConcerts, getMedias, getPressArticles } from './services/notionService';
import './App.css';

function App() {
  // Test récupération des concerts
  const { data: concerts, loading: loadingConcerts, error: errorConcerts } = useNotionData(getConcerts);
  
  // Test récupération des médias
  const { data: medias, loading: loadingMedias, error: errorMedias } = useNotionData(getMedias);
  
  // Test récupération de la presse
  const { data: press, loading: loadingPress, error: errorPress } = useNotionData(getPressArticles);

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>🧪 Test de l'intégration Notion</h1>
      
      {/* Test Concerts */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
        <h2>📅 Agenda ({concerts?.length || 0} concerts)</h2>
        {loadingConcerts && <p>Chargement...</p>}
        {errorConcerts && <p style={{color: 'red'}}>❌ Erreur: {errorConcerts.message}</p>}
        {concerts && concerts.length > 0 && (
          <ul>
            {concerts.slice(0, 3).map(concert => (
              <li key={concert.id}>
                <strong>{concert.title}</strong> - {concert.date} à {concert.location}
              </li>
            ))}
          </ul>
        )}
        {concerts && concerts.length === 0 && <p>✅ Connexion OK mais aucun concert trouvé</p>}
      </section>

      {/* Test Médias */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
        <h2>🎬 Médias ({medias?.length || 0} médias)</h2>
        {loadingMedias && <p>Chargement...</p>}
        {errorMedias && <p style={{color: 'red'}}>❌ Erreur: {errorMedias.message}</p>}
        {medias && medias.length > 0 && (
          <ul>
            {medias.slice(0, 3).map(media => (
              <li key={media.id}>
                <strong>{media.title}</strong> - Type: {media.type}
              </li>
            ))}
          </ul>
        )}
        {medias && medias.length === 0 && <p>✅ Connexion OK mais aucun média trouvé</p>}
      </section>

      {/* Test Presse */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
        <h2>📰 Presse ({press?.length || 0} articles)</h2>
        {loadingPress && <p>Chargement...</p>}
        {errorPress && <p style={{color: 'red'}}>❌ Erreur: {errorPress.message}</p>}
        {press && press.length > 0 && (
          <ul>
            {press.slice(0, 3).map(article => (
              <li key={article.id}>
                "{article.quote.substring(0, 50)}..." - <em>{article.source}</em>
              </li>
            ))}
          </ul>
        )}
        {press && press.length === 0 && <p>✅ Connexion OK mais aucun article trouvé</p>}
      </section>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h3>État de la connexion :</h3>
        <ul>
          <li>Token API : {import.meta.env.VITE_NOTION_API_KEY ? '✅ Configuré' : '❌ Manquant'}</li>
          <li>ID Agenda : {import.meta.env.VITE_NOTION_AGENDA_DB_ID ? '✅ Configuré' : '❌ Manquant'}</li>
          <li>ID Médias : {import.meta.env.VITE_NOTION_MEDIA_DB_ID ? '✅ Configuré' : '❌ Manquant'}</li>
          <li>ID Presse : {import.meta.env.VITE_NOTION_PRESS_DB_ID ? '✅ Configuré' : '❌ Manquant'}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;