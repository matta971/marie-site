// src/types/notion.types.ts

export interface ConcertData {
  id: string;
  date: string;
  title: string;
  location: string;
  ville?: string;  
  role?: string;
  description: string;
  type: 'concert' | 'recital' | 'opera' | 'masterclass';
  ticketLink?: string;
  display: boolean;
}

export interface MediaData {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'photo';
  url: string;
  description: string;
  date: string;
  featured: boolean;
  order: number;
}

export interface PressData {
  id: string;
  quote: string;
  source: string;
  author?: string;
  date: string;
  articleLink?: string;
  type: 'critique' | 'interview' | 'mention';
  display: boolean;
}

export interface RepertoireData {
  id: string;
  work: string;
  composer: string;
  role: string;
  type: 'opera' | 'oratorio' | 'melodie' | 'sacred';
  year: string;
  venue: string;
  language: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  text: string;
  function: string;
  type: 'student' | 'colleague' | 'organizer';
  date: string;
  display: boolean;
  pages: string[];
}