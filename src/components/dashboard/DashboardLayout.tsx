
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

interface User {
  id: string;
  role: string;
}

const DashboardLayout = ({ children, requireAdmin = false }: DashboardLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    // Check if admin access is required
    if (requireAdmin && parsedUser.role !== 'admin') {
      navigate('/dashboard');
    }
    
    setLoading(false);
  }, [navigate, requireAdmin]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar isAdmin={user?.role === 'admin'} />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
