import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FileText, Search, Filter, MoreHorizontal, Eye, EyeOff, Calendar, User } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface Blog {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
  visible: boolean;
  dateCreated: string;
  views: number;
  image: string;
}

const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of Solar Energy Technology',
    author: 'Admin',
    category: 'Technology',
    status: 'published',
    visible: true,
    dateCreated: '2024-01-15',
    views: 1250,
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'How to Choose the Right Solar Panel System',
    author: 'SolarTech Solutions',
    category: 'Guide',
    status: 'pending',
    visible: false,
    dateCreated: '2024-01-14',
    views: 0,
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Solar Energy Tax Benefits in 2024',
    author: 'Admin',
    category: 'Finance',
    status: 'draft',
    visible: false,
    dateCreated: '2024-01-10',
    views: 0,
    image: '/placeholder.svg'
  }
];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: Blog['status']) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const toggleVisibility = (blogId: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, visible: !blog.visible }
        : blog
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
            <p className="text-muted-foreground">Manage blog posts and content</p>
          </div>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Create Post
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search blog posts..."
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

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="w-full h-32 bg-accent rounded-lg overflow-hidden mb-3">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{blog.category}</Badge>
                      {getStatusBadge(blog.status)}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(blog.dateCreated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <span className="font-medium">{blog.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Visible</span>
                    <div className="flex items-center gap-2">
                      {blog.visible ? <Eye className="w-4 h-4 text-success" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      <Switch 
                        checked={blog.visible} 
                        onCheckedChange={() => toggleVisibility(blog.id)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    {blog.status === 'pending' && (
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

export default BlogsPage;