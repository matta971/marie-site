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
    year: 'numeric'
  };
  
  // Si l'heure est présente (format avec T)
  if (dateString.includes('T')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('fr-FR', options);
}

// Fonction pour obtenir juste le jour et le mois
/*function formatDayMonth(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()
  };
}*/