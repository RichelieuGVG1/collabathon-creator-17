
import { User } from '@/types';

export const users: User[] = [
  {
    id: '1',
    name: 'Алекс Джонсон',
    email: 'alex@example.com',
    bio: 'Инженер машинного обучения с опытом работы в области ИИ и анализа данных. Опыт работы с Python, TensorFlow и созданием масштабируемых систем МО.',
    tags: ['Python', 'ML', 'TensorFlow', 'Data Science', 'Cloud Computing'],
    photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    createdAt: '2023-01-15',
    location: 'Сан-Франциско, CA',
    github: 'alexj',
    website: 'https://alexj.dev',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'SQL', 'Cloud Computing', 'Docker', 'Git']
  },
  {
    id: '2',
    name: 'Сэм Уилсон',
    email: 'sam@example.com',
    bio: 'Специалист по данным, увлеченный выявлением ценных идей из сложных наборов данных. Опытный в статистическом анализе и визуализации данных.',
    tags: ['Data Science', 'R', 'Python', 'Statistics', 'Visualization'],
    photoUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    createdAt: '2023-02-10',
    location: 'Нью-Йорк, NY',
    github: 'samwilson',
    website: 'https://samwilson.io',
    skills: ['Python', 'R', 'SQL', 'Tableau', 'Statistical Analysis', 'Data Visualization', 'Machine Learning', 'Big Data']
  },
  {
    id: '3',
    name: 'Тэйлор Ким',
    email: 'taylor@example.com',
    bio: 'Исследователь ИИ, работающий над системами глубокого обучения для компьютерного зрения и обработки естественного языка.',
    tags: ['NLP', 'Computer Vision', 'Deep Learning', 'Research'],
    photoUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
    createdAt: '2023-01-05',
    location: 'Бостон, MA',
    github: 'taylork',
    website: 'https://taylork.ai',
    skills: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'Research', 'Python', 'Deep Learning', 'CUDA']
  },
  {
    id: '4',
    name: 'Джейми Смит',
    email: 'jamie@example.com',
    bio: 'Full-stack разработчик с опытом в создании масштабируемых веб-приложений. Увлечен экологически устойчивыми технологиями.',
    tags: ['JavaScript', 'React', 'Node.js', 'Sustainability'],
    photoUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
    createdAt: '2023-01-15',
    location: 'Сиэтл, WA',
    github: 'jamiesmith',
    website: 'https://jamie.dev',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Docker', 'GraphQL']
  },
  {
    id: '5',
    name: 'Кейси Браун',
    email: 'casey@example.com',
    bio: 'UX дизайнер, фокусирующийся на создании интуитивных и доступных интерфейсов. Опыт работы в проектах экологических технологий.',
    tags: ['UX/UI', 'Design', 'Accessibility', 'Figma'],
    photoUrl: 'https://randomuser.me/api/portraits/women/36.jpg',
    createdAt: '2023-03-20',
    location: 'Портленд, OR',
    github: 'caseyb',
    website: 'https://caseybrown.design',
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Usability Testing', 'Accessibility']
  },
  {
    id: '6',
    name: 'Райли Чен',
    email: 'riley@example.com',
    bio: 'Специалист по ИИ, работающий над приложениями машинного обучения в здравоохранении. Опыт в создании алгоритмов прогнозирования.',
    tags: ['Healthcare AI', 'Python', 'ML Ops', 'Research'],
    photoUrl: 'https://randomuser.me/api/portraits/men/57.jpg',
    createdAt: '2023-02-05',
    location: 'Чикаго, IL',
    github: 'rileychen',
    website: 'https://rileychen.io',
    skills: ['Python', 'TensorFlow', 'scikit-learn', 'Healthcare', 'ML Ops', 'Cloud Infrastructure', 'Research Methods']
  },
  {
    id: '7',
    name: 'Джордан Ли',
    email: 'jordan@example.com',
    bio: 'Backend разработчик, специализирующийся на API и микросервисах. Опыт работы с платформами для здравоохранения и ИИ.',
    tags: ['Golang', 'Microservices', 'API Design', 'Kubernetes'],
    photoUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
    createdAt: '2023-03-15',
    location: 'Остин, TX',
    github: 'jordanlee',
    website: 'https://jordanlee.tech',
    skills: ['Go', 'Python', 'Kubernetes', 'Docker', 'API Design', 'Microservices', 'PostgreSQL', 'Redis', 'gRPC']
  },
  {
    id: '8',
    name: 'Морган Пател',
    email: 'morgan@example.com',
    bio: 'Блокчейн-разработчик с опытом в создании смарт-контрактов и DeFi приложений. Консультант по Web3 технологиям.',
    tags: ['Blockchain', 'Solidity', 'Ethereum', 'DeFi'],
    photoUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    createdAt: '2023-02-20',
    location: 'Майами, FL',
    github: 'morganpatel',
    website: 'https://morganpatel.crypto',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'DApp Development', 'Hardhat', 'DeFi', 'NFTs']
  },
  {
    id: '9',
    name: 'Эйвери Вонг',
    email: 'avery@example.com',
    bio: 'Криптографический исследователь и разработчик протоколов блокчейн. Работает над вопросами безопасности и масштабируемости.',
    tags: ['Cryptography', 'Security', 'Blockchain', 'Zero-Knowledge'],
    photoUrl: 'https://randomuser.me/api/portraits/women/75.jpg',
    createdAt: '2023-01-30',
    location: 'Сан-Хосе, CA',
    github: 'averyw',
    website: 'https://averywong.com',
    skills: ['Cryptography', 'Zero-Knowledge Proofs', 'Rust', 'C++', 'Security Analysis', 'Consensus Algorithms', 'L2 Scaling']
  },
  {
    id: '10',
    name: 'Дакота Сингх',
    email: 'dakota@example.com',
    bio: 'Медицинский исследователь и инженер биомедицинских данных. Создает решения на основе ИИ для диагностики и персонализированной медицины.',
    tags: ['Healthcare', 'Bioinformatics', 'Machine Learning', 'Med-Tech'],
    photoUrl: 'https://randomuser.me/api/portraits/men/88.jpg',
    createdAt: '2023-03-10',
    location: 'Балтимор, MD',
    github: 'dakotasingh',
    website: 'https://dakotasingh.med',
    skills: ['Bioinformatics', 'Python', 'R', 'Machine Learning', 'Medical Imaging', 'Genomics', 'Clinical Data Analysis']
  },
  {
    id: '11',
    name: 'Блэр Чавез',
    email: 'blair@example.com',
    bio: 'Специалист по IoT и встраиваемым системам, работающий над медицинскими устройствами нового поколения. Опыт в системах мониторинга здоровья.',
    tags: ['IoT', 'Embedded Systems', 'Healthcare', 'Firmware'],
    photoUrl: 'https://randomuser.me/api/portraits/women/88.jpg',
    createdAt: '2023-04-05',
    location: 'Миннеаполис, MN',
    github: 'blairc',
    website: 'https://blairchavez.io',
    skills: ['C/C++', 'Embedded Systems', 'IoT', 'BLE', 'Medical Devices', 'RTOS', 'Firmware Development', 'PCB Design']
  },
  {
    id: '12',
    name: 'Финли Родригез',
    email: 'finley@example.com',
    bio: 'Образовательный технолог и UI/UX дизайнер, создающий инновационные обучающие платформы. Опыт в геймификации и адаптивном обучении.',
    tags: ['EdTech', 'UX Design', 'Gamification', 'Learning Systems'],
    photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    createdAt: '2023-01-15',
    location: 'Остин, TX',
    github: 'finleyr',
    website: 'https://finleyrodriguez.edu',
    skills: ['UX Design', 'Educational Technology', 'Gamification', 'Learning Experience Design', 'JavaScript', 'React', 'Adobe CC']
  },
  {
    id: '13',
    name: 'Куинн Ван',
    email: 'quinn@example.com',
    bio: 'Специалист по ИИ в образовании, разрабатывающий системы персонализированного обучения. Опыт в адаптивном тестировании и аналитике обучения.',
    tags: ['EdTech', 'AI', 'Python', 'Learning Analytics'],
    photoUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    createdAt: '2023-02-25',
    location: 'Сиэтл, WA',
    github: 'quinnv',
    website: 'https://quinnvan.ai',
    skills: ['Machine Learning', 'Python', 'Educational Technology', 'Learning Analytics', 'Adaptive Learning', 'Data Science', 'NLP']
  },
  {
    id: '14',
    name: 'Рейган Уильямс',
    email: 'reagan@example.com',
    bio: 'Full-stack разработчик, специализирующийся на образовательных платформах. Опыт в создании интерактивных обучающих сред.',
    tags: ['EdTech', 'JavaScript', 'React', 'Node.js'],
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    createdAt: '2023-03-15',
    location: 'Бостон, MA',
    github: 'reaganw',
    website: 'https://reaganwilliams.dev',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'AWS', 'GraphQL', 'UI/UX', 'Educational Platforms']
  },
  {
    id: '15',
    name: 'Харпер Нгуен',
    email: 'harper@example.com',
    bio: 'Финтех-инженер и архитектор безопасности. Опыт в разработке защищенных платежных систем и блокчейн-решений.',
    tags: ['FinTech', 'Security', 'Blockchain', 'Payment Systems'],
    photoUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    createdAt: '2023-02-15',
    location: 'Нью-Йорк, NY',
    github: 'harpern',
    website: 'https://harpernguyen.fin',
    skills: ['Cybersecurity', 'Java', 'Spring', 'Blockchain', 'AWS', 'Payment Protocols', 'Cryptography', 'Financial Systems']
  }
];
