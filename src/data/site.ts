import type { EventItem } from '../components/EventTable'


export const videos = [
{ title: "Ponchielli — Voce di donna o d'angelo (La Cieca)", url: 'https://www.youtube.com/embed/hCBhh4J9J_8' },
{ title: 'Rossini — Di tanti palpiti (Tancredi)', url: 'https://www.youtube.com/embed/7LEYnKna9XU' },
{ title: "Verdi — Ulrica, Re dell'abisso (Il ballo in maschera)", url: 'https://www.youtube.com/embed/gM1b4WjahMI' },
{ title: "Interview — Talents d'Outre-Mer (INAUG)", url: 'https://www.youtube.com/embed/_S2GjuBozJg' },
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