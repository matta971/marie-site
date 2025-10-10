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
          case 'citations':
            // Parser les citations en gérant les guillemets stylisés
            const plainText = block.paragraph.rich_text
              .map((t: any) => t.plain_text)
              .join('');
            
            // Retirer TOUS les types de guillemets
            // \u201C = " (left double quotation mark)
            // \u201D = " (right double quotation mark)
            // \u201E = „ (double low quotation mark)
            // \u2018 = ' (left single quotation mark)
            // \u2019 = ' (right single quotation mark)
            const cleanText = plainText.replace(/["\u201C\u201D\u201E«»\u2018\u2019''""]/g, '').trim();
            
            // Ensuite, parser avec le tiret comme séparateur
            const parts = cleanText.split(/[-–—]/);
            
            if (parts.length >= 2) {
              const quotePart = parts[0].trim();
              const afterDash = parts.slice(1).join('-').trim();
              
              // Séparer source et date par la virgule
              const commaIndex = afterDash.indexOf(',');
              let source = afterDash;
              let date = undefined;
              
              if (commaIndex !== -1) {
                source = afterDash.substring(0, commaIndex).trim();
                date = afterDash.substring(commaIndex + 1).trim();
              }
              
              if (quotePart) {
                content.pressCitations.push({
                  quote: quotePart,
                  source: source,
                  date: date
                });
              }
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
        // Retirer TOUS les guillemets avec les codes Unicode
        const cleanText = plainText.replace(/["\u201C\u201D\u201E«»\u2018\u2019''""]/g, '').trim();
        
        // Parser avec le tiret comme séparateur
        const parts = cleanText.split(/[-–—]/);
        
        if (parts.length >= 2) {
          const quotePart = parts[0].trim();
          const afterDash = parts.slice(1).join('-').trim();
          
          // Séparer source et date par la virgule
          const commaIndex = afterDash.indexOf(',');
          let source = afterDash;
          let date = undefined;
          
          if (commaIndex !== -1) {
            source = afterDash.substring(0, commaIndex).trim();
            date = afterDash.substring(commaIndex + 1).trim();
          }
          
          if (quotePart) {
            content.pressCitations.push({
              quote: quotePart,
              source: source,
              date: date
            });
          }
        } else if (cleanText) {
          // Si pas de tiret, tout est la citation
          content.pressCitations.push({
            quote: cleanText,
            source: 'Source non spécifiée',
            date: undefined
          });
        }
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