import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, orders: 1200 },
  { month: 'Feb', revenue: 52000, orders: 1400 },
  { month: 'Mar', revenue: 48000, orders: 1300 },
  { month: 'Apr', revenue: 61000, orders: 1600 },
  { month: 'May', revenue: 55000, orders: 1500 },
  { month: 'Jun', revenue: 67000, orders: 1800 },
];

const userActivityData = [
  { week: 'Week 1', registrations: 120, engagement: 85 },
  { week: 'Week 2', registrations: 140, engagement: 92 },
  { week: 'Week 3', registrations: 160, engagement: 88 },
  { week: 'Week 4', registrations: 180, engagement: 95 },
];

export function PlatformPerformanceChart() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Platform Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function UserActivityChart() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">User Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="engagement" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}