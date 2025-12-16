import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Comissoes = () => {
  const { corretores } = useApp();

  const commissionsData = [
    { mes: 'Jan', comissao: 35000 },
    { mes: 'Fev', comissao: 42000 },
    { mes: 'Mar', comissao: 58000 },
    { mes: 'Abr', comissao: 38000 },
    { mes: 'Mai', comissao: 65000 },
    { mes: 'Jun', comissao: 78000 },
  ];

  const comissoesPendentes = [
    { id: '1', corretor: 'Carlos Mendes', imovel: 'Apto 101', valor: 22500, vencimento: '20/06/2024', status: 'Pendente' },
    { id: '2', corretor: 'Ana Paula', imovel: 'Casa Jardim', valor: 34000, vencimento: '22/06/2024', status: 'Pendente' },
    { id: '3', corretor: 'Roberto Silva', imovel: 'Sala Comercial', valor: 12000, vencimento: '15/06/2024', status: 'Atrasado' },
    { id: '4', corretor: 'Juliana Costa', imovel: 'Apto 205', valor: 18500, vencimento: '25/06/2024', status: 'Agendado' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Comissões</h1>
        <p className="text-gray-600">Controle de comissões de corretores</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Comissões Pagas</p>
              <p className="text-3xl font-bold">R$ 185K</p>
              <p className="text-green-100 text-sm mt-1">Mês atual</p>
            </div>
            <DollarSign size={40} className="text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Pendentes</p>
              <p className="text-3xl font-bold">R$ 87K</p>
              <p className="text-yellow-100 text-sm mt-1">4 pagamentos</p>
            </div>
            <Calendar size={40} className="text-yellow-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Corretores Ativos</p>
              <p className="text-3xl font-bold">{corretores.length}</p>
              <p className="text-blue-100 text-sm mt-1">Total cadastrados</p>
            </div>
            <Users size={40} className="text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Média Comissão</p>
              <p className="text-3xl font-bold">R$ 21.8K</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={14} />
                <span className="text-purple-100 text-sm">+12%</span>
              </div>
            </div>
            <TrendingUp size={40} className="text-purple-200" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Evolução de Comissões</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={commissionsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
            <Bar dataKey="comissao" fill="#8b5cf6" name="Comissão" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Top Corretores</h2>
          <div className="space-y-4">
            {corretores.map((corretor, index) => (
              <div key={corretor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{corretor.nome}</p>
                    <p className="text-sm text-gray-600">CRECI: {corretor.creci}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">R$ {corretor.comissaoAtual.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-gray-600">{corretor.vendas} vendas</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comissões Config */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Configuração de Comissões</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Venda de Imóvel</span>
                <span className="text-lg font-bold text-primary-600">5%</span>
              </div>
              <p className="text-sm text-gray-600">Comissão padrão sobre valor de venda</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Locação Mensal</span>
                <span className="text-lg font-bold text-primary-600">10%</span>
              </div>
              <p className="text-sm text-gray-600">Sobre o valor do primeiro aluguel</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Locação Anual</span>
                <span className="text-lg font-bold text-primary-600">100%</span>
              </div>
              <p className="text-sm text-gray-600">Equivalente a um mês de aluguel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Commissions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Comissões Pendentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Corretor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Imóvel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Vencimento</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ação</th>
              </tr>
            </thead>
            <tbody>
              {comissoesPendentes.map((comissao) => (
                <tr key={comissao.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{comissao.corretor}</td>
                  <td className="py-3 px-4">{comissao.imovel}</td>
                  <td className="py-3 px-4 font-semibold">R$ {comissao.valor.toLocaleString('pt-BR')}</td>
                  <td className="py-3 px-4">{comissao.vencimento}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      comissao.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                      comissao.status === 'Atrasado' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {comissao.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="btn-primary text-sm">Pagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comissoes;
