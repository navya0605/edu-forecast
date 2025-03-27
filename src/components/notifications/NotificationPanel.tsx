
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, File, X, Info, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'document';
  link?: string;
}

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mock notifications - in a real app, this would come from an API
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Performance feedback',
        message: 'Your instructor has provided feedback on your recent assessment.',
        timestamp: '1 hour ago',
        read: false,
        type: 'info',
        link: '/feedback/1'
      },
      {
        id: '2',
        title: 'Study recommendation',
        message: 'Based on your recent activity, we recommend reviewing module 3 materials.',
        timestamp: '3 hours ago',
        read: false,
        type: 'document',
        link: '/resources/module3'
      },
      {
        id: '3',
        title: 'Warning: Low engagement',
        message: 'Your activity level has decreased. Consider increasing your participation.',
        timestamp: '2 days ago',
        read: true,
        type: 'warning'
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);
  
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));
    
    // Navigate if link exists
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'document':
        return <File className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };
  
  return (
    <Card className="w-80 shadow-lg animate-slide-in overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Notifications</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-2">
        {notifications.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 mb-1 rounded-md hover:bg-accent cursor-pointer transition-all ${
                  notification.read ? 'opacity-70' : 'border-l-2 border-primary'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{notification.message}</p>
                    <p className="text-xs text-muted-foreground opacity-70">{notification.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 opacity-70">
            <Bell className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
