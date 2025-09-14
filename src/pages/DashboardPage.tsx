import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/dashboard/KPICard';
import { PlatformPerformanceChart, UserActivityChart } from '@/components/dashboard/Charts';
import { AlertsSection } from '@/components/dashboard/AlertsSection';
import { 
  Users, 
  Building2, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Clock
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProviders: number;
  pendingProviders: number;
  totalProducts: number;
  pendingProducts: number;
  totalOrders: number;
  totalRevenue: number;
  jobApplications: number;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'pending' | 'approved' | 'rejected' | 'disabled';
  joinDate: string;
  productsCount: number;
  servicesCount: number;
}

export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalProviders: 0,
    pendingProviders: 0,
    totalProducts: 0,
    pendingProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    jobApplications: 0
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentProviders, setRecentProviders] = useState<Provider[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockStats: DashboardStats = {
      totalUsers: 1247,
      activeUsers: 892,
      totalProviders: 156,
      pendingProviders: 23,
      totalProducts: 342,
      pendingProducts: 18,
      totalOrders: 589,
      totalRevenue: 127450,
      jobApplications: 67
    };

    const mockRecentOrders: Order[] = [
      {
        id: 'ORD-001',
        customer: 'John Smith',
        items: ['Solar Panel Kit Pro'],
        total: 2500,
        status: 'delivered',
        date: '2024-01-15'
      },
      {
        id: 'ORD-002',
        customer: 'Sarah Johnson',
        items: ['Battery Storage System'],
        total: 3200,
        status: 'shipped',
        date: '2024-01-14'
      },
      {
        id: 'ORD-003',
        customer: 'Mike Wilson',
        items: ['Inverter Plus'],
        total: 1800,
        status: 'processing',
        date: '2024-01-14'
      }
    ];

    const mockRecentProviders: Provider[] = [
      {
        id: 'PROV-001',
        name: 'SolarTech Solutions',
        email: 'contact@solartech.com',
        company: 'SolarTech Solutions Inc.',
        status: 'approved',
        joinDate: '2024-01-15',
        productsCount: 12,
        servicesCount: 8
      },
      {
        id: 'PROV-002',
        name: 'Green Energy Co',
        email: 'info@greenenergy.com',
        company: 'Green Energy Corporation',
        status: 'pending',
        joinDate: '2024-01-14',
        productsCount: 0,
        servicesCount: 0
      }
    ];

    setStats(mockStats);
    setRecentOrders(mockRecentOrders);
    setRecentProviders(mockRecentProviders);
  }, []);

  const kpiData = [
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`,
      subtitle: `From ${stats.totalOrders} orders`,
      trend: { value: 12.5, isPositive: true },
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'New Users',
      value: stats.totalUsers.toLocaleString(),
      subtitle: `${stats.activeUsers} active users`,
      trend: { value: 8.2, isPositive: true },
      icon: Users,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      subtitle: `${stats.pendingProviders} pending`,
      trend: { value: 3.1, isPositive: false },
      icon: ShoppingCart,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Job Applications',
      value: stats.jobApplications.toLocaleString(),
      subtitle: 'This month',
      trend: { value: 15.7, isPositive: true },
      icon: Briefcase,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to SolarX Admin Panel</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformPerformanceChart />
        <UserActivityChart />
      </div>

      {/* Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsSection />
        
        {/* Recent Orders */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Clock className="w-5 h-5 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${order.total.toLocaleString()}</p>
                    <span className={`status-badge ${
                      order.status === 'delivered' ? 'status-success' :
                      order.status === 'shipped' ? 'status-success' :
                      order.status === 'processing' ? 'status-warning' :
                      'status-pending'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;