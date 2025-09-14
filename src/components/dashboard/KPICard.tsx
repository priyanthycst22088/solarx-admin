import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  gradient: string;
}

export function KPICard({ title, value, subtitle, trend, icon: Icon, gradient }: KPICardProps) {
  return (
    <Card className="kpi-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-foreground">{value}</h3>
              {trend && (
                <div className={`flex items-center gap-1 ${trend.isPositive ? 'trend-positive' : 'trend-negative'}`}>
                  {trend.isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}