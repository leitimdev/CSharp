import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Building2, DollarSign, FileText, 
  TrendingUp, Mail, Settings, Menu, X, 
  ShoppingCart, ClipboardCheck, Briefcase 
} from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-600' },
    { path: '/pre-vendas', icon: Users, label: 'Pré-Vendas', color: 'text-purple-600' },
    { path: '/comercial', icon: ShoppingCart, label: 'Comercial', color: 'text-green-600' },
    { path: '/administrativo', icon: ClipboardCheck, label: 'Administrativo', color: 'text-orange-600' },
    { path: '/financeiro', icon: DollarSign, label: 'Financeiro', color: 'text-emerald-600' },
    { path: '/pos-venda', icon: Briefcase, label: 'Pós-Venda', color: 'text-indigo-600' },
    { path: '/funil-vendas', icon: TrendingUp, label: 'Funil de Vendas', color: 'text-red-600' },
    { path: '/contratos', icon: FileText, label: 'Contratos', color: 'text-cyan-600' },
    { path: '/comissoes', icon: DollarSign, label: 'Comissões', color: 'text-yellow-600' },
    { path: '/integracoes', icon: Building2, label: 'Integrações', color: 'text-pink-600' },
    { path: '/emails', icon: Mail, label: 'E-mails Automáticos', color: 'text-violet-600' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-primary-600">Mais Imobiliária</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} className={isActive(item.path) ? item.color : ''} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            to="/configuracoes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Bem-vindo, Admin</span>
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
