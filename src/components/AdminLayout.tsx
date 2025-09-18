import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  Package, 
  ShoppingCart, 
  Star, 
  Briefcase, 
  FileText, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  MessageSquare
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Providers', href: '/providers', icon: Building2 },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Services', href: '/services', icon: ShoppingCart },
  { name: 'Job Openings', href: '/jobs', icon: Briefcase },
  { name: 'Q&A', href: '/qa', icon: MessageSquare },
  { name: 'Blogs', href: '/blogs', icon: FileText },
  { name: 'Transactions', href: '/transactions', icon: ShoppingCart },
  { name: 'Reviews', href: '/reviews', icon: Star },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Support Messages', href: '/support', icon: Bell },
  { name: 'System Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    console.log("Logout clicked");
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar backdrop-blur-lg border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0 flex flex-col shadow-lg`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border flex-shrink-0">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            SolarX Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-item ${
                  isActive
                    ? 'sidebar-item-active'
                    : 'sidebar-item-inactive'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
                <p className="text-xs text-sidebar-foreground/70">admin@solarx.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-card/80 backdrop-blur-lg border-b border-border px-6 py-4 flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;