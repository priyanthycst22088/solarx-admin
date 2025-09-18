import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, Search, Filter, Eye, AlertTriangle, CheckCircle, DollarSign, Clock, Ban, XCircle } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'disputed' | 'refunded';
  method: string;
  date: string;
  items: string[];
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    orderId: 'ORD-001',
    customer: 'John Smith',
    amount: 2500,
    status: 'completed',
    method: 'Credit Card',
    date: '2024-01-15',
    items: ['Solar Panel Kit Pro']
  },
  {
    id: 'TXN-002',
    orderId: 'ORD-002',
    customer: 'Sarah Johnson',
    amount: 3200,
    status: 'pending',
    method: 'Bank Transfer',
    date: '2024-01-14',
    items: ['Battery Storage System']
  },
  {
    id: 'TXN-003',
    orderId: 'ORD-003',
    customer: 'Mike Wilson',
    amount: 1800,
    status: 'disputed',
    method: 'PayPal',
    date: '2024-01-14',
    items: ['Inverter Plus']
  },
  {
    id: 'TXN-004',
    orderId: 'ORD-004',
    customer: 'Emily Davis',
    amount: 950,
    status: 'failed',
    method: 'Credit Card',
    date: '2024-01-13',
    items: ['Solar Consultation']
  }
];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'disputed':
        return <Badge variant="destructive">Disputed</Badge>;
      case 'refunded':
        return <Badge variant="secondary">Refunded</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const resolveDispute = (transactionId: string, action: 'approve' | 'refund') => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: action === 'approve' ? 'completed' : 'refunded' as Transaction['status'] }
        : transaction
    ));
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{transactions.filter(t => t.status === 'pending').length}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disputes</p>
                  <p className="text-2xl font-bold text-destructive">{transactions.filter(t => t.status === 'disputed').length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-destructive">{transactions.filter(t => t.status === 'failed').length}</p>
                </div>
                <Ban className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Management</h1>
            <p className="text-muted-foreground">Monitor payments and resolve disputes</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions by ID or customer..."
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

        {/* Transactions Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.customer}</p>
                        <p className="text-sm text-muted-foreground">Order: {transaction.orderId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        {getStatusBadge(transaction.status)}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        {transaction.status === 'disputed' && (
                          <>
                            <Button size="sm" variant="default" className="gap-1 bg-success hover:bg-success/90 text-success-foreground" onClick={() => resolveDispute(transaction.id, 'approve')}>
                              <CheckCircle className="w-3 h-3" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" className="gap-1" onClick={() => resolveDispute(transaction.id, 'refund')}>
                              <XCircle className="w-3 h-3" />
                              Refund
                            </Button>
                          </>
                        )}
                        {transaction.status === 'failed' && (
                          <Button size="sm" variant="outline">
                            Retry
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TransactionsPage;