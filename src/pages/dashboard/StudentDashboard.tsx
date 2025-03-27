
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StudentPerformanceChart from '@/components/dashboard/StudentPerformanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  PieChart, 
  Pie, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Award } from 'lucide-react';

// Mock student data
const generateMockStudentData = () => {
  // Student details
  const student = {
    id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : '11391',
    name: 'John Doe',
    module: 'AAA',
    presentation: '2013J',
    gender: 'M',
    region: 'East Anglian Region',
    education: 'HE Qualification',
    imdBand: '90-100%',
    ageband: '35-55',
    finalResult: 'Pass'
  };
  
  // Assessment scores over time
  const generateScores = (count: number) => {
    const startScore = 65 + Math.floor(Math.random() * 10);
    const scores = [];
    
    for (let i = 0; i < count; i++) {
      // Random fluctuation with a slight upward trend
      const score = Math.min(100, Math.max(50, startScore + i * 2 + Math.floor(Math.random() * 10 - 5)));
      // Generate a date (in days since course start)
      const date = 10 + i * 15;
      // Generate a class average that's slightly lower than student's score
      const avg = Math.max(40, score - 5 - Math.floor(Math.random() * 10));
      
      scores.push({
        date: `Day ${date}`,
        score,
        avg
      });
    }
    
    return scores;
  };
  
  // VLE activity data (clicks per resource type)
  const vleData = [
    { name: 'Forum', clicks: 94 },
    { name: 'Resource', clicks: 127 },
    { name: 'Quiz', clicks: 43 },
    { name: 'URL', clicks: 65 },
    { name: 'Wiki', clicks: 31 }
  ];
  
  // Credits and completion data
  const creditsData = [
    { name: 'Completed', value: 180 },
    { name: 'In Progress', value: 60 },
    { name: 'Planned', value: 120 }
  ];
  
  return {
    student,
    scores: generateScores(6),
    vleData,
    creditsData
  };
};

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // This would be a real API call in production
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock data for the student
        const data = generateMockStudentData();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!studentData) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Error loading dashboard data</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </DashboardLayout>
    );
  }
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display tracking-tight">Welcome, Student {studentData.student.id}</h1>
          <p className="text-muted-foreground">
            Your personal academic dashboard and performance analytics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-sm md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Your personal and academic details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium">{studentData.student.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Module</p>
                  <p className="font-medium">{studentData.student.module}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Presentation</p>
                  <p className="font-medium">{studentData.student.presentation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-medium">{studentData.student.region}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="font-medium">{studentData.student.education}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Final Result</p>
                  <p className="font-medium">{studentData.student.finalResult}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Current Status</CardTitle>
              <CardDescription>Your academic standing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[130px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 mb-3">
                    <Award className="h-6 w-6 text-green-700" />
                  </div>
                  <h3 className="text-2xl font-bold">{studentData.student.finalResult}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current academic standing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <StudentPerformanceChart studentData={{ id: studentData.student.id, scores: studentData.scores }} />
        </div>
        
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
            <TabsTrigger value="credits" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Credits</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <CardTitle>VLE Activity Distribution</CardTitle>
                    <CardDescription>
                      Your engagement with different types of learning materials
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={studentData.vleData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="clicks" name="Number of Clicks" radius={[4, 4, 0, 0]}>
                        {studentData.vleData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="credits" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <CardTitle>Credits Status</CardTitle>
                    <CardDescription>
                      Distribution of your completed and planned credits
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentData.creditsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {studentData.creditsData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}
                        formatter={(value) => [`${value} credits`, 'Credits']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>
                      Analysis of your performance trends over time
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Assessment Avg</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">76%</span>
                      <span className="text-sm text-green-500 flex items-center">
                        +5.2%
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">VLE Engagement</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">92hrs</span>
                      <span className="text-sm text-green-500 flex items-center">
                        +12.8%
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">87%</span>
                      <span className="text-sm text-amber-500 flex items-center">
                        -2.3%
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground pt-2">
                  <strong>Analysis:</strong> Your performance shows an overall positive trend. Assessment scores have improved by 5.2% over the last period, and your VLE engagement is significantly higher than average. The slight decrease in completion rate is an area for attention, but it remains well above the minimum threshold.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
