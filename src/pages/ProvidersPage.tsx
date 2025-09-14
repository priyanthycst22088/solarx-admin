import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, Search, Filter, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Provider {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'pending' | 'approved' | 'rejected' | 'disabled';
  joinDate: string;
  productsCount: number;
  servicesCount: number;
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'SolarTech Solutions',
    email: 'contact@solartech.com',
    company: 'SolarTech Solutions Inc.',
    status: 'approved',
    joinDate: '2024-01-15',
    productsCount: 12,
    servicesCount: 8
  },
  {
    id: '2',
    name: 'Green Energy Co',
    email: 'info@greenenergy.com',
    company: 'Green Energy Corporation',
    status: 'pending',
    joinDate: '2024-01-14',
    productsCount: 0,
    servicesCount: 0
  },
  {
    id: '3',
    name: 'EcoSolar Systems',
    email: 'hello@ecosolar.com',
    company: 'EcoSolar Systems Ltd.',
    status: 'rejected',
    joinDate: '2024-01-10',
    productsCount: 0,
    servicesCount: 0
  }
];

const ProvidersPage = () => {
  const [providers] = useState<Provider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: Provider['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'disabled':
        return <Badge variant="secondary">Disabled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Providers Management</h1>
            <p className="text-muted-foreground">Manage service providers and their offerings</p>
          </div>
          <Button className="gap-2">
            <Building2 className="w-4 h-4" />
            Add Provider
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search providers by name or company..."
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

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card key={provider.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{provider.email}</p>
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
                    {getStatusBadge(provider.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Company</span>
                    <span className="text-sm">{provider.company}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Products</span>
                    <span className="font-medium">{provider.productsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Services</span>
                    <span className="font-medium">{provider.servicesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Joined</span>
                    <span className="text-sm">{new Date(provider.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    {provider.status === 'pending' && (
                      <>
                        <Button size="sm" variant="default" className="gap-1 bg-success hover:bg-success/90 text-success-foreground">
                          <CheckCircle className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1">
                          <XCircle className="w-3 h-3" />
                          Reject
                        </Button>
                      </>
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

export default ProvidersPage;