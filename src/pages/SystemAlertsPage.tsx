import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Search, Bell, Users, Star, AlertTriangle, CheckCircle, Info, Settings } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface SystemAlert {
  id: string;
  type: 'registration' | 'review' | 'system' | 'transaction' | 'provider' | 'support';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  read: boolean;
  createdAt: string;
  actionRequired?: boolean;
  relatedId?: string;
}

// Mock data for demonstration
const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'registration',
    title: 'New User Registration',
    message: 'John Doe has registered as a new user',
    priority: 'low',
    read: false,
    createdAt: '2024-01-20T10:30:00Z',
    actionRequired: false,
    relatedId: 'user123'
  },
  {
    id: '2',
    type: 'provider',
    title: 'Provider Application Pending',
    message: 'SolarTech Solutions has submitted a provider application for review',
    priority: 'medium',
    read: false,
    createdAt: '2024-01-20T09:15:00Z',
    actionRequired: true,
    relatedId: 'provider456'
  },
  {
    id: '3',
    type: 'review',
    title: 'Inappropriate Review Flagged',
    message: 'A review for "Solar Panel Installation" has been flagged for inappropriate content',
    priority: 'high',
    read: false,
    createdAt: '2024-01-20T08:45:00Z',
    actionRequired: true,
    relatedId: 'review789'
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance Scheduled',
    message: 'System maintenance is scheduled for tonight at 2:00 AM EST',
    priority: 'medium',
    read: true,
    createdAt: '2024-01-19T16:00:00Z',
    actionRequired: false
  },
  {
    id: '5',
    type: 'transaction',
    title: 'Payment Dispute Raised',
    message: 'Customer has raised a dispute for transaction #TX12345',
    priority: 'critical',
    read: false,
    createdAt: '2024-01-20T11:20:00Z',
    actionRequired: true,
    relatedId: 'tx12345'
  }
];

const SystemAlertsPage = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    toast({
      title: "All alerts marked as read",
    });
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert deleted",
    });
  };

  const getAlertIcon = (type: SystemAlert['type']) => {
    switch (type) {
      case 'registration':
        return <Users className="w-5 h-5" />;
      case 'review':
        return <Star className="w-5 h-5" />;
      case 'system':
        return <Settings className="w-5 h-5" />;
      case 'transaction':
        return <AlertTriangle className="w-5 h-5" />;
      case 'provider':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getPriorityBadge = (priority: SystemAlert['priority']) => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const getTypeBadge = (type: SystemAlert['type']) => {
    const typeColors = {
      registration: 'bg-blue-100 text-blue-800',
      review: 'bg-purple-100 text-purple-800',
      system: 'bg-gray-100 text-gray-800',
      transaction: 'bg-red-100 text-red-800',
      provider: 'bg-green-100 text-green-800',
      support: 'bg-indigo-100 text-indigo-800'
    };
    
    return <Badge className={typeColors[type]}>{type}</Badge>;
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const criticalCount = alerts.filter(alert => alert.priority === 'critical' && !alert.read).length;
  const actionRequiredCount = alerts.filter(alert => alert.actionRequired && !alert.read).length;

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Alerts & Notifications</h1>
            <p className="text-muted-foreground">Monitor system events and user activities</p>
          </div>
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                </div>
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                </div>
                <Info className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                  <p className="text-2xl font-bold text-orange-600">{actionRequiredCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search alerts by title, message, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Alerts ({filteredAlerts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 border rounded-lg transition-colors ${
                    alert.read ? 'bg-background opacity-75' : 'bg-accent/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-1 ${alert.read ? 'text-muted-foreground' : 'text-primary'}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${alert.read ? 'text-muted-foreground' : ''}`}>
                            {alert.title}
                          </h3>
                          {!alert.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                        </div>
                        <p className={`text-sm mb-2 ${alert.read ? 'text-muted-foreground' : ''}`}>
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(alert.priority)}
                          {getTypeBadge(alert.type)}
                          {alert.actionRequired && (
                            <Badge variant="outline" className="text-orange-700">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(alert.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {!alert.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(alert.id)}
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SystemAlertsPage;