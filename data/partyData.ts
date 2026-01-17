
import { Member, Region, ProgramSection } from '@/types';

export const partyInfo = {
  name: 'A.R.M',
  fullName: 'Alliance pour le Rassemblement Malien',
  motto: 'Fraternité, Liberté, Égalité',
  headquarters: 'Bamako Sebenikoro, Rue 530, Porte 245, Bamako, Mali',
  logoUrl: require('@/assets/images/7e73e0b0-2f6e-4e4a-8e54-90f56c6ad035.jpeg'),
  memberCardUrl: 'https://prod-finalquest-user-projects-storage-bucket-aws.s3.amazonaws.com/user-projects/55473c00-599f-407b-bc95-90b287ec127f/assets/images/370e6be6-546e-4856-bf04-88c1d541b55f.png?AWSAccessKeyId=AKIAVRUVRKQJC5DISQ4Q&Signature=kiixdJqiTbPZDwCQgMwXKmiHfgQ%3D&Expires=1766050335',
  vision: 'Le parti A.R.M – Alliance Pour le Rassemblement Malien se positionne comme un acteur politique engagé pour un Mali réconcilié, prospère et souverain. Nous aspirons à un changement profond, incarnant le projet du Mali Koura, symbolisant un renouveau total pour notre nation.',
  contact: {
    phone: '+34 632 60 71 01',
    email: 'bouadiakite@gmail.com',
  },
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
    title: 'Sécurité et Défense',
    description: 'Renforcer les capacités de défense et de sécurité du pays.',
    icon: 'shield',
    details: [
      {
        subtitle: 'Renforcement des Forces Armées',
        content: 'Augmenter le budget de la défense pour moderniser l\'équipement militaire et améliorer les conditions de vie des soldats.',
      },
      {
        subtitle: 'Lutte contre le Terrorisme',
        content: 'Renforcer la coopération avec les pays voisins et les partenaires internationaux pour éradiquer les groupes terroristes.',
      },
      {
        subtitle: 'Sécurisation des Frontières',
        content: 'Mettre en place des postes de contrôle supplémentaires et utiliser des technologies modernes pour surveiller les frontières.',
      },
    ],
  },
  {
    id: '2',
    title: 'Santé',
    description: 'Améliorer l\'accès aux soins de santé pour tous les Maliens.',
    icon: 'medical-services',
    details: [
      {
        subtitle: 'Accès aux Soins',
        content: 'Construire de nouveaux centres de santé dans les zones rurales et subventionner les soins pour les populations vulnérables.',
      },
      {
        subtitle: 'Formation du Personnel Médical',
        content: 'Envoyer des professionnels de santé en formation continue et attirer des médecins étrangers pour combler le déficit.',
      },
      {
        subtitle: 'Prévention des Maladies',
        content: 'Lancer des campagnes de vaccination et de sensibilisation pour lutter contre les maladies endémiques.',
      },
    ],
  },
  {
    id: '3',
    title: 'Éducation et Formation',
    description: 'Garantir une éducation de qualité accessible à tous.',
    icon: 'school',
    details: [
      {
        subtitle: 'Réforme du Système Éducatif',
        content: 'Introduire des programmes d\'enseignement modernes et adapter le curriculum aux besoins du marché du travail.',
      },
      {
        subtitle: 'Construction d\'Écoles',
        content: 'Ériger de nouvelles écoles primaires et secondaires, en particulier dans les zones rurales.',
      },
      {
        subtitle: 'Promotion de la Formation Professionnelle',
        content: 'Établir des centres de formation technique pour préparer les jeunes aux métiers demandés sur le marché.',
      },
    ],
  },
  {
    id: '4',
    title: 'Emploi et Économie',
    description: 'Créer des opportunités d\'emploi et stimuler la croissance économique.',
    icon: 'work',
    details: [
      {
        subtitle: 'Soutien à l\'Entrepreneuriat',
        content: 'Offrir des prêts à faible taux d\'intérêt et des formations en gestion d\'entreprise pour les jeunes entrepreneurs.',
      },
      {
        subtitle: 'Développement des Infrastructures',
        content: 'Investir dans la construction et la réhabilitation des routes, des ponts et des réseaux électriques pour stimuler l\'économie.',
      },
      {
        subtitle: 'Attraction des Investissements Étrangers',
        content: 'Simplifier les procédures administratives et offrir des incitations fiscales pour attirer les investisseurs étrangers.',
      },
    ],
  },
  {
    id: '5',
    title: 'Agriculture',
    description: 'Moderniser l\'agriculture et soutenir les agriculteurs.',
    icon: 'agriculture',
    details: [
      {
        subtitle: 'Modernisation Agricole',
        content: 'Introduire des techniques agricoles modernes et fournir des semences de qualité pour augmenter la productivité.',
      },
      {
        subtitle: 'Accès au Crédit Agricole',
        content: 'Mettre en place des fonds de garantie pour faciliter l\'accès au crédit pour les agriculteurs.',
      },
      {
        subtitle: 'Gestion de l\'Eau',
        content: 'Construire des systèmes d\'irrigation pour assurer une production agricole stable, même en période de sécheresse.',
      },
    ],
  },
  {
    id: '6',
    title: 'Infrastructures',
    description: 'Développer les infrastructures routières, énergétiques et de télécommunications.',
    icon: 'construction',
    details: [
      {
        subtitle: 'Routières',
        content: 'Asphalter les routes principales reliant les grandes villes et entretenir les routes secondaires pour faciliter le commerce.',
      },
      {
        subtitle: 'Ferroviaires',
        content: 'Réhabiliter le réseau ferroviaire pour améliorer le transport des marchandises et des passagers.',
      },
      {
        subtitle: 'Énergétiques',
        content: 'Étendre le réseau électrique national et promouvoir les énergies renouvelables pour diversifier les sources d\'énergie.',
      },
    ],
  },
  {
    id: '7',
    title: 'Ressources Naturelles',
    description: 'Gérer durablement les ressources naturelles du Mali.',
    icon: 'landscape',
    details: [
      {
        subtitle: 'Gestion Durable',
        content: 'Établir des réglementations strictes pour l\'exploitation minière et pétrolière afin de préserver l\'environnement.',
      },
      {
        subtitle: 'Valorisation des Ressources',
        content: 'Créer des industries de transformation pour ajouter de la valeur aux ressources naturelles extraites.',
      },
      {
        subtitle: 'Partage des Revenus',
        content: 'Assurer que les communautés locales bénéficient directement des revenus générés par l\'exploitation des ressources.',
      },
    ],
  },
  {
    id: '8',
    title: 'Protection Sociale',
    description: 'Mettre en place un système de protection sociale pour tous.',
    icon: 'health-and-safety',
    details: [
      {
        subtitle: 'Système de Santé Universel',
        content: 'Mettre en place une couverture maladie universelle pour tous les citoyens.',
      },
      {
        subtitle: 'Retraites et Pensions',
        content: 'Établir un système de retraite public et garantir des pensions décentes pour les retraités.',
      },
      {
        subtitle: 'Assistance Sociale',
        content: 'Offrir des aides financières et des services de soutien aux familles vulnérables.',
      },
    ],
  },
  {
    id: '9',
    title: 'Famille et Enfance',
    description: 'Protéger et soutenir les familles et les enfants.',
    icon: 'family-restroom',
    details: [
      {
        subtitle: 'Protection des Enfants',
        content: 'Renforcer les lois contre la maltraitance infantile et créer des centres d\'accueil pour les enfants en difficulté.',
      },
      {
        subtitle: 'Soutien aux Familles',
        content: 'Offrir des allocations familiales et des services de garde d\'enfants abordables.',
      },
      {
        subtitle: 'Éducation Parentale',
        content: 'Organiser des programmes pour éduquer les parents sur les meilleures pratiques en matière d\'éducation et de soins.',
      },
    ],
  },
  {
    id: '10',
    title: 'Diaspora Malienne',
    description: 'Renforcer les liens avec la diaspora malienne.',
    icon: 'public',
    details: [
      {
        subtitle: 'Renforcement des Liens',
        content: 'Organiser des forums annuels pour connecter la diaspora avec le gouvernement et les entreprises locales.',
      },
      {
        subtitle: 'Soutien aux Investissements',
        content: 'Offrir des incitations fiscales et des garanties pour encourager les investissements de la diaspora.',
      },
      {
        subtitle: 'Valorisation des Compétences',
        content: 'Créer des programmes pour intégrer les compétences et les expertises de la diaspora dans le développement national.',
      },
    ],
  },
  {
    id: '11',
    title: 'Administration et Gouvernance',
    description: 'Moderniser l\'administration publique pour plus d\'efficacité.',
    icon: 'account-balance',
    details: [
      {
        subtitle: 'Réforme de l\'Administration Publique',
        content: 'Mettre fin à la bureaucratie lourde et inefficace. Digitaliser les services administratifs pour faciliter les démarches citoyennes (état civil, fiscalité, permis, documents officiels, etc.).',
      },
      {
        subtitle: 'Lutte contre la Corruption',
        content: 'Renforcer les institutions de contrôle (BVG, Pôle économique, Cour des comptes) et appliquer rigoureusement les sanctions contre les abus de pouvoir et détournements.',
      },
      {
        subtitle: 'Décentralisation Équilibrée',
        content: 'Accélérer le processus de décentralisation en dotant les collectivités locales de ressources humaines, matérielles et financières suffisantes pour leur autonomie de gestion.',
      },
    ],
  },
  {
    id: '12',
    title: 'Fiscalité et Contribution Citoyenne',
    description: 'Créer un système fiscal juste et inclusif.',
    icon: 'account-balance-wallet',
    details: [
      {
        subtitle: 'Élargissement de la Base Fiscale',
        content: 'Intégrer le secteur informel par une politique douce et incitative, permettant aux petits opérateurs économiques de contribuer progressivement aux recettes de l\'État.',
      },
      {
        subtitle: 'Sécurité Sociale pour Tous',
        content: 'Créer un système de cotisation inclusif où chaque Malien, qu\'il soit agriculteur, commerçant, artisan ou salarié, contribue selon ses moyens pour bénéficier d\'un accès aux soins, à la retraite, à la pension et à l\'assurance chômage.',
      },
    ],
  },
  {
    id: '13',
    title: 'Politique des Infrastructures et de la Modernisation',
    description: 'Développer des infrastructures modernes pour le Mali.',
    icon: 'engineering',
    details: [
      {
        subtitle: 'Réseaux Routiers et Ferroviaires',
        content: 'Lancer un vaste programme de construction et réhabilitation des routes nationales et de création d\'un corridor ferroviaire reliant le Nord au Sud et l\'Est à l\'Ouest.',
      },
      {
        subtitle: 'Modernisation des Transports',
        content: 'Promouvoir un transport public urbain structuré, écologique et accessible, notamment à Bamako, avec des bus, minibus, taxis collectifs modernes.',
      },
      {
        subtitle: 'Développement Urbain',
        content: 'Élaborer des plans d\'urbanisme dans toutes les grandes villes pour mettre fin à l\'habitat anarchique et renforcer l\'accès à l\'eau, à l\'électricité et aux logements sociaux.',
      },
    ],
  },
  {
    id: '14',
    title: 'Énergie et Environnement',
    description: 'Promouvoir les énergies renouvelables et protéger l\'environnement.',
    icon: 'energy-savings-leaf',
    details: [
      {
        subtitle: 'Transition Énergétique',
        content: 'Promouvoir l\'énergie solaire, hydraulique et éolienne, avec un objectif de 60% d\'énergie renouvelable d\'ici 2035.',
      },
      {
        subtitle: 'Protection de l\'Environnement',
        content: 'Lancer une politique de reboisement national, lutter contre la désertification, promouvoir des pratiques agricoles durables et sanctionner la pollution industrielle.',
      },
      {
        subtitle: 'Économie Verte',
        content: 'Soutenir les initiatives économiques éco-responsables et les start-up vertes comme moteur d\'un développement durable.',
      },
    ],
  },
  {
    id: '15',
    title: 'Justice et Droits de l\'Homme',
    description: 'Garantir une justice indépendante et équitable.',
    icon: 'gavel',
    details: [
      {
        subtitle: 'Indépendance de la Justice',
        content: 'Garantir la séparation des pouvoirs, renforcer les moyens de la justice, former et protéger les magistrats contre toute pression politique ou économique.',
      },
      {
        subtitle: 'Droits des Femmes et des Enfants',
        content: 'Appliquer les conventions internationales signées par le Mali en matière de protection des femmes et des enfants, et renforcer les campagnes de sensibilisation contre les violences basées sur le genre.',
      },
    ],
  },
  {
    id: '16',
    title: 'Diplomatie et Souveraineté',
    description: 'Développer des relations diplomatiques fondées sur le respect mutuel.',
    icon: 'language',
    details: [
      {
        subtitle: 'Politique Étrangère Souveraine',
        content: 'Développer des relations diplomatiques fondées sur le respect mutuel, les intérêts réciproques et la non-ingérence, tout en renforçant la coopération avec les pays du Sahel, de l\'Afrique et du reste du monde.',
      },
      {
        subtitle: 'Promotion de l\'Image du Mali',
        content: 'Relancer une diplomatie culturelle et économique dynamique, valoriser le patrimoine malien et encourager les échanges universitaires et technologiques.',
      },
    ],
  },
];
