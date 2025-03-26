
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/Animations';
import HackathonCard from '@/components/HackathonCard';
import TeamCard from '@/components/TeamCard';
import { ArrowRight, Zap, Users, Award, Sparkles } from 'lucide-react';

// Mock data
const featuredHackathons = [
  {
    id: '1',
    name: 'Global AI Innovation Hackathon',
    description: 'Join the world\'s largest AI hackathon and build solutions that will shape the future of artificial intelligence.',
    startDate: '2023-09-15',
    endDate: '2023-09-18',
    location: 'Virtual',
    tags: ['AI', 'Machine Learning', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'AI Alliance',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 2,
      max: 5
    }
  },
  {
    id: '2',
    name: 'Climate Tech Summit Challenge',
    description: 'Develop innovative solutions to address climate change and environmental challenges through technology.',
    startDate: '2023-10-05',
    endDate: '2023-10-07',
    location: 'San Francisco, CA',
    tags: ['CleanTech', 'Sustainability', 'Environment'],
    imageUrl: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Climate Alliance',
    organizerLogo: 'https://via.placeholder.com/40',
    teamSize: {
      min: 3,
      max: 6
    }
  },
  {
    id: '3',
    name: 'Web3 Development Hackathon',
    description: 'Push the boundaries of blockchain technology by creating innovative dApps and Web3 solutions.',
    startDate: '2023-11-12',
    endDate: '2023-11-14',
    location: 'Virtual',
    tags: ['Blockchain', 'Web3', 'Crypto'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    organizerName: 'Blockchain Foundation',
    organizerLogo: 'https://via.placeholder.com/40',
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
    name: 'Data Wizards',
    description: 'A team of data scientists and machine learning engineers building the next generation of AI tools.',
    tags: ['Python', 'TensorFlow', 'NLP'],
    members: [
      {id: '1', name: 'Alex Johnson', email: 'alex@example.com', bio: 'ML Engineer', tags: [], photoUrl: '', createdAt: '2023-01-15'},
      {id: '2', name: 'Sam Wilson', email: 'sam@example.com', bio: 'Data Scientist', tags: [], photoUrl: '', createdAt: '2023-02-10'},
      {id: '3', name: 'Taylor Kim', email: 'taylor@example.com', bio: 'AI Researcher', tags: [], photoUrl: '', createdAt: '2023-01-05'}
    ],
    maxMembers: 5,
    createdBy: '1',
    createdAt: '2023-08-01'
  },
  {
    id: '2',
    hackathonId: '2',
    name: 'EcoSolutions',
    description: 'Passionate about creating technology that helps combat climate change and promote sustainability.',
    tags: ['CleanTech', 'IoT', 'React'],
    members: [
      {id: '4', name: 'Jamie Smith', email: 'jamie@example.com', bio: 'Full-stack Developer', tags: [], photoUrl: '', createdAt: '2023-01-15'},
      {id: '5', name: 'Casey Brown', email: 'casey@example.com', bio: 'UX Designer', tags: [], photoUrl: '', createdAt: '2023-03-20'}
    ],
    maxMembers: 4,
    createdBy: '4',
    createdAt: '2023-08-15'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:pt-40 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(220,230,255,0.8),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto max-w-5xl">
          <SlideUp delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
              Find your perfect <span className="text-primary underline decoration-secondary decoration-4 underline-offset-4">hackathon team</span>
            </h1>
          </SlideUp>
          
          <SlideUp delay={300}>
            <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Discover hackathons, form teams with talented individuals, and build amazing projects together.
            </p>
          </SlideUp>
          
          <SlideUp delay={500}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hackathons">
                <Button size="lg" className="font-medium text-base w-full sm:w-auto">
                  Browse Hackathons
                </Button>
              </Link>
              <Link to="/teams">
                <Button size="lg" variant="outline" className="font-medium text-base w-full sm:w-auto">
                  Find Teams
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
      
      {/* Featured Hackathons */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <FadeIn delay={100}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold">Featured Hackathons</h2>
              <Link to="/hackathons" className="flex items-center text-sm font-medium hover:underline">
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              The Ultimate Hackathon Experience
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerContainer initialDelay={300} staggerDelay={150}>
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Discover Events</h3>
                <p className="text-muted-foreground">
                  Browse through upcoming hackathons worldwide, filtering by date, location, or technology.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Users size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Build Teams</h3>
                <p className="text-muted-foreground">
                  Find teammates with complementary skills or join an existing team that matches your interests.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Award size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Win Together</h3>
                <p className="text-muted-foreground">
                  Collaborate effectively, showcase your skills, and increase your chances of winning prizes.
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
              <h2 className="text-2xl sm:text-3xl font-semibold">Popular Teams</h2>
              <Link to="/teams" className="flex items-center text-sm font-medium hover:underline">
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Ready to join your next hackathon?
            </h2>
          </SlideUp>
          
          <SlideUp delay={400}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Create your account today and start connecting with talented developers, designers, and visionaries who share your passion.
            </p>
          </SlideUp>
          
          <SlideUp delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="font-medium text-base w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button size="lg" variant="outline" className="font-medium text-base w-full sm:w-auto">
                  Explore Hackathons
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
};

export default Index;
