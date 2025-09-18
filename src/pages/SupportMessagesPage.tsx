import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Eye, Reply } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

interface SupportMessage {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'general' | 'complaint';
  createdAt: string;
  updatedAt: string;
  response?: string;
}

// Mock data for demonstration
const mockMessages: SupportMessage[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Smith',
    userEmail: 'john@example.com',
    subject: 'Payment Issue with Order #12345',
    message: 'I am having trouble with my payment processing. The transaction failed but amount was debited.',
    priority: 'high',
    status: 'new',
    category: 'billing',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    subject: 'Cannot access my dashboard',
    message: 'I keep getting an error when trying to log into my provider dashboard.',
    priority: 'medium',
    status: 'in-progress',
    category: 'technical',
    createdAt: '2024-01-19T14:15:00Z',
    updatedAt: '2024-01-20T09:00:00Z'
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Mike Wilson',
    userEmail: 'mike@example.com',
    subject: 'Service quality complaint',
    message: 'The service I received was not as described. I would like a refund.',
    priority: 'urgent',
    status: 'new',
    category: 'complaint',
    createdAt: '2024-01-20T08:45:00Z',
    updatedAt: '2024-01-20T08:45:00Z'
  }
];

const SupportMessagesPage = () => {
  const [messages, setMessages] = useState<SupportMessage[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null);
  const [response, setResponse] = useState('');

  const filteredMessages = messages.filter(message =>
    message.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateMessageStatus = (messageId: string, status: SupportMessage['status']) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status, updatedAt: new Date().toISOString() } : msg
    ));
    toast({
      title: "Status Updated",
      description: `Message status changed to ${status}`,
    });
  };

  const sendResponse = () => {
    if (!selectedMessage || !response.trim()) return;
    
    setMessages(prev => prev.map(msg =>
      msg.id === selectedMessage.id 
        ? { ...msg, response, status: 'resolved', updatedAt: new Date().toISOString() }
        : msg
    ));
    
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the user",
    });
    
    setResponse('');
    setSelectedMessage(null);
  };

  const getPriorityBadge = (priority: SupportMessage['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const getStatusBadge = (status: SupportMessage['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
    }
  };

  const newMessages = messages.filter(m => m.status === 'new').length;
  const inProgressMessages = messages.filter(m => m.status === 'in-progress').length;
  const resolvedMessages = messages.filter(m => m.status === 'resolved').length;

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Support Messages</h1>
            <p className="text-muted-foreground">Manage and respond to user support requests</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                  <p className="text-2xl font-bold">{messages.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Messages</p>
                  <p className="text-2xl font-bold text-blue-600">{newMessages}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{inProgressMessages}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedMessages}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by user name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>All Messages ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{message.subject}</h3>
                        {getPriorityBadge(message.priority)}
                        {getStatusBadge(message.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        From: {message.userName} ({message.userEmail})
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Category: {message.category} • {new Date(message.createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm">{message.message.substring(0, 100)}...</p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{message.subject}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {getPriorityBadge(message.priority)}
                              {getStatusBadge(message.status)}
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">From: {message.userName} ({message.userEmail})</p>
                              <p className="text-sm text-muted-foreground">Date: {new Date(message.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Message:</h4>
                              <p className="text-sm bg-accent/50 p-3 rounded">{message.message}</p>
                            </div>
                            
                            {message.response && (
                              <div>
                                <h4 className="font-semibold mb-2">Admin Response:</h4>
                                <p className="text-sm bg-primary/10 p-3 rounded">{message.response}</p>
                              </div>
                            )}
                            
                            {message.status !== 'resolved' && message.status !== 'closed' && (
                              <div className="space-y-3">
                                <h4 className="font-semibold">Send Response:</h4>
                                <Textarea
                                  placeholder="Type your response..."
                                  value={response}
                                  onChange={(e) => setResponse(e.target.value)}
                                  rows={4}
                                />
                                <div className="flex gap-2">
                                  <Button onClick={sendResponse}>
                                    <Reply className="w-4 h-4 mr-1" />
                                    Send Response
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => updateMessageStatus(message.id, 'in-progress')}
                                  >
                                    Mark In Progress
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {message.status === 'new' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, 'in-progress')}
                        >
                          Start
                        </Button>
                      )}
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

export default SupportMessagesPage;