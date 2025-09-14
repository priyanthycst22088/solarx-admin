import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, UserPlus, Star, MessageCircle, AlertTriangle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'registration',
    title: 'New User Registration',
    message: '5 new users registered in the last hour',
    time: '2 minutes ago',
    severity: 'info',
    icon: UserPlus
  },
  {
    id: 2,
    type: 'review',
    title: 'New Review Submitted',
    message: 'SolarTech Pro received a 5-star review',
    time: '5 minutes ago',
    severity: 'success',
    icon: Star
  },
  {
    id: 3,
    type: 'support',
    title: 'Support Message',
    message: 'New support ticket requires attention',
    time: '15 minutes ago',
    severity: 'warning',
    icon: MessageCircle
  },
  {
    id: 4,
    type: 'system',
    title: 'System Update',
    message: 'Scheduled maintenance in 2 hours',
    time: '30 minutes ago',
    severity: 'error',
    icon: AlertTriangle
  }
];

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case 'success': return 'status-success';
    case 'warning': return 'status-warning';
    case 'error': return 'status-error';
    default: return 'status-pending';
  }
};

export function AlertsSection() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Bell className="h-5 w-5 text-primary" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                    <Badge className={`status-badge ${getSeverityClass(alert.severity)}`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}