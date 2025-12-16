import { Users, TrendingUp, FileText, DollarSign, Calendar, Mail } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Dashboard = () => {
  const { leads, contratos, comissoes } = useApp();
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const stats = await api.getDashboardStats();
      const funil = await api.getFunnelData();
      const vendas = await api.getSalesData();
      
      setDashboardStats(stats);
      setFunnelData(funil);
      setSalesData(vendas);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  const stats = dashboardStats ? [
    {
      title: 'Leads Novos',
      value: dashboardStats.leadsNovos,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Visitas Agendadas',
      value: dashboardStats.visitasAgendadas,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Propostas Abertas',
      value: dashboardStats.propostasAbertas,
      icon: FileText,
      color: 'bg-yellow-500',
      change: '+5%'
    },
    {
      title: 'Contratos Ativos',
      value: dashboardStats.contratosAtivos,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Faturamento Mês',
      value: `R$ ${dashboardStats.faturamentoMes.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      change: '+22%'
    },
    {
      title: 'Comissões Pendentes',
      value: `R$ ${dashboardStats.comissoesPendentes.toLocaleString('pt-BR')}`,
      icon: Mail,
      color: 'bg-red-500',
      change: '+3%'
    },
  ] : [];

  if (!dashboardStats) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Visão geral da sua operação imobiliária</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-green-600 text-sm mt-2 font-medium">{stat.change} vs mês anterior</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Funil de Vendas */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Funil de Vendas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="etapa" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="quantidade" fill="#0ea5e9" name="Quantidade" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução de Vendas */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Evolução de Vendas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Line type="monotone" dataKey="vendas" stroke="#8b5cf6" name="Vendas" strokeWidth={2} />
              <Line type="monotone" dataKey="receita" stroke="#10b981" name="Receita (R$)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Leads Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Interesse</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Temperatura</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Etapa</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{lead.nome}</td>
                  <td className="py-3 px-4">{lead.email}</td>
                  <td className="py-3 px-4">{lead.imovelInteresse}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.temperatura === 'quente' ? 'bg-red-100 text-red-700' :
                      lead.temperatura === 'morno' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {lead.temperatura}
                    </span>
                  </td>
                  <td className="py-3 px-4 capitalize">{lead.etapaFunil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
