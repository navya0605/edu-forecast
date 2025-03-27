
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface StudentPerformanceChartProps {
  studentData: {
    id: string;
    scores: {
      date: string;
      score: number;
      avg: number;
    }[];
  };
}

const StudentPerformanceChart = ({ studentData }: StudentPerformanceChartProps) => {
  const data = useMemo(() => {
    return studentData.scores.map(item => ({
      date: item.date,
      score: item.score,
      average: item.avg
    }));
  }, [studentData]);
  
  // Calculate performance metrics
  const averageScore = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / data.length);
  }, [data]);
  
  const trend = useMemo(() => {
    if (data.length < 2) return 'stable';
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    
    const firstAvg = firstHalf.reduce((acc, curr) => acc + curr.score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((acc, curr) => acc + curr.score, 0) / secondHalf.length;
    
    if (secondAvg - firstAvg > 5) return 'improving';
    if (firstAvg - secondAvg > 5) return 'declining';
    return 'stable';
  }, [data]);
  
  const trendColor = {
    improving: 'text-green-500',
    declining: 'text-red-500',
    stable: 'text-amber-500'
  };
  
  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>
              Assessment scores comparison with class average
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold">{averageScore}%</div>
            <div className={`text-sm ${trendColor[trend as keyof typeof trendColor]}`}>
              {trend === 'improving' ? '↑ Improving' : 
               trend === 'declining' ? '↓ Declining' : '→ Stable'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ opacity: 0.3 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ opacity: 0.3 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }} 
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Your Score"
            />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ strokeWidth: 0, r: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Class Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudentPerformanceChart;
