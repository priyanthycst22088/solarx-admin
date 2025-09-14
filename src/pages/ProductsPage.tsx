import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Package, Search, Filter, MoreHorizontal, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Product {
  id: string;
  name: string;
  category: string;
  provider: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  visible: boolean;
  dateAdded: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Solar Panel Kit Pro',
    category: 'Solar Panels',
    provider: 'SolarTech Solutions',
    price: 2500,
    status: 'approved',
    visible: true,
    dateAdded: '2024-01-15',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Battery Storage System',
    category: 'Storage',
    provider: 'Green Energy Co',
    price: 3200,
    status: 'pending',
    visible: false,
    dateAdded: '2024-01-14',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Inverter Plus',
    category: 'Inverters',
    provider: 'EcoSolar Systems',
    price: 1800,
    status: 'approved',
    visible: true,
    dateAdded: '2024-01-10',
    image: '/placeholder.svg'
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: Product['status']) => {
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

  const toggleVisibility = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, visible: !product.visible }
        : product
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products Management</h1>
            <p className="text-muted-foreground">Manage product listings and visibility</p>
          </div>
          <Button className="gap-2">
            <Package className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products by name or category..."
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent rounded-lg overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
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
                    {getStatusBadge(product.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Provider</span>
                    <span className="text-sm">{product.provider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium">${product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date Added</span>
                    <span className="text-sm">{new Date(product.dateAdded).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Visible</span>
                    <div className="flex items-center gap-2">
                      {product.visible ? <Eye className="w-4 h-4 text-success" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      <Switch 
                        checked={product.visible} 
                        onCheckedChange={() => toggleVisibility(product.id)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    {product.status === 'pending' && (
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

export default ProductsPage;