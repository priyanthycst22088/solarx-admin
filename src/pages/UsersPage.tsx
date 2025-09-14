import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, Filter, MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActivity: string;
  orders: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    lastActivity: '2024-01-20',
    orders: 5
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'active',
    joinDate: '2024-01-10',
    lastActivity: '2024-01-19',
    orders: 12
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    status: 'suspended',
    joinDate: '2023-12-20',
    lastActivity: '2024-01-15',
    orders: 3
  }
];

const UsersPage = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground">Manage user accounts and monitor activity</p>
        </div>
        <Button className="gap-2">
          <UserCheck className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="glass-card hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(user.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Orders</span>
                  <span className="font-medium">{user.orders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <span className="text-sm">{new Date(user.lastActivity).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  {user.status === 'suspended' ? (
                    <Button size="sm" variant="default" className="gap-1 bg-success hover:bg-success/90 text-success-foreground">
                      <UserCheck className="w-3 h-3" />
                      Activate
                    </Button>
                  ) : (
                    <Button size="sm" variant="destructive" className="gap-1">
                      <UserX className="w-3 h-3" />
                      Suspend
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;