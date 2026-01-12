
import { Member, Region, ProgramSection } from '@/types';

export const partyInfo = {
  name: 'A.R.M',
  fullName: 'Alliance pour le Rassemblement Malien',
  motto: 'Fraternité, Liberté, Égalité',
  headquarters: 'Bamako Sebenikoro, Rue 530, Porte 245, Bamako, Mali',
  logoUrl: require('@/assets/images/7e73e0b0-2f6e-4e4a-8e54-90f56c6ad035.jpeg'),
  memberCardUrl: 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/55473c00-599f-407b-bc95-90b287ec127f/assets/images/370e6be6-546e-4856-bf04-88c1d541b55f.png?AWSAccessKeyId=AKIAVRUVRKQJC5DISQ4Q&Signature=kiixdJqiTbPZDwCQgMwXKmiHfgQ%3D&Expires=1766050335',
};

export const members: Member[] = [
  {
    id: '1',
    name: 'Lassine Diakité',
    role: 'Président',
    location: 'Avenida Castilla la Mancha 122, Yuncos, Toledo, Espagne',
    phone: '+34 632 607 101',
  },
  {
    id: '2',
    name: 'Dadou Sangare',
    role: 'Premier Vice-Président',
    location: 'Milan, Italie',
    phone: 'À venir',
  },
  {
    id: '3',
    name: 'Oumar Keita',
    role: 'Deuxième Vice-Président',
    location: 'Koutiala, Mali',
    phone: '+223 76 30 48 69',
  },
  {
    id: '4',
    name: 'Karifa Keita',
    role: 'Secrétaire Général',
    location: 'Bamako, Mali',
    phone: 'À venir',
  },
  {
    id: '5',
    name: 'Modibo Keita',
    role: 'Secrétaire Administratif',
    location: 'Bamako Sebenikoro, Mali',
    phone: 'À venir',
  },
  {
    id: '6',
    name: 'Sokona Keita',
    role: 'Trésorière',
    location: 'Bamako Sebenikoro, Mali',
    phone: '+223 75 17 99 20',
  },
];

export const regions: Region[] = [
  {
    id: '1',
    name: 'District de Bamako',
    cercles: ['Commune I', 'Commune II', 'Commune III', 'Commune IV', 'Commune V', 'Commune VI'],
    communes: ['Sebenikoro', 'Badalabougou', 'Hippodrome', 'Lafiabougou', 'Magnambougou'],
  },
  {
    id: '2',
    name: 'Kayes',
    cercles: ['Bafoulabé', 'Diéma', 'Kéniéba', 'Kita', 'Nioro du Sahel', 'Yélimané'],
    communes: [],
  },
  {
    id: '3',
    name: 'Koulikoro',
    cercles: ['Banamba', 'Dioïla', 'Kangaba', 'Kati', 'Kolokani', 'Nara', 'Ouelessebougou'],
    communes: [],
  },
  {
    id: '4',
    name: 'Sikasso',
    cercles: ['Bougouni', 'Kolondiéba', 'Kadiolo', 'Koutiala', 'Sikasso', 'Yanfolila', 'Yorosso'],
    communes: [],
  },
  {
    id: '5',
    name: 'Ségou',
    cercles: ['Barouéli', 'Bla', 'Macina', 'Niono', 'San', 'Ségou', 'Tominian'],
    communes: [],
  },
  {
    id: '6',
    name: 'Mopti',
    cercles: ['Bandiagara', 'Bankass', 'Djenné', 'Douentza', 'Koro', 'Mopti', 'Tenenkou', 'Youwarou'],
    communes: [],
  },
  {
    id: '7',
    name: 'Tombouctou',
    cercles: ['Diré', 'Goundam', 'Gourma-Rharous', 'Niafunké', 'Tombouctou'],
    communes: [],
  },
  {
    id: '8',
    name: 'Gao',
    cercles: ['Ansongo', 'Bourem', 'Gao', 'Ménaka'],
    communes: [],
  },
  {
    id: '9',
    name: 'Kidal',
    cercles: ['Abeïbara', 'Kidal', 'Tessalit', 'Tin-Essako'],
    communes: [],
  },
];

export const programSections: ProgramSection[] = [
  {
    id: '1',
    title: 'Santé',
    description: 'Améliorer l\'accès aux soins de santé pour tous les Maliens avec des infrastructures modernes et un personnel qualifié.',
    icon: 'medical-services',
  },
  {
    id: '2',
    title: 'Éducation',
    description: 'Garantir une éducation de qualité accessible à tous, de la maternelle à l\'université.',
    icon: 'school',
  },
  {
    id: '3',
    title: 'Emploi',
    description: 'Créer des opportunités d\'emploi pour les jeunes et soutenir l\'entrepreneuriat local.',
    icon: 'work',
  },
  {
    id: '4',
    title: 'Agriculture',
    description: 'Moderniser l\'agriculture et soutenir les agriculteurs avec des technologies et des formations.',
    icon: 'agriculture',
  },
  {
    id: '5',
    title: 'Intégrité Territoriale',
    description: 'Protéger et préserver l\'intégrité du territoire malien.',
    icon: 'map',
  },
  {
    id: '6',
    title: 'Infrastructures',
    description: 'Développer les infrastructures routières, énergétiques et de télécommunications.',
    icon: 'construction',
  },
  {
    id: '7',
    title: 'Réconciliation',
    description: 'Promouvoir la paix et la réconciliation nationale entre toutes les communautés.',
    icon: 'handshake',
  },
  {
    id: '8',
    title: 'Diaspora',
    description: 'Renforcer les liens avec la diaspora malienne et faciliter leur contribution au développement.',
    icon: 'public',
  },
  {
    id: '9',
    title: 'Défense Militaire',
    description: 'Renforcer les capacités de défense et de sécurité du pays.',
    icon: 'shield',
  },
  {
    id: '10',
    title: 'Lutte contre la Corruption',
    description: 'Établir des mécanismes transparents pour combattre la corruption à tous les niveaux.',
    icon: 'gavel',
  },
  {
    id: '11',
    title: 'Réforme de l\'État',
    description: 'Moderniser l\'administration publique pour plus d\'efficacité et de transparence.',
    icon: 'account-balance',
  },
  {
    id: '12',
    title: 'AES (Alliance des États du Sahel)',
    description: 'Renforcer la coopération régionale au sein de l\'Alliance des États du Sahel.',
    icon: 'groups',
  },
];
