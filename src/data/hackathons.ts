
import { Hackathon } from '@/types';

export const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'Глобальный хакатон инноваций в ИИ',
    description: 'Присоединяйтесь к крупнейшему хакатону по искусственному интеллекту и создавайте решения, которые будут формировать будущее ИИ. Участники будут решать реальные проблемы и разрабатывать передовые приложения ИИ, которые могут потенциально трансформировать отрасли.\n\nЭтот хакатон идеально подходит для энтузиастов ИИ, инженеров машинного обучения, специалистов по данным и всех, кто заинтересован в расширении границ возможностей ИИ. Независимо от того, являетесь ли вы опытным профессионалом или только начинаете работать в этой области, это мероприятие предлагает ценные возможности для обучения, создания сети контактов и демонстрации ваших талантов.',
    startDate: '2025-09-15',
    endDate: '2025-09-18',
    location: 'Онлайн',
    tags: ['ИИ', 'Машинное обучение', 'Инновации'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Альянс ИИ',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 2,
      max: 5
    },
    website: 'https://example.com/hackathon',
    prizes: [
      {
        place: '1-е место',
        description: 'Денежный приз 750 000 ₽ + кредиты для вычислений ИИ',
      },
      {
        place: '2-е место',
        description: 'Денежный приз 375 000 ₽ + возможности менторства',
      },
      {
        place: '3-е место',
        description: 'Денежный приз 190 000 ₽ + лицензии на продукты',
      }
    ],
    schedule: [
      {
        date: '2025-09-15',
        time: '10:00 - 11:00',
        title: 'Церемония открытия',
        description: 'Приветственное обращение и введение в задачи хакатона.'
      },
      {
        date: '2025-09-15',
        time: '11:30 - 12:30',
        title: 'Формирование команд',
        description: 'Сессия нетворкинга для формирования команд участниками.'
      },
      {
        date: '2025-09-15',
        time: '13:00',
        title: 'Начало хакатона',
        description: 'Начало разработки проектов!'
      },
      {
        date: '2025-09-17',
        time: '17:00',
        title: 'Срок подачи проектов',
        description: 'Все проекты должны быть представлены к этому времени.'
      },
      {
        date: '2025-09-18',
        time: '10:00 - 13:00',
        title: 'Презентации проектов',
        description: 'Команды представляют свои проекты судьям и другим участникам.'
      },
      {
        date: '2025-09-18',
        time: '15:00 - 16:00',
        title: 'Церемония награждения',
        description: 'Объявление победителей и распределение призов.'
      }
    ]
  },
  {
    id: '2',
    name: 'Саммит технологий для климата',
    description: 'Разработка инновационных решений для борьбы с изменением климата и экологическими проблемами с помощью технологий.',
    startDate: '2025-10-05',
    endDate: '2025-10-07',
    location: 'Москва',
    tags: ['ЭкоТехнологии', 'Устойчивое развитие', 'Экология'],
    imageUrl: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Альянс Климата',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 3,
      max: 6
    },
    website: 'https://example.com/climate-tech',
    prizes: [
      {
        place: '1-е место',
        description: 'Денежный приз 1 125 000 ₽ + инвестиции в проект',
      },
      {
        place: '2-е место',
        description: 'Денежный приз 560 000 ₽ + менторство',
      },
      {
        place: '3-е место',
        description: 'Денежный приз 225 000 ₽ + поддержка развития',
      }
    ],
    schedule: [
      {
        date: '2025-10-05',
        time: '09:00 - 10:30',
        title: 'Открытие и ключевые спикеры',
        description: 'Вступительные речи от лидеров индустрии.'
      },
      {
        date: '2025-10-05',
        time: '11:00 - 12:30',
        title: 'Формирование команд',
        description: 'Возможность найти команду и обсудить идеи.'
      },
      {
        date: '2025-10-05',
        time: '13:30',
        title: 'Старт разработки',
        description: 'Начало хакатона.'
      },
      {
        date: '2025-10-07',
        time: '12:00',
        title: 'Завершение разработки',
        description: 'Финальное время для завершения проектов.'
      },
      {
        date: '2025-10-07',
        time: '14:00 - 17:00',
        title: 'Презентации',
        description: 'Команды представляют свои решения.'
      },
      {
        date: '2025-10-07',
        time: '18:00 - 19:00',
        title: 'Награждение',
        description: 'Объявление и награждение победителей.'
      }
    ]
  },
  {
    id: '3',
    name: 'Хакатон разработки Web3',
    description: 'Расширяйте границы блокчейн-технологий, создавая инновационные dApps и решения Web3.',
    startDate: '2025-11-12',
    endDate: '2025-11-14',
    location: 'Онлайн',
    tags: ['Блокчейн', 'Web3', 'Крипто'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Блокчейн Фонд',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 2,
      max: 4
    },
    website: 'https://example.com/web3-hackathon',
    prizes: [
      {
        place: '1-е место',
        description: 'Призовой фонд в криптовалюте эквивалентный 1 500 000 ₽',
      },
      {
        place: '2-е место',
        description: 'Призовой фонд в криптовалюте эквивалентный 750 000 ₽',
      },
      {
        place: '3-е место',
        description: 'Призовой фонд в криптовалюте эквивалентный 375 000 ₽',
      }
    ],
    schedule: [
      {
        date: '2025-11-12',
        time: '10:00 - 11:00',
        title: 'Виртуальное открытие',
        description: 'Представление темы и задач хакатона.'
      },
      {
        date: '2025-11-12',
        time: '11:00 - 12:00',
        title: 'Обучающие семинары',
        description: 'Семинары по ключевым технологиям Web3.'
      },
      {
        date: '2025-11-12',
        time: '12:30',
        title: 'Начало разработки',
        description: 'Старт хакатона.'
      },
      {
        date: '2025-11-14',
        time: '10:00',
        title: 'Deadline проектов',
        description: 'Окончание приема проектов.'
      },
      {
        date: '2025-11-14',
        time: '12:00 - 15:00',
        title: 'Демо-день',
        description: 'Презентации проектов.'
      },
      {
        date: '2025-11-14',
        time: '16:00',
        title: 'Церемония награждения',
        description: 'Объявление победителей.'
      }
    ]
  },
  {
    id: '4',
    name: 'Инновационный вызов в сфере здравоохранения',
    description: 'Создавайте решения, использующие технологии для улучшения предоставления медицинской помощи, результатов лечения пациентов и медицинских исследований.',
    startDate: '2025-09-25',
    endDate: '2025-09-27',
    location: 'Санкт-Петербург',
    tags: ['Здравоохранение', 'ИИ', 'IoT'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Инициатива МедТех',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 2,
      max: 5
    },
    website: 'https://example.com/healthcare-challenge',
    prizes: [
      {
        place: '1-е место',
        description: 'Грант на разработку 1 875 000 ₽ и доступ к медицинским данным',
      },
      {
        place: '2-е место',
        description: 'Грант на разработку 900 000 ₽ и менторство от экспертов',
      },
      {
        place: '3-е место',
        description: 'Грант на разработку 375 000 ₽ и доступ к API партнеров',
      }
    ],
    schedule: [
      {
        date: '2025-09-25',
        time: '08:30 - 10:00',
        title: 'Регистрация и открытие',
        description: 'Регистрация участников и вступительные речи.'
      },
      {
        date: '2025-09-25',
        time: '10:30 - 12:00',
        title: 'Панельная дискуссия',
        description: 'Дискуссия о будущем цифрового здравоохранения.'
      },
      {
        date: '2025-09-25',
        time: '13:00',
        title: 'Начало хакатона',
        description: 'Официальный старт хакатона.'
      },
      {
        date: '2025-09-27',
        time: '10:00',
        title: 'Завершение разработки',
        description: 'Финальное время для доработки проектов.'
      },
      {
        date: '2025-09-27',
        time: '13:00 - 16:00',
        title: 'Презентации решений',
        description: 'Презентации разработанных решений перед жюри.'
      },
      {
        date: '2025-09-27',
        time: '17:00',
        title: 'Объявление победителей',
        description: 'Церемония награждения и заключительное слово.'
      }
    ]
  },
  {
    id: '5',
    name: 'Хакатон образовательных технологий',
    description: 'Переосмыслите будущее образования через инновационные технологические решения, которые улучшают процесс обучения.',
    startDate: '2025-10-15',
    endDate: '2025-10-17',
    location: 'Казань',
    tags: ['ОбрТех', 'ИИ', 'UX Дизайн'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2332&q=80',
    organizerName: 'Альянс ОбрТех',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 3,
      max: 5
    },
    website: 'https://example.com/edtech-hackathon',
    prizes: [
      {
        place: '1-е место',
        description: 'Денежный приз 600 000 ₽ и пилотный запуск в образовательных учреждениях',
      },
      {
        place: '2-е место',
        description: 'Денежный приз 300 000 ₽ и доступ к образовательной платформе',
      },
      {
        place: '3-е место',
        description: 'Денежный приз 150 000 ₽ и годовая подписка на образовательные сервисы',
      }
    ],
    schedule: [
      {
        date: '2025-10-15',
        time: '09:00 - 10:30',
        title: 'Открытие и вводные воркшопы',
        description: 'Открытие мероприятия и обзор проблем в образовании.'
      },
      {
        date: '2025-10-15',
        time: '11:00 - 12:30',
        title: 'Формирование команд',
        description: 'Время для формирования и организации команд.'
      },
      {
        date: '2025-10-15',
        time: '13:30',
        title: 'Начало разработки',
        description: 'Старт хакатона и консультации с менторами.'
      },
      {
        date: '2025-10-17',
        time: '11:00',
        title: 'Финальная доработка',
        description: 'Последние доработки перед презентацией.'
      },
      {
        date: '2025-10-17',
        time: '13:00 - 16:00',
        title: 'Демо-день',
        description: 'Презентация решений перед жюри и участниками.'
      },
      {
        date: '2025-10-17',
        time: '17:00',
        title: 'Награждение победителей',
        description: 'Объявление победителей и нетворкинг.'
      }
    ]
  },
  {
    id: '6',
    name: 'Финтех-вызов',
    description: 'Создавайте инновационные финансово-технологические решения, которые могут трансформировать банковское дело, платежи, инвестиции и многое другое.',
    startDate: '2025-11-05',
    endDate: '2025-11-07',
    location: 'Москва',
    tags: ['Финтех', 'Блокчейн', 'Безопасность'],
    imageUrl: 'https://img.freepik.com/premium-vector/fintech-robotic-hand-financial-technology-online-banking-business-investment-banking-concept-virutal-screen_127544-751.jpg',
    organizerName: 'Лаборатория финансовых инноваций',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 2,
      max: 4
    },
    website: 'https://example.com/fintech-challenge',
    prizes: [
      {
        place: '1-е место',
        description: 'Инвестиции 3 750 000 ₽ и доступ к акселератору',
      },
      {
        place: '2-е место',
        description: 'Инвестиции 1 875 000 ₽ и программа поддержки',
      },
      {
        place: '3-е место',
        description: 'Грант 750 000 ₽ и доступ к API финансовых сервисов',
      }
    ],
    schedule: [
      {
        date: '2025-11-05',
        time: '09:00 - 10:00',
        title: 'Открытие и выступления',
        description: 'Открытие хакатона и выступления лидеров индустрии.'
      },
      {
        date: '2025-11-05',
        time: '10:30 - 12:00',
        title: 'Техническая сессия',
        description: 'Обзор API и технологий, доступных участникам.'
      },
      {
        date: '2025-11-05',
        time: '13:00',
        title: 'Старт хакатона',
        description: 'Начало работы над проектами.'
      },
      {
        date: '2025-11-07',
        time: '10:00',
        title: 'Код-фриз',
        description: 'Остановка разработки и подготовка презентаций.'
      },
      {
        date: '2025-11-07',
        time: '13:00 - 16:30',
        title: 'Питч-сессия',
        description: 'Презентации проектов перед жюри и инвесторами.'
      },
      {
        date: '2025-11-07',
        time: '17:30',
        title: 'Финальная церемония',
        description: 'Объявление победителей и нетворкинг с инвесторами.'
      }
    ]
  }
];
