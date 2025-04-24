import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/Animations';
import HackathonCard from '@/components/HackathonCard';
import TeamCard from '@/components/TeamCard';
import { ArrowRight, Zap, Users, Award, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';

// Mock data
const featuredHackathons = [
  {
    id: '1',
    name: 'Глобальный хакатон инноваций в ИИ',
    description: 'Присоединяйтесь к крупнейшему хакатону по искусственному интеллекту и создавайте решения, которые будут формировать будущее ИИ.',
    startDate: '2025-09-15',
    endDate: '2025-09-18',
    location: 'Виртуально',
    tags: ['ИИ', 'Машинное обучение', 'Инновации'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Альянс ИИ',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 2,
      max: 5
    }
  },
  {
    id: '2',
    name: 'Саммит технологий для климата',
    description: 'Разработка инновационных решений для борьбы с изменением климата и экологическими проблемами с помощью технологий.',
    startDate: '2025-10-05',
    endDate: '2025-10-07',
    location: 'Сан-Франциско, Калифорния',
    tags: ['ЭкоТехнологии', 'Устойчивое развитие', 'Экология'],
    imageUrl: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Альянс Климата',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 3,
      max: 6
    }
  },
  {
    id: '3',
    name: 'Хакатон разработки Web3',
    description: 'Расширяйте границы блокчейн-технологий, создавая инновационные dApps и решения Web3.',
    startDate: '2025-11-12',
    endDate: '2025-11-14',
    location: 'Виртуально',
    tags: ['Блокчейн', 'Web3', 'Крипто'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Блокчейн Фонд',
    organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
    teamSize: {
      min: 2,
      max: 4
    }
  }
];

const featuredTeams = [
  {
    id: '1',
    hackathonId: '1',
    name: 'Волшебники данных',
    description: 'Команда специалистов по данным и инженеров машинного обучения, создающих инструменты ИИ нового поколения.',
    tags: ['Python', 'TensorFlow', 'NLP'],
    members: [
      {id: '1', name: 'Алекс Джонсон', email: 'alex@example.com', bio: 'Инженер МО', tags: [], photoUrl: '', createdAt: '2025-01-15'},
      {id: '2', name: 'Сэм Уилсон', email: 'sam@example.com', bio: 'Специалист по данным', tags: [], photoUrl: '', createdAt: '2025-02-10'},
      {id: '3', name: 'Тэйлор Ким', email: 'taylor@example.com', bio: 'Исследователь ИИ', tags: [], photoUrl: '', createdAt: '2025-01-05'}
    ],
    maxMembers: 5,
    createdBy: '1',
    createdAt: '2025-08-01'
  },
  {
    id: '2',
    hackathonId: '2',
    name: 'ЭкоРешения',
    description: 'Увлеченные созданием техн��логий, которые помогают бороться с изменением климата и способствуют устойчивому развитию.',
    tags: ['ЭкоТехнологии', 'IoT', 'React'],
    members: [
      {id: '4', name: 'Джейми Смит', email: 'jamie@example.com', bio: 'Full-stack разработчик', tags: [], photoUrl: '', createdAt: '2025-01-15'},
      {id: '5', name: 'Кейси Браун', email: 'casey@example.com', bio: 'UX дизайнер', tags: [], photoUrl: '', createdAt: '2025-03-20'}
    ],
    maxMembers: 4,
    createdBy: '4',
    createdAt: '2025-08-15'
  }
];

const Index = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:pt-40 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(220,230,255,0.8),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto max-w-5xl">
          <SlideUp delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
              Найдите свою идеальную <span className="text-primary underline decoration-secondary decoration-4 underline-offset-4">команду для хакатона</span>
            </h1>
          </SlideUp>
          
          <SlideUp delay={300}>
            <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Откройте для себя хакатоны, создавайте команды с талантливыми людьми и вместе создавайте удивительные проекты.
            </p>
          </SlideUp>
          
          <SlideUp delay={500}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hackathons">
                <Button size="lg" className="font-medium text-base w-full sm:w-auto">
                  Просмотр хакатонов
                </Button>
              </Link>
              <Link to="/teams">
                <Button size="lg" variant="outline" className="font-medium text-base w-full sm:w-auto">
                  Найти команды
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
      
      {/* Admin Panel (visible only when logged in as admin) */}
      {isAdmin && <AdminPanel />}
      
      {/* Featured Hackathons */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <FadeIn delay={100}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold">Избранные хакатоны</h2>
              <Link to="/hackathons" className="flex items-center text-sm font-medium hover:underline">
                Смотреть все <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerContainer initialDelay={300} staggerDelay={150}>
              {featuredHackathons.map((hackathon, index) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} index={index} />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <FadeIn delay={100}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12">
              Лучший опыт хакатонов
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <StaggerContainer initialDelay={300} staggerDelay={150}>
              <div className="bg-secondary/50 p-6 rounded-lg" style={{ width: '70vw' }}>
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Откройте для себя события</h3>
                <p className="text-muted-foreground">
                  Просматривайте предстоящие хакатоны по всему миру, фильтруя по дате, месту или технологии.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg" style={{ width: '70vw' }}>
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Users size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Создавайте команды</h3>
                <p className="text-muted-foreground">
                  Найдите участников с дополнительными навыками или присоединитесь к существующей команде, соответствующей вашим интересам.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg" style={{ width: '70vw' }}>
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Award size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Побеждайте вместе</h3>
                <p className="text-muted-foreground">
                  Эффективно сотрудничайте, демонстрируйте свои навыки и увеличивайте свои шансы на получение призов.
                </p>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>
      
      {/* Featured Teams */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <FadeIn delay={100}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold">Популярные команды</h2>
              <Link to="/teams" className="flex items-center text-sm font-medium hover:underline">
                Смотреть все <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StaggerContainer initialDelay={300} staggerDelay={150}>
              {featuredTeams.map((team, index) => (
                <TeamCard 
                  key={team.id} 
                  team={team} 
                  index={index}
                  hackathonName={
                    featuredHackathons.find(h => h.id === team.hackathonId)?.name
                  } 
                />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_60%,rgba(220,230,255,0.8),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn delay={100}>
            <div className="inline-block mb-6">
              <div className="rounded-full p-3 bg-secondary">
                <Sparkles size={28} className="text-primary" />
              </div>
            </div>
          </FadeIn>
          
          <SlideUp delay={200}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Готовы присоединиться к следующему хакатону?
            </h2>
          </SlideUp>
          
          <SlideUp delay={400}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Создайте свой аккаунт сегодня и начните общаться с талантливыми разработчиками, дизайнерами и визионерами, которые разделяют вашу страсть.
            </p>
          </SlideUp>
          
          <SlideUp delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="font-medium text-base w-full sm:w-auto">
                  Создать аккаунт
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button size="lg" variant="outline" className="font-medium text-base w-full sm:w-auto">
                  Изучить хакатоны
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
      
      {/* Admin Login at the bottom */}
      <footer className="py-6 mt-10 border-t border-border">
        <div className="container mx-auto flex flex-col items-center">
         
          <AdminLogin />
        </div>
      </footer>
    </div>
  );
};

export default Index;
