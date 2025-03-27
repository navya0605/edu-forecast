
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle, 
  BrainCircuit
} from 'lucide-react';

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar = ({ isAdmin = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const studentLinks = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Performance',
      href: '/performance',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: 'Predictions',
      href: '/predict',
      icon: <BrainCircuit className="h-5 w-5" />
    },
    {
      title: 'Resources',
      href: '/resources',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />
    },
    {
      title: 'Help',
      href: '/help',
      icon: <HelpCircle className="h-5 w-5" />
    }
  ];
  
  const adminLinks = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Students',
      href: '/admin/students',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: 'Predictions',
      href: '/admin/predictions',
      icon: <BrainCircuit className="h-5 w-5" />
    },
    {
      title: 'Feedback',
      href: '/admin/feedback',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];
  
  const links = isAdmin ? adminLinks : studentLinks;
  
  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-background border-r border-border transition-all duration-300 shadow-sm",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 overflow-hidden">
          <div className="flex h-[60px] items-center justify-end px-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className={cn(
                "h-5 w-5 transition-transform",
                collapsed ? "rotate-180" : ""
              )} />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="px-3 py-2">
              {links.map((link, i) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <Link
                    key={i}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                      "hover:bg-accent",
                      isActive ? "bg-accent text-accent-foreground" : "text-foreground/70",
                      collapsed ? "justify-center" : ""
                    )}
                  >
                    {link.icon}
                    {!collapsed && <span>{link.title}</span>}
                  </Link>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
