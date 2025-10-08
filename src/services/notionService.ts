// src/services/notionService.ts - VERSION FINALE
import type { 
  ConcertData, 
  MediaData, 
  PressData, 
  RepertoireData, 
  TestimonialData 
} from '../types/notion.types';

// URL du backend
const API_URL = (import.meta.env.PROD || import.meta.env.DEV)
  ? 'https://backend-site-marie-emeraude.matta971.workers.dev/api'  // Remplacez par votre URL Worker
  : 'http://localhost:3001/api';  // Backend local pour le développement


// Cache simple
const cache: Map<string, { data: any; timestamp: number }> = new Map();
const CACHE_TTL = 300000; // 5 minutes

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function getFutureConcerts(): Promise<ConcertData[]> {
  console.log('📅 Récupération des concerts...');
  const cached = getCached<ConcertData[]>('concerts');
  if (cached) {
    console.log('📅 Concerts depuis le cache');
    return cached;
  }

  try {
    const response = await fetch(`${API_URL}/concerts`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const concerts = await response.json();
    
    // Filtrer uniquement les concerts futurs
    const futureConcerts = concerts.filter(
      (concert: ConcertData) => concert.date && new Date(concert.date) >= new Date()
    );

    console.log(`✅ ${futureConcerts.length} concerts futurs trouvés`);
    setCache('futureConcerts', futureConcerts);
    return futureConcerts;
  } catch (error) {
    console.error('❌ Erreur récupération concerts:', error);
    return [];
  }
}

// ============= RÉCUPÉRER L'AGENDA =============
export async function getConcerts(): Promise<ConcertData[]> {
  console.log('📅 Récupération des concerts...');
  const cached = getCached<ConcertData[]>('concerts');
  if (cached) {
    console.log('📅 Concerts depuis le cache');
    return cached;
  }

  try {
    const response = await fetch(`${API_URL}/concerts`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const concerts = await response.json();

    console.log(`✅ ${concerts.length} concerts trouvés`);
    setCache('concerts', concerts);
    return concerts;
  } catch (error) {
    console.error('❌ Erreur récupération concerts:', error);
    return [];
  }
}

// ============= RÉCUPÉRER LES MÉDIAS =============
export async function getMedias(): Promise<MediaData[]> {
  console.log('🎬 Récupération des médias...');
  const cached = getCached<MediaData[]>('medias');
  if (cached) return cached;

  try {
    const response = await fetch(`${API_URL}/medias`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const medias = await response.json();
    console.log(`✅ ${medias.length} médias trouvés`);
    setCache('medias', medias);
    return medias;
  } catch (error) {
    console.error('❌ Erreur récupération médias:', error);
    return [];
  }
}

// ============= RÉCUPÉRER LA PRESSE =============
export async function getPressArticles(): Promise<PressData[]> {
  console.log('📰 Récupération de la presse...');
  const cached = getCached<PressData[]>('press');
  if (cached) return cached;

  try {
    const response = await fetch(`${API_URL}/press`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const articles = await response.json();
    console.log(`✅ ${articles.length} articles trouvés`);
    setCache('press', articles);
    return articles;
  } catch (error) {
    console.error('❌ Erreur récupération presse:', error);
    return [];
  }
}

// ============= RÉCUPÉRER LE RÉPERTOIRE =============
export async function getRepertoire(): Promise<RepertoireData[]> {
  console.log('🎭 Récupération du répertoire...');
  const cached = getCached<RepertoireData[]>('repertoire');
  if (cached) return cached;

  try {
    // Vous devrez ajouter cette route dans server.js
    const response = await fetch(`${API_URL}/repertoire`);
    if (!response.ok) {
      // Si la route n'existe pas encore, retourner un tableau vide
      console.log('Route répertoire pas encore implémentée');
      return [];
    }
    
    const repertoire = await response.json();
    console.log(`✅ ${repertoire.length} œuvres trouvées`);
    setCache('repertoire', repertoire);
    return repertoire;
  } catch (error) {
    console.error('❌ Erreur récupération répertoire:', error);
    return [];
  }
}

// ============= RÉCUPÉRER LES TÉMOIGNAGES =============
export async function getTestimonials(): Promise<TestimonialData[]> {
  console.log('💬 Récupération des témoignages...');
  const cached = getCached<TestimonialData[]>('testimonials');
  if (cached) return cached;

  try {
    // Vous devrez ajouter cette route dans server.js
    const response = await fetch(`${API_URL}/testimonials`);
    if (!response.ok) {
      console.log('Route témoignages pas encore implémentée');
      return [];
    }
    
    const testimonials = await response.json();
    console.log(`✅ ${testimonials.length} témoignages trouvés`);
    setCache('testimonials', testimonials);
    return testimonials;
  } catch (error) {
    console.error('❌ Erreur récupération témoignages:', error);
    return [];
  }
}

// ============= RÉCUPÉRER LA BIOGRAPHIE =============
export async function getBiography(): Promise<string> {
  console.log('📝 Récupération de la biographie...');
  const cached = getCached<string>('biography');
  if (cached) return cached;

  try {
    const response = await fetch(`${API_URL}/biography`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Biographie récupérée');
    setCache('biography', data.content);
    return data.content;
  } catch (error) {
    console.error('❌ Erreur récupération biographie:', error);
    return '<p>Erreur lors du chargement de la biographie.</p>';
  }
}

// ============= RÉCUPÉRER LES SERVICES =============
export async function getServices(): Promise<string> {
  console.log('🎯 Récupération des services...');
  const cached = getCached<string>('services');
  if (cached) return cached;

  try {
    // Vous devrez ajouter cette route dans server.js
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
      console.log('Route services pas encore implémentée');
      return '<p>Services à venir...</p>';
    }
    
    const data = await response.json();
    console.log('✅ Services récupérés');
    setCache('services', data.content);
    return data.content;
  } catch (error) {
    console.error('❌ Erreur récupération services:', error);
    return '<p>Erreur lors du chargement des services.</p>';
  }
}

// ============= CLEAR CACHE =============
export function clearCache(): void {
  cache.clear();
  console.log('🗑️ Cache vidé');
}