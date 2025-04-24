
import { Team } from '@/types';
import { users } from './users';

// Extract some users to use in team members
const alexeiIvanov = users.find(u => u.id === '1')!;
const semenVolkov = users[1];
const tatyanaKozlova = users[2];
const dmitrySokolov = users[3];
const ekaterinaOrlova = users[4];
const romanChernov = users[5];
const yuliyaLebedeva = users[6];

export const teams: Team[] = [
  {
    id: '1',
    hackathonId: '1',
    name: 'Волшебники данных',
    description: 'Команда специалистов по данным и инженеров машинного обучения, создающих инструменты ИИ нового поколения.',
    tags: ['Python', 'TensorFlow', 'NLP'],
    members: [
      alexeiIvanov,
      semenVolkov,
      tatyanaKozlova
    ],
    maxMembers: 5,
    createdBy: '1',
    createdAt: '2023-08-01'
  },
  {
    id: '2',
    hackathonId: '2',
    name: 'ЭкоРешения',
    description: 'Увлеченные созданием технологий, которые помогают бороться с изменением климата и способствуют устойчивому развитию.',
    tags: ['ЭкоТехнологии', 'IoT', 'React'],
    members: [
      dmitrySokolov,
      ekaterinaOrlova
    ],
    maxMembers: 4,
    createdBy: '4',
    createdAt: '2025-08-15'
  },
  {
    id: '3',
    hackathonId: '1',
    name: 'Инноваторы ИИ',
    description: 'Фокусируемся на разработке инновационных решений ИИ с практическим применением в здравоохранении и образовании.',
    tags: ['ИИ', 'Здравоохранение', 'Образование'],
    members: [
      romanChernov,
      yuliyaLebedeva
    ],
    maxMembers: 4,
    createdBy: '6',
    createdAt: '2025-08-10'
  },
  {
    id: '4',
    hackathonId: '3',
    name: 'Блокчейн Ниндзя',
    description: 'Эксперты по блокчейн-технологиям, разрабатывающие децентрализованные приложения и смарт-контракты.',
    tags: ['Блокчейн', 'Solidity', 'Smart Contracts'],
    members: [
      users[7],
      users[8],
      users[9]
    ],
    maxMembers: 5,
    createdBy: '8',
    createdAt: '2025-09-01'
  },
  {
    id: '5',
    hackathonId: '4',
    name: 'Медицинские Инноваторы',
    description: 'Команда специалистов в области медицины и технологий, создающих решения для улучшения здравоохранения.',
    tags: ['HealthTech', 'IoT', 'ML'],
    members: [
      users[10],
      users[11]
    ],
    maxMembers: 4,
    createdBy: '10',
    createdAt: '2023-09-05'
  },
  {
    id: '6',
    hackathonId: '5',
    name: 'ОбрТех Революционеры',
    description: 'Фокусируемся на создании интуитивных и эффективных образовательных технологий для студентов всех возрастов.',
    tags: ['EdTech', 'UX/UI', 'AI'],
    members: [
      users[12],
      users[13],
      users[14]
    ],
    maxMembers: 5,
    createdBy: '12',
    createdAt: '2023-09-20'
  }
];
