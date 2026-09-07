// src/services/biographyService.ts

interface BiographyContent {
  mainBio: string;
  formation: string;
  scenes: string;
  distinctions: string;
  pressCitations: Array<{
    quote: string;
    source: string;
    date?: string;
  }>;
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

// Découpe une citation « texte - Source, année ».
// Le séparateur est un tiret ENTOURÉ D'ESPACES : découper sur n'importe quel
// tiret casse les citations contenant un trait d'union (Marie-Émeraude Alcime,
// Quimper-Karadec…), ce qui tronquait la citation au premier mot composé.
// On retient le DERNIER séparateur espacé, la source venant toujours en fin.
function parseCitation(plainText: string): { quote: string; source: string; date?: string } | null {
  const cleanText = plainText.replace(/["“”„«»‘’]/g, '').trim();
  if (!cleanText) return null;

  const sep = /\s[-–—]\s/g;
  let lastIndex = -1, lastLength = 0, m: RegExpExecArray | null;
  while ((m = sep.exec(cleanText)) !== null) {
    lastIndex = m.index;
    lastLength = m[0].length;
  }

  let quote = cleanText;
  let after = '';
  if (lastIndex !== -1) {
    quote = cleanText.substring(0, lastIndex).trim();
    after = cleanText.substring(lastIndex + lastLength).trim();
  }

  if (!quote) return null;
  if (!after) return { quote, source: 'Source non spécifiée', date: undefined };

  const commaIndex = after.indexOf(',');
  if (commaIndex === -1) return { quote, source: after, date: undefined };
  return {
    quote,
    source: after.substring(0, commaIndex).trim(),
    date: after.substring(commaIndex + 1).trim(),
  };
}

// Fonction pour récupérer et parser la page Biographie
export async function getBiographyContent(): Promise<BiographyContent> {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend-site-marie-emeraude.matta971.workers.dev/api';
  
  try {
    const response = await fetch(`${API_URL}/biography`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la biographie');
    }
    
    const data = await response.json();
    return parseBiographyBlocks(data.blocks);
  } catch (error) {
    console.error('Erreur:', error);
    // Retourner des valeurs par défaut
    return {
      mainBio: '',
      formation: '',
      scenes: '',
      distinctions: '',
      pressCitations: []
    };
  }
}

// Parser les blocks Notion en sections avec mise en forme
function parseBiographyBlocks(blocks: any[]): BiographyContent {
  const content: BiographyContent = {
    mainBio: '',
    formation: '',
    scenes: '',
    distinctions: '',
    pressCitations: []
  };
  
  let currentSection = 'main';
  
  blocks.forEach(block => {
    // Détecter les sections par les titres
    if (block.type === 'heading_1' || block.type === 'heading_2') {
      const title = block[block.type].rich_text[0]?.plain_text.toLowerCase() || '';
      
      if (title.includes('formation')) {
        currentSection = 'formation';
      } else if (title.includes('scène') || title.includes('collaboration')) {
        currentSection = 'scenes';
      } else if (title.includes('prix') || title.includes('distinction')) {
        currentSection = 'distinctions';
      } else if (title.includes('citation') || title.includes('presse')) {
        currentSection = 'citations';
      }
    }
    
    // Traiter les paragraphes avec rich text
    else if (block.type === 'paragraph') {
      const html = richTextToHtml(block.paragraph.rich_text);
      
      if (html.trim()) {
        switch (currentSection) {
          case 'main':
            content.mainBio += html + '<br/><br/>';
            break;
          case 'formation':
            content.formation += html + '<br/><br/>';
            break;
          case 'scenes':
            content.scenes += html + '<br/><br/>';
            break;
          case 'distinctions':
            content.distinctions += html + '<br/><br/>';
            break;
          case 'citations': {
            const plainText = block.paragraph.rich_text
              .map((t: any) => t.plain_text)
              .join('');
            const parsed = parseCitation(plainText);
            if (parsed) content.pressCitations.push(parsed);
          }
            break;
        }
      }
    }
    
    // Traiter les listes à puces
    else if (block.type === 'bulleted_list_item') {
      const html = '• ' + richTextToHtml(block.bulleted_list_item.rich_text);
      
      switch (currentSection) {
        case 'formation':
          content.formation += html + '<br/>';
          break;
        case 'scenes':
          content.scenes += html + '<br/>';
          break;
        case 'distinctions':
          content.distinctions += html + '<br/>';
          break;
      }
    }
    
    // Traiter les listes numérotées
    else if (block.type === 'numbered_list_item') {
      const html = richTextToHtml(block.numbered_list_item.rich_text);
      
      switch (currentSection) {
        case 'formation':
          content.formation += html + '<br/>';
          break;
        case 'scenes':
          content.scenes += html + '<br/>';
          break;
        case 'distinctions':
          content.distinctions += html + '<br/>';
          break;
      }
    }
    
    // Traiter les citations (quotes)
    else if (block.type === 'quote') {
      const plainText = block.quote.rich_text
        .map((t: any) => t.plain_text)
        .join('');
      
      if (currentSection === 'citations' && plainText) {
        const parsed = parseCitation(plainText);
        if (parsed) content.pressCitations.push(parsed);
      }
    }
  });
  
  return content;
}

// === WORKER.JS - Ajouter cette route dans votre worker Cloudflare ===

/*
async function getBiography(env) {
  // Récupérer les blocks de la page
  const response = await fetch(`https://api.notion.com/v1/blocks/${env.NOTION_BIOGRAPHY_PAGE_ID}/children`, {
    headers: {
      'Authorization': `Bearer ${env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
    },
  });

  const data = await response.json();
  return { blocks: data.results };
}

// Dans le router, ajouter :
if (url.pathname === '/api/biography') {
  const data = await getBiography(env);
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}
*/