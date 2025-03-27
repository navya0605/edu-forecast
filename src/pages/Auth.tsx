
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

interface AuthPageProps {
  mode: 'login' | 'signup' | 'forgot';
}

const Auth = ({ mode }: AuthPageProps) => {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('user') !== null;
  
  // If logged in, redirect to dashboard
  if (isLoggedIn) {
    // Determine redirect based on user role
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-background to-secondary/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 text-gradient">EduForecast</h1>
          <p className="text-muted-foreground">Academic performance prediction and analysis</p>
        </div>
        
        <AuthForm initialMode={mode} />
      </div>
    </div>
  );
};

export default Auth;
