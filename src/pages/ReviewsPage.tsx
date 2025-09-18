import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, Filter, ThumbsUp, ThumbsDown, Flag, Eye, EyeOff, MessageSquare, AlertTriangle, MoreHorizontal } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'flagged' | 'disabled';
  reported: boolean;
  reportReason?: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customer: 'John Smith',
    product: 'Solar Panel Kit Pro',
    rating: 5,
    comment: 'Excellent product! Very satisfied with the installation process and customer service.',
    date: '2024-01-15',
    status: 'approved',
    reported: false
  },
  {
    id: '2',
    customer: 'Sarah Johnson',
    product: 'Battery Storage System',
    rating: 4,
    comment: 'Good battery system, works as expected. Installation could be better documented.',
    date: '2024-01-14',
    status: 'pending',
    reported: false
  },
  {
    id: '3',
    customer: 'Mike Wilson',
    product: 'Inverter Plus',
    rating: 1,
    comment: 'This product is terrible garbage and a complete waste of money. Horrible company!',
    date: '2024-01-10',
    status: 'flagged',
    reported: true,
    reportReason: 'Inappropriate language and false claims'
  },
  {
    id: '4',
    customer: 'Lisa Chen',
    product: 'Solar Roof Tiles',
    rating: 3,
    comment: 'Average product. Had some issues with durability but customer support helped resolve them.',
    date: '2024-01-08',
    status: 'approved',
    reported: false
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
        return <Badge variant="warning">Pending Review</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      case 'disabled':
        return <Badge variant="secondary">Disabled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const approveReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'approved' as Review['status'] }
        : review
    ));
  };

  const disableReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'disabled' as Review['status'] }
        : review
    ));
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{reviews.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-warning">{reviews.filter(r => r.status === 'pending').length}</p>
                </div>
                <Eye className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                  <p className="text-2xl font-bold text-destructive">{reviews.filter(r => r.status === 'flagged').length}</p>
                </div>
                <Flag className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reported</p>
                  <p className="text-2xl font-bold text-destructive">{reviews.filter(r => r.reported).length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reviews Management</h1>
            <p className="text-muted-foreground">Monitor and moderate customer reviews</p>
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
                  {review.reported && (
                    <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-md">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive">Reported: {review.reportReason}</span>
                    </div>
                  )}
                  <p className="text-foreground">{review.comment}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {review.status === 'pending' || review.status === 'flagged' ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1 bg-success hover:bg-success/90 text-success-foreground"
                            onClick={() => approveReview(review.id)}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="gap-1"
                            onClick={() => disableReview(review.id)}
                          >
                            <EyeOff className="w-3 h-3" />
                            Disable
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="w-3 h-3" />
                          View Details
                        </Button>
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