import type { EventItem } from '../components/EventTable'
import type { MediaData } from '../types/notion.types'


export const videos = [
{ title: "Voce di donna o d'angelo, La Cieca (Ponchielli)", url: 'https://www.youtube.com/embed/hCBhh4J9J_8' },
{ title: 'Di tanti palpiti, Tancredi (Rossini)', url: 'https://www.youtube.com/embed/7LEYnKna9XU' },
{ title: "Ulrica, Re dell'abisso, Il ballo in maschera (Verdi)", url: 'https://www.youtube.com/embed/gM1b4WjahMI' },
{ title: "Interview, Talents d'Outre-Mer (INAUG)", url: 'https://www.youtube.com/embed/_S2GjuBozJg' },
] as const


export const press = [
{
outlet: 'Forum Opéra',
quote: '« Une mention pour la (trop) brève intervention de la Voix de la Mère … touchante et d’une réelle beauté. »',
link: 'https://www.forumopera.com/spectacle/les-contes-dhoffmann-metz-gloire-a-la-muse-et-aux-seconds-roles/',
},
{
outlet: 'Olyrix',
quote: "Interprétation remarquée du 'Eia Mater, fons amoris' (Stabat Mater) pour son intensité expressive.",
link: 'https://www.olyrix.com/articles/production/1953/un-stabat-mater-de-pergolese-intime-en-la-cathedrale-de-metz-maitrise-choeur-opera-theatre-metz-marmeuse-thema-orchestre-national-lorraine-7-avril-2018-article-critique-chronique-compte-rendu',
},
] as const


export const badges = [
{ label: 'Operabase (Mezzo-soprano)', url: 'https://www.operabase.com/marie-emeraude-alcime-a74356/en' },
{ label: 'Opéra-Théâtre de Metz (Chœur)', url: 'https://opera.eurometropolemetz.eu/fr/l-equipe.html' },
{ label: 'Master-class (Guadeloupe)', url: 'https://www.lemoule.fr/images/Images/Actu/2016/pdf/Dossier_de_presse_Master_Class_Lyrique.pdf' },
{ label: 'Forum Opéra (Critiques)', url: 'https://www.forumopera.com/artiste/alcime-marie-emeraude/' },
{ label: 'Il Trittico (Opera-Online)', url: 'https://www.opera-online.com/en/items/productions/il-trittico-opera-theatre-metz-metropole-2016-2016' },
] as const


export const pastEvents: EventItem[] = [
{ date: '18 janv. 2020', work: 'La vie parisienne (Offenbach)', role: 'Madame de Quimper-Karadec', place: 'Opéra de Massy', city: 'Massy (FR)' },
{ date: '22 déc. 2019', work: 'La vie parisienne (Offenbach)', role: 'Madame de Quimper-Karadec', place: 'Opéra-Théâtre de Metz Métropole', city: 'Metz (FR)' },
{ date: '16 juin 2017', work: 'Les Contes d’Hoffmann (Offenbach)', role: 'Voix de la Mère', place: 'Opéra-Théâtre de Metz Métropole', city: 'Metz (FR)' },
{ date: '2016', work: 'Il Trittico (Puccini)', role: 'Distribution chorale', place: 'Opéra-Théâtre de Metz Métropole', city: 'Metz (FR)' },
]

// Galerie photos de repli : utilisée tant que la base Notion « Médias »
// ne contient aucune entrée de type « photo ».
export const galleryPhotos: MediaData[] = [
{ id: 'photo-01', title: 'Sur scène', type: 'photo', url: '/images/galerie/01-titanic-scene.jpg', description: 'Marie-Émeraude Alcime en scène', date: '', featured: true, order: 101 },
{ id: 'photo-02', title: 'En coulisses', type: 'photo', url: '/images/galerie/02-titanic-coulisses.jpg', description: "Avant l'entrée en scène", date: '', featured: false, order: 102 },
{ id: 'photo-03', title: 'Sur le plateau', type: 'photo', url: '/images/galerie/03-titanic-plateau.jpg', description: 'Répétition sur le plateau', date: '', featured: false, order: 103 },
{ id: 'photo-04', title: 'Salut final', type: 'photo', url: '/images/galerie/04-titanic-salut.jpg', description: "Salut final avec l'ensemble de la distribution", date: '', featured: false, order: 104 },
{ id: 'photo-05', title: 'Portrait de scène', type: 'photo', url: '/images/galerie/05-portrait-costume.jpg', description: 'Portrait en costume', date: '', featured: true, order: 105 },
{ id: 'photo-06', title: 'Répétition au piano', type: 'photo', url: '/images/galerie/06-repetition-piano.jpg', description: 'Répétition, partitions au piano', date: '', featured: false, order: 106 },
{ id: 'photo-07', title: 'En scène', type: 'photo', url: '/images/galerie/07-portrait-scene.jpg', description: 'Portrait en scène', date: '', featured: false, order: 107 },
{ id: 'photo-08', title: 'Concert en plein air', type: 'photo', url: '/images/galerie/08-concert-duo.jpg', description: 'Duo en concert', date: '', featured: false, order: 108 },
{ id: 'photo-09', title: 'BellissiMetz', type: 'photo', url: '/images/galerie/09-bellissimetz.jpg', description: 'Concert BellissiMetz, place de la cathédrale de Metz', date: '', featured: true, order: 109 },
{ id: 'photo-10', title: 'Costume créole', type: 'photo', url: '/images/galerie/10-costume-creole.jpg', description: 'Portrait en costume créole', date: '', featured: false, order: 110 },
{ id: 'photo-11', title: 'Costume créole II', type: 'photo', url: '/images/galerie/11-costume-creole-2.jpg', description: 'Portrait en costume créole', date: '', featured: false, order: 111 },
{ id: 'photo-12', title: 'Aida, en coulisses', type: 'photo', url: '/images/galerie/12-aida-coulisses.jpg', description: 'En coulisses avant Aida', date: '', featured: false, order: 112 },
{ id: 'photo-13', title: 'Aida, le chœur', type: 'photo', url: '/images/galerie/13-aida-choeur.jpg', description: "Le chœur d'Aida sur le plateau", date: '', featured: false, order: 113 },
]
