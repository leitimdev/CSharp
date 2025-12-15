import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, Calendar, Users, Dog, Scissors, UserCog, BarChart3, Home } from 'lucide-react'
import './Layout.css'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Dog size={32} />
          <h2>PetShop</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/agendamentos" className="nav-item">
            <Calendar size={20} />
            <span>Agendamentos</span>
          </Link>
          <Link to="/clientes" className="nav-item">
            <Users size={20} />
            <span>Clientes</span>
          </Link>
          <Link to="/pets" className="nav-item">
            <Dog size={20} />
            <span>Pets</span>
          </Link>
          <Link to="/servicos" className="nav-item">
            <Scissors size={20} />
            <span>Serviços</span>
          </Link>
          <Link to="/profissionais" className="nav-item">
            <UserCog size={20} />
            <span>Profissionais</span>
          </Link>
          {user?.role === 'Admin' && (
            <Link to="/relatorios" className="nav-item">
              <BarChart3 size={20} />
              <span>Relatórios</span>
            </Link>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <strong>{user?.nome}</strong>
            <small>{user?.role}</small>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
