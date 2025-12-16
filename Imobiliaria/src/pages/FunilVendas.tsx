import { TrendingUp, Thermometer, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FunilVendas = () => {
  const { leads } = useApp();

  const funnelStages = [
    { etapa: 'Novo', count: leads.filter(l => l.etapaFunil === 'novo').length, color: '#3b82f6' },
    { etapa: 'Contato', count: leads.filter(l => l.etapaFunil === 'contato').length, color: '#8b5cf6' },
    { etapa: 'Visita', count: leads.filter(l => l.etapaFunil === 'visita').length, color: '#ec4899' },
    { etapa: 'Proposta', count: leads.filter(l => l.etapaFunil === 'proposta').length, color: '#f59e0b' },
    { etapa: 'Negociação', count: leads.filter(l => l.etapaFunil === 'negociacao').length, color: '#10b981' },
    { etapa: 'Fechamento', count: leads.filter(l => l.etapaFunil === 'fechamento').length, color: '#ef4444' },
  ];

  const totalLeads = leads.length;
  const conversions = funnelStages.map((stage, index) => ({
    ...stage,
    taxa: index === 0 ? 100 : totalLeads > 0 ? (stage.count / totalLeads * 100).toFixed(1) : 0
  }));

  // Termômetro de Leads
  const leadsByTemp = {
    quente: leads.filter(l => l.temperatura === 'quente').length,
    morno: leads.filter(l => l.temperatura === 'morno').length,
    frio: leads.filter(l => l.temperatura === 'frio').length,
  };

  const thermometerData = [
    { temp: 'Quente', count: leadsByTemp.quente, percentage: (leadsByTemp.quente / totalLeads * 100).toFixed(0) },
    { temp: 'Morno', count: leadsByTemp.morno, percentage: (leadsByTemp.morno / totalLeads * 100).toFixed(0) },
    { temp: 'Frio', count: leadsByTemp.frio, percentage: (leadsByTemp.frio / totalLeads * 100).toFixed(0) },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Funil de Vendas</h1>
        <p className="text-gray-600">Análise completa do pipeline de vendas</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total de Leads</p>
              <p className="text-4xl font-bold">{totalLeads}</p>
            </div>
            <Users size={40} className="text-blue-200" />
          </div>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Taxa de Conversão</p>
              <p className="text-4xl font-bold">
                {totalLeads > 0 ? ((funnelStages[5].count / totalLeads) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <TrendingUp size={40} className="text-green-200" />
          </div>
        </div>
        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm mb-1">Leads Quentes</p>
              <p className="text-4xl font-bold">{leadsByTemp.quente}</p>
            </div>
            <Thermometer size={40} className="text-red-200" />
          </div>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Fechamentos</p>
              <p className="text-4xl font-bold">{funnelStages[5].count}</p>
            </div>
            <ArrowRight size={40} className="text-purple-200" />
          </div>
        </div>
      </div>

      {/* Funil Visual */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-6">Pipeline de Vendas</h2>
        <div className="space-y-4">
          {conversions.map((stage, index) => {
            const widthPercentage = totalLeads > 0 ? (stage.count / totalLeads) * 100 : 0;
            return (
              <div key={stage.etapa} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{stage.etapa}</span>
                  <span className="text-sm text-gray-600">
                    {stage.count} leads ({stage.taxa}%)
                  </span>
                </div>
                <div className="h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="h-full flex items-center justify-center text-white font-semibold transition-all duration-500"
                    style={{
                      width: `${widthPercentage}%`,
                      backgroundColor: stage.color,
                      minWidth: stage.count > 0 ? '60px' : '0'
                    }}
                  >
                    {stage.count > 0 && stage.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Termômetro de Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Termômetro de Leads</h2>
          <div className="space-y-6">
            {/* Quente */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Quente</span>
                </div>
                <span className="text-sm font-semibold">{thermometerData[0].count} ({thermometerData[0].percentage}%)</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{ width: `${thermometerData[0].percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Morno */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Morno</span>
                </div>
                <span className="text-sm font-semibold">{thermometerData[1].count} ({thermometerData[1].percentage}%)</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${thermometerData[1].percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Frio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Frio</span>
                </div>
                <span className="text-sm font-semibold">{thermometerData[2].count} ({thermometerData[2].percentage}%)</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${thermometerData[2].percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Conversão */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Conversão por Etapa</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="etapa" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {conversions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Métricas de Otimização */}
      <div className="card mt-6">
        <h2 className="text-xl font-semibold mb-4">Otimização do Funil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-600 mb-1">Tempo Médio no Funil</p>
            <p className="text-2xl font-bold text-gray-800">18 dias</p>
            <p className="text-xs text-green-600 mt-1">↓ 3 dias vs mês anterior</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-sm text-gray-600 mb-1">Taxa de Abandono</p>
            <p className="text-2xl font-bold text-gray-800">32%</p>
            <p className="text-xs text-red-600 mt-1">↑ 2% vs mês anterior</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-600 mb-1">Valor Médio do Deal</p>
            <p className="text-2xl font-bold text-gray-800">R$ 450.000</p>
            <p className="text-xs text-green-600 mt-1">↑ 15% vs mês anterior</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunilVendas;
