
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, BrainCircuit, LucideIcon, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      navigate(userData.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    }
  }, [navigate]);

  // Define feature cards
  const features = [
    {
      title: "Performance Analytics",
      description: "Visualize your academic progress and identify patterns in your learning journey.",
      icon: BarChart3,
    },
    {
      title: "Outcome Prediction",
      description: "Leverage machine learning to predict your likely academic outcomes and get recommendations.",
      icon: BrainCircuit,
    },
    {
      title: "Personalized Feedback",
      description: "Receive tailored guidance from instructors to improve your learning experience.",
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 z-0"></div>
        
        <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
          <nav className="absolute top-8 left-0 right-0 flex justify-between items-center px-4 md:px-6">
            <div className="flex items-center">
              <span className="text-xl font-display font-bold text-gradient">EduForecast</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </nav>
          
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              Predict Your Academic Success with 
              <span className="text-gradient block">AI-Powered Analytics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of machine learning to visualize your performance, predict outcomes, and receive personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link to="/login">
                  Login to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Visual element */}
        <div className="absolute -bottom-48 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/20 to-transparent z-0 opacity-70"></div>
      </header>
      
      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Advanced Features for Academic Excellence
            </h2>
            <p className="text-muted-foreground text-lg">
              Our platform combines data analytics with machine learning to help you understand and improve your academic performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                Icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/20 relative overflow-hidden">
        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who are using data-driven insights to achieve their academic goals.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link to="/signup">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        
        {/* Visual elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary/10 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-radial from-primary/10 to-transparent opacity-70"></div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-display font-bold text-gradient">EduForecast</span>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} EduForecast. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <Link to="/login" className="text-sm hover:text-primary">Login</Link>
              <Link to="/signup" className="text-sm hover:text-primary">Sign Up</Link>
              <a href="#" className="text-sm hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}

const FeatureCard = ({ title, description, Icon, index }: FeatureCardProps) => {
  return (
    <div 
      className="rounded-xl p-6 border bg-card shadow-sm hover:shadow-md transition-all duration-300 card-shine animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
