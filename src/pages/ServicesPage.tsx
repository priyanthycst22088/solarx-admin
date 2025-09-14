import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ShoppingCart, Search, Filter, MoreHorizontal, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Service {
  id: string;
  name: string;
  category: string;
  provider: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  visible: boolean;
  dateAdded: string;
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Solar Installation Service',
    category: 'Installation',
    provider: 'SolarTech Solutions',
    price: 5000,
    status: 'approved',
    visible: true,
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    name: 'Maintenance Package',
    category: 'Maintenance',
    provider: 'Green Energy Co',
    price: 800,
    status: 'pending',
    visible: false,
    dateAdded: '2024-01-14'
  },
  {
    id: '3',
    name: 'System Consultation',
    category: 'Consulting',
    provider: 'EcoSolar Systems',
    price: 200,
    status: 'approved',
    visible: true,
    dateAdded: '2024-01-10'
  }
];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: Service['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const toggleVisibility = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, visible: !service.visible }
        : service
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
            <p className="text-muted-foreground">Manage service offerings and visibility</p>
          </div>
          <Button className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add Service
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services by name or category..."
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{service.category}</p>
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
                    {getStatusBadge(service.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Provider</span>
                    <span className="text-sm">{service.provider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium">${service.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date Added</span>
                    <span className="text-sm">{new Date(service.dateAdded).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Visible</span>
                    <div className="flex items-center gap-2">
                      {service.visible ? <Eye className="w-4 h-4 text-success" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      <Switch 
                        checked={service.visible} 
                        onCheckedChange={() => toggleVisibility(service.id)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    {service.status === 'pending' && (
                      <Button size="sm" variant="default" className="bg-success hover:bg-success/90 text-success-foreground">
                        Approve
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

export default ServicesPage;