import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, Filter, MoreHorizontal, CheckCircle, XCircle, Eye } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Review {
  id: string;
  product: string;
  customer: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    product: 'Solar Panel Kit Pro',
    customer: 'John Smith',
    rating: 5,
    comment: 'Excellent product! Installation was smooth and the panels are performing great.',
    status: 'approved',
    date: '2024-01-15',
    helpful: 12
  },
  {
    id: '2',
    product: 'Battery Storage System',
    customer: 'Sarah Johnson',
    rating: 4,
    comment: 'Good quality battery system. Would recommend to others.',
    status: 'pending',
    date: '2024-01-14',
    helpful: 0
  },
  {
    id: '3',
    product: 'Inverter Plus',
    customer: 'Mike Wilson',
    rating: 2,
    comment: 'Product arrived damaged and customer service was unhelpful.',
    status: 'pending',
    date: '2024-01-14',
    helpful: 0
  }
];

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: Review['status']) => {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const updateReviewStatus = (reviewId: string, newStatus: Review['status']) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: newStatus }
        : review
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reviews Management</h1>
            <p className="text-muted-foreground">Moderate customer reviews and ratings</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search reviews by product or customer..."
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

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{review.product}</CardTitle>
                      {getStatusBadge(review.status)}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">By {review.customer}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium ml-2">{review.rating}/5</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-foreground">{review.comment}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {review.helpful} people found this helpful
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="w-3 h-3" />
                        View Full
                      </Button>
                      {review.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1 bg-success hover:bg-success/90 text-success-foreground"
                            onClick={() => updateReviewStatus(review.id, 'approved')}
                          >
                            <CheckCircle className="w-3 h-3" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="gap-1"
                            onClick={() => updateReviewStatus(review.id, 'rejected')}
                          >
                            <XCircle className="w-3 h-3" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
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

export default ReviewsPage;