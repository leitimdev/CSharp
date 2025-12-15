import { useState, useEffect } from 'react'
import api from '../services/api'
import { Calendar, Users, Dog, DollarSign, TrendingUp } from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      const response = await api.get('/relatorios/dashboard')
      setStats(response.data)
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Carregando dashboard...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral do seu petshop</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe' }}>
            <Calendar size={24} color="#1e40af" />
          </div>
          <div className="stat-content">
            <h3>{stats?.totais.totalAgendamentos || 0}</h3>
            <p>Total de Agendamentos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5' }}>
            <TrendingUp size={24} color="#065f46" />
          </div>
          <div className="stat-content">
            <h3>{stats?.totais.agendamentosConcluidos || 0}</h3>
            <p>Concluídos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>
            <Calendar size={24} color="#92400e" />
          </div>
          <div className="stat-content">
            <h3>{stats?.totais.agendamentosPendentes || 0}</h3>
            <p>Pendentes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5' }}>
            <DollarSign size={24} color="#065f46" />
          </div>
          <div className="stat-content">
            <h3>R$ {stats?.financeiro.faturamentoTotal?.toFixed(2) || '0.00'}</h3>
            <p>Faturamento Total</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">Serviços Mais Utilizados</div>
          <div className="list">
            {stats?.servicosMaisUtilizados?.map((servico, index) => (
              <div key={servico.servicoId} className="list-item">
                <div>
                  <strong>{servico.nomeServico}</strong>
                  <small>{servico.quantidade} agendamentos</small>
                </div>
                <span className="badge badge-info">R$ {servico.faturamento.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">Profissionais Mais Ocupados</div>
          <div className="list">
            {stats?.profissionaisMaisOcupados?.map((prof, index) => (
              <div key={prof.profissionalId} className="list-item">
                <div>
                  <strong>{prof.nomeProfissional}</strong>
                  <small>{prof.quantidade} agendamentos</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
