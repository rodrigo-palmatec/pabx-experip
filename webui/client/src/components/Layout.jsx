import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  LayoutDashboard, 
  Phone, 
  Network, 
  PhoneCall, 
  Settings, 
  LogOut,
  Menu,
  X,
  Users,
  Clock,
  BarChart3,
  Ban,
  Layers,
  GitBranch,
  UserCog,
  Building2,
  Video,
  MessageSquare,
  CalendarDays,
  ArrowDownToLine,
  ArrowUpFromLine,
  BookUser,
  MousePointerClick
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/extensions', icon: Phone, label: 'Ramais' },
  { path: '/categories', icon: Layers, label: 'Categorias' },
  { path: '/groups', icon: Users, label: 'Grupos' },
  { path: '/profiles', icon: UserCog, label: 'Perfis' },
  { path: '/cost-centers', icon: Building2, label: 'Centros de Custo' },
  { path: '/queues', icon: GitBranch, label: 'Filas' },
  { path: '/ivrs', icon: MessageSquare, label: 'URA/IVR' },
  { path: '/conferences', icon: Video, label: 'Conferências' },
  { path: '/trunks', icon: Network, label: 'Troncos' },
  { path: '/inbound-routes', icon: ArrowDownToLine, label: 'Rotas Entrada' },
  { path: '/outbound-routes', icon: ArrowUpFromLine, label: 'Rotas Saída' },
  { path: '/calls', icon: PhoneCall, label: 'Chamadas' },
  { path: '/click-to-call', icon: MousePointerClick, label: 'Click-to-Call' },
  { path: '/service-hours', icon: Clock, label: 'Horários' },
  { path: '/holidays', icon: CalendarDays, label: 'Feriados' },
  { path: '/blacklist', icon: Ban, label: 'Blacklist' },
  { path: '/contacts', icon: BookUser, label: 'Contatos' },
  { path: '/reports', icon: BarChart3, label: 'Relatórios' },
  { path: '/system', icon: Settings, label: 'Sistema' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-200
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">PABX Experip</h1>
                <p className="text-xs text-gray-500">Palmatec</p>
              </div>
            </div>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
