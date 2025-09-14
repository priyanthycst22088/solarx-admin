import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Filter, MoreHorizontal, ThumbsUp, MessageCircle } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface QAItem {
  id: string;
  question: string;
  askedBy: string;
  category: string;
  status: 'answered' | 'pending' | 'closed';
  votes: number;
  answers: number;
  dateAsked: string;
}

const mockQAItems: QAItem[] = [
  {
    id: '1',
    question: 'What is the average lifespan of solar panels?',
    askedBy: 'John Smith',
    category: 'Solar Panels',
    status: 'answered',
    votes: 15,
    answers: 3,
    dateAsked: '2024-01-15'
  },
  {
    id: '2',
    question: 'How much can I save with a solar installation?',
    askedBy: 'Sarah Johnson',
    category: 'Cost & Savings',
    status: 'pending',
    votes: 8,
    answers: 0,
    dateAsked: '2024-01-14'
  },
  {
    id: '3',
    question: 'What maintenance is required for solar systems?',
    askedBy: 'Mike Wilson',
    category: 'Maintenance',
    status: 'answered',
    votes: 22,
    answers: 5,
    dateAsked: '2024-01-10'
  }
];

const QAPage = () => {
  const [qaItems] = useState<QAItem[]>(mockQAItems);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: QAItem['status']) => {
    switch (status) {
      case 'answered':
        return <Badge variant="success">Answered</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Q&A Management</h1>
            <p className="text-muted-foreground">Manage community questions and answers</p>
          </div>
          <Button className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Add Q&A
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search questions..."
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

        {/* Q&A List */}
        <div className="space-y-4">
          {qaItems.map((item) => (
            <Card key={item.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-muted-foreground">Asked by {item.askedBy}</span>
                      <Badge variant="outline">{item.category}</Badge>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.votes} votes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.answers} answers</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.dateAsked).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {item.status === 'pending' && (
                      <Button size="sm" variant="default">
                        Answer
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

export default QAPage;