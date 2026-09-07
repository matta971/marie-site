// Fuseau des lieux de concert. Les dates Notion portent leur décalage
// (ex. 2026-10-03T16:30:00+02:00) ; sans `timeZone` explicite, toLocale*
// convertit dans le fuseau du VISITEUR, ce qui décale l'heure et parfois
// le jour. On épingle donc l'affichage sur l'heure du lieu.
// À revoir si un concert a lieu hors de France métropolitaine (Guadeloupe…) :
// il faudrait alors un fuseau par événement.
export const VENUE_TIME_ZONE = 'Europe/Paris';

// Fonction pour formater les dates
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  // Créer l'objet Date
  const date = new Date(dateString);
  
  // Options pour le format français
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: VENUE_TIME_ZONE
  };
  
  // Si l'heure est présente (format avec T)
  if (dateString.includes('T')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('fr-FR', options);
}

/**
 * Formate une date au format long français (ex: 18 janvier 2024)
 */
export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    timeZone: VENUE_TIME_ZONE
  };
  return date.toLocaleDateString('fr-FR', options);
};


// Fonction pour obtenir juste le jour et le mois
/*function formatDayMonth(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()
  };
}*/

/**
 * Formate une date au format mois/année (ex: janvier 2024)
 */
export const formatMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    year: 'numeric',
    timeZone: VENUE_TIME_ZONE
  };
  return date.toLocaleDateString('fr-FR', options);
};

/**
 * Vérifie si une date est dans le futur
 */
export const isFutureDate = (dateString: string): boolean => {
  return new Date(dateString) >= new Date();
};

/**
 * Trie des dates en ordre chronologique
 */
export const sortByDate = <T extends { date: string }>(
  items: T[], 
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

// Fonction pour obtenir le mois d'une date
export const getMonth = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { month: 'long', timeZone: VENUE_TIME_ZONE });
};

// Fonction pour obtenir l'année d'une date
export const getYear = (dateString: string): string => {
  // getFullYear() lit le fuseau du visiteur : on formate explicitement.
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    timeZone: VENUE_TIME_ZONE
  }).format(new Date(dateString));
};