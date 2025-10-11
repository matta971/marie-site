// src/services/homePageService.ts

interface HomePageContent {
  hero: {
    name: string;
    title: string;
  };
  services: string[];
  servicesLink: string;
  featuredMedias: Array<{
    title: string;
    subtitle: string;
    link: string;
    image: string;
    type: string;
    duration?: string;
  }>;
  mediasLink: string;
  biography: {
    text: string;
    link: string;
  };
}

// Fonction pour convertir les rich text Notion en HTML
function richTextToHtml(richTextArray: any[]): string {
  if (!richTextArray || richTextArray.length === 0) return '';
  
  return richTextArray.map(text => {
    let html = text.plain_text;
    
    // Appliquer les styles
    if (text.annotations) {
      if (text.annotations.bold) {
        html = `<strong>${html}</strong>`;
      }
      if (text.annotations.italic) {
        html = `<em>${html}</em>`;
      }
      if (text.annotations.underline) {
        html = `<u>${html}</u>`;
      }
      if (text.annotations.strikethrough) {
        html = `<s>${html}</s>`;
      }
      if (text.annotations.code) {
        html = `<code>${html}</code>`;
      }
    }
    
    // Gérer les liens
    if (text.href) {
      html = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${html}</a>`;
    }
    
    return html;
  }).join('');
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend-site-marie-emeraude.matta971.workers.dev/api';
  
  try {
    const response = await fetch(`${API_URL}/homepage`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la page d\'accueil');
    }
    
    const data = await response.json();
    return parseHomePageBlocks(data.blocks);
  } catch (error) {
    console.error('Erreur:', error);
    // Retourner des valeurs par défaut
    return {
      hero: {
        name: 'Marie-Émeraude Alcime',
        title: 'Artiste lyrique'
      },
      services: ['OPERA & ORATORIO', 'CONCERT RECITAL', 'COURS MASTER CLASSE'],
      servicesLink: '/contact',
      featuredMedias: [],
      mediasLink: '/medias',
      biography: {
        text: '',
        link: '/biographie'
      }
    };
  }
}

function parseHomePageBlocks(blocks: any[]): HomePageContent {
  const content: HomePageContent = {
    hero: {
      name: '',
      title: ''
    },
    services: [],
    servicesLink: '',
    featuredMedias: [],
    mediasLink: '',
    biography: {
      text: '',
      link: ''
    }
  };
  
  let currentSection = '';
  //let currentSubsection = '';
  let nextIsName = false;
  let nextIsTitle = false;
  let nextIsLink = false;
  
  // Première passe : identifier les sections et collecter les paragraphes de biographie
  const biographyParagraphs: string[] = [];
  let inBiographySection = false;
  let biographyLinkFound = false;
  
  blocks.forEach((block) => {
    // Détecter les sections principales
    if (block.type === 'heading_1') {
      const title = block.heading_1.rich_text[0]?.plain_text.toLowerCase() || '';
      
      if (title.includes('bandeau') || title.includes('hero') || title.includes('accueil')) {
        currentSection = 'hero';
        inBiographySection = false;
      } else if (title.includes('service')) {
        currentSection = 'services';
        inBiographySection = false;
      } else if (title.includes('média') || title.includes('media')) {
        currentSection = 'medias';
        inBiographySection = false;
      } else if (title.includes('biographie') || title.includes('bio')) {
        currentSection = 'biography';
        inBiographySection = true;
      }
    }
    
    // Détecter les sous-sections
    else if (block.type === 'heading_2') {
      const subtitle = block.heading_2.rich_text[0]?.plain_text.toLowerCase() || '';
      //currentSubsection = subtitle;
      
      // Marquer ce qu'on doit récupérer au prochain paragraphe
      if (subtitle.includes('nom') || subtitle.includes('name')) {
        nextIsName = true;
      } else if (subtitle.includes('métier') || subtitle.includes('title') || subtitle.includes('profession')) {
        nextIsTitle = true;
      } else if (subtitle.includes('lien') || subtitle.includes('link')) {
        nextIsLink = true;
        if (currentSection === 'biography') {
          biographyLinkFound = true;
          inBiographySection = false; // Arrêter de collecter les paragraphes de bio après le lien
        }
      }
    }
    
    // Traiter les paragraphes avec mise en forme HTML
    else if (block.type === 'paragraph') {
      const html = richTextToHtml(block.paragraph.rich_text);
      const plainText = block.paragraph.rich_text
        .map((t: any) => t.plain_text)
        .join('').trim();
      
      if (plainText) {
        // Hero section - nom et titre (pas de HTML nécessaire ici)
        if (nextIsName) {
          content.hero.name = plainText;
          nextIsName = false;
        }
        else if (nextIsTitle) {
          content.hero.title = plainText;
          nextIsTitle = false;
        }
        // Links (pas de HTML nécessaire)
        else if (nextIsLink) {
          if (currentSection === 'services') {
            content.servicesLink = plainText.includes('http') 
              ? new URL(plainText).pathname 
              : plainText;
          }
          else if (currentSection === 'medias') {
            content.mediasLink = plainText.includes('http') 
              ? new URL(plainText).pathname 
              : plainText;
          }
          else if (currentSection === 'biography') {
            content.biography.link = plainText.includes('http') 
              ? new URL(plainText).pathname 
              : plainText;
          }
          nextIsLink = false;
        }
        // Collecter les paragraphes de biographie
        else if (inBiographySection && !biographyLinkFound) {
          biographyParagraphs.push(html);
        }
      }
    }
    
    // Traiter les listes (services)
    else if (block.type === 'bulleted_list_item' && currentSection === 'services') {
      const text = block.bulleted_list_item.rich_text
        .map((t: any) => t.plain_text)
        .join('').trim();
      
      if (text) {
        content.services.push(text);
      }
    }
  });
  
  // Construire le texte de biographie en préservant la structure de paragraphes
  // On utilise un seul saut de ligne entre les paragraphes pour respecter la mise en page Notion
  if (biographyParagraphs.length > 0) {
    content.biography.text = biographyParagraphs.join('<br/><br/>');
  }
  
  // Valeurs par défaut si rien n'est trouvé
  if (!content.hero.name) content.hero.name = 'Marie-Émeraude Alcime';
  if (!content.hero.title) content.hero.title = 'Artiste lyrique';
  if (!content.servicesLink) content.servicesLink = '/contact';
  if (!content.mediasLink) content.mediasLink = '/medias';
  if (!content.biography.link) content.biography.link = '/biographie';
  
  return content;
}

// === AJOUTER DANS WORKER.JS ===
/*
async function getHomePage(env) {
  const response = await fetch(`https://api.notion.com/v1/blocks/${env.NOTION_HOME_PAGE_ID}/children`, {
    headers: {
      'Authorization': `Bearer ${env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
    },
  });

  const data = await response.json();
  return { blocks: data.results };
}

// Dans le router:
if (url.pathname === '/api/homepage') {
  const data = await getHomePage(env);
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}
*/