import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/dashboard/KPICard';
import { PlatformPerformanceChart, UserActivityChart } from '@/components/dashboard/Charts';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const AnalyticsPage = () => {
  const analyticsKPIs = [
    {
      title: 'Page Views',
      value: '125.4K',
      subtitle: 'This month',
      trend: { value: 18.2, isPositive: true },
      icon: Eye,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      subtitle: 'From visitors',
      trend: { value: 0.8, isPositive: true },
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Avg. Order Value',
      value: '$2,450',
      subtitle: 'Per transaction',
      trend: { value: 5.4, isPositive: false },
      icon: DollarSign,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Customer Retention',
      value: '68%',
      subtitle: 'Return customers',
      trend: { value: 12.1, isPositive: true },
      icon: Users,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive platform performance insights</p>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsKPIs.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              subtitle={kpi.subtitle}
              trend={kpi.trend}
              icon={kpi.icon}
              gradient={kpi.gradient}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlatformPerformanceChart />
          <UserActivityChart />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Solar Panel Kit Pro', sales: 145, revenue: '$362,500' },
                  { name: 'Battery Storage System', sales: 89, revenue: '$284,800' },
                  { name: 'Inverter Plus', sales: 67, revenue: '$120,600' }
                ].map((product, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <p className="font-semibold text-foreground">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Demographics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { age: '25-34', percentage: 35, users: '438 users' },
                  { age: '35-44', percentage: 28, users: '351 users' },
                  { age: '45-54', percentage: 22, users: '276 users' },
                  { age: '55+', percentage: 15, users: '188 users' }
                ].map((demo, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{demo.age}</span>
                      <span className="text-sm text-muted-foreground">{demo.users}</span>
                    </div>
                    <div className="w-full bg-accent/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-success h-2 rounded-full"
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: 'Organic Search', percentage: 45, visits: '56.2K' },
                  { source: 'Direct', percentage: 30, visits: '37.5K' },
                  { source: 'Social Media', percentage: 15, visits: '18.7K' },
                  { source: 'Referrals', percentage: 10, visits: '12.5K' }
                ].map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-sm text-muted-foreground">{source.visits}</span>
                    </div>
                    <div className="w-full bg-accent/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-success h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;