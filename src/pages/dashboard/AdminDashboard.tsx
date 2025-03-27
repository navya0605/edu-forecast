
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  PieChart, 
  Pie, 
  Bar, 
  Line,
  LineChart,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Users, Award, FileText, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock admin dashboard data
const generateMockAdminData = () => {
  // Overview stats
  const stats = {
    totalStudents: 1423,
    passRate: 72,
    averageScore: 68,
    completionRate: 79
  };
  
  // Results distribution
  const resultsData = [
    { name: 'Distinction', value: 287 },
    { name: 'Pass', value: 736 },
    { name: 'Fail', value: 254 },
    { name: 'Withdrawn', value: 146 }
  ];
  
  // Performance by module
  const moduleData = [
    { module: 'AAA', pass: 85, fail: 15 },
    { module: 'BBB', pass: 78, fail: 22 },
    { module: 'CCC', pass: 65, fail: 35 },
    { module: 'DDD', pass: 72, fail: 28 },
    { module: 'EEE', pass: 70, fail: 30 }
  ];
  
  // VLE activity trend over time
  const activityTrend = [
    { week: 'Week 1', clicks: 12500 },
    { week: 'Week 2', clicks: 14200 },
    { week: 'Week 3', clicks: 15800 },
    { week: 'Week 4', clicks: 13900 },
    { week: 'Week 5', clicks: 12300 },
    { week: 'Week 6', clicks: 16500 },
    { week: 'Week 7', clicks: 17200 },
    { week: 'Week 8', clicks: 15100 }
  ];
  
  // Recent notifications
  const recentNotifications = [
    { id: 1, type: 'warning', message: '12 students at risk of failing', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Module AAA assessments graded', time: '1 day ago' },
    { id: 3, type: 'success', message: '27 students improved their scores', time: '3 days ago' }
  ];
  
  return {
    stats,
    resultsData,
    moduleData,
    activityTrend,
    recentNotifications
  };
};

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // This would be a real API call in production
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock data for the admin dashboard
        const data = generateMockAdminData();
        setAdminData(data);
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout requireAdmin>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!adminData) {
    return (
      <DashboardLayout requireAdmin>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Error loading dashboard data</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </DashboardLayout>
    );
  }
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <DashboardLayout requireAdmin>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of student performance and platform analytics
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/admin/students">
                <Users className="mr-2 h-4 w-4" />
                Student List
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/feedback">
                <FileText className="mr-2 h-4 w-4" />
                Send Feedback
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{adminData.stats.totalStudents}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{adminData.stats.passRate}%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{adminData.stats.averageScore}/100</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Layers className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{adminData.stats.completionRate}%</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <CardTitle>Results Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of student results across all modules
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={adminData.resultsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {adminData.resultsData.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                      formatter={(value) => [`${value} students`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <CardTitle>Module Performance</CardTitle>
                  <CardDescription>
                    Pass/fail rates by module
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={adminData.moduleData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="module" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                      formatter={(value) => [`${value}%`, '']}
                    />
                    <Legend />
                    <Bar dataKey="pass" name="Pass Rate" fill="#0088FE" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="fail" name="Fail Rate" fill="#FF8042" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <CardTitle>VLE Activity Trend</CardTitle>
                  <CardDescription>
                    Weekly platform engagement over time
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={adminData.activityTrend}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="clicks" 
                      name="Total Clicks"
                      stroke="#0088FE" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>Recent Notifications</CardTitle>
                </div>
                <Link 
                  to="/admin/feedback" 
                  className="text-sm text-primary hover:underline"
                >
                  Send Feedback
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminData.recentNotifications.map((notification: any) => (
                  <div 
                    key={notification.id}
                    className="flex items-start space-x-3 p-3 rounded-md bg-accent/50"
                  >
                    <div className="mt-0.5">
                      {notification.type === 'warning' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-500">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      )}
                      {notification.type === 'info' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-500">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      )}
                      {notification.type === 'success' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
