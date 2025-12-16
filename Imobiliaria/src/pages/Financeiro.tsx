import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Financeiro = () => {
  const financialData = [
    { mes: 'Jan', receita: 450000, despesa: 120000 },
    { mes: 'Fev', receita: 520000, despesa: 135000 },
    { mes: 'Mar', receita: 680000, despesa: 150000 },
    { mes: 'Abr', receita: 450000, despesa: 128000 },
    { mes: 'Mai', receita: 810000, despesa: 165000 },
    { mes: 'Jun', receita: 990000, despesa: 180000 },
  ];

  const paymentMethods = [
    { name: 'Boleto', value: 35, color: '#0ea5e9' },
    { name: 'PIX', value: 40, color: '#8b5cf6' },
    { name: 'Cartão', value: 15, color: '#f59e0b' },
    { name: 'Transferência', value: 10, color: '#10b981' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Financeiro</h1>
        <p className="text-gray-600">Gestão financeira e pagamentos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Receita Mês</p>
              <p className="text-3xl font-bold">R$ 990K</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} />
                <span className="text-sm">+22%</span>
              </div>
            </div>
            <DollarSign size={40} className="text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm mb-1">Despesas Mês</p>
              <p className="text-3xl font-bold">R$ 180K</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown size={16} />
                <span className="text-sm">-5%</span>
              </div>
            </div>
            <Receipt size={40} className="text-red-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Pagamentos Pendentes</p>
              <p className="text-3xl font-bold">R$ 125K</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-sm">15 pagamentos</span>
              </div>
            </div>
            <CreditCard size={40} className="text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Lucro Líquido</p>
              <p className="text-3xl font-bold">R$ 810K</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} />
                <span className="text-sm">+35%</span>
              </div>
            </div>
            <TrendingUp size={40} className="text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Receitas vs Despesas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="receita" fill="#10b981" name="Receita" />
              <Bar dataKey="despesa" fill="#ef4444" name="Despesa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Métodos de Pagamento</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethods}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Transações Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Descrição</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Método</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '15/06/2024', desc: 'Venda Imóvel #001', method: 'PIX', value: 450000, status: 'Pago' },
                { date: '14/06/2024', desc: 'Comissão Corretor', method: 'Transferência', value: 22500, status: 'Pago' },
                { date: '13/06/2024', desc: 'Aluguel Escritório', method: 'Boleto', value: 8500, status: 'Pendente' },
                { date: '12/06/2024', desc: 'Venda Imóvel #002', method: 'Cartão', value: 380000, status: 'Pago' },
              ].map((transaction, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">{transaction.desc}</td>
                  <td className="py-3 px-4">{transaction.method}</td>
                  <td className="py-3 px-4 font-semibold">R$ {transaction.value.toLocaleString('pt-BR')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Pago' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
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

export default Financeiro;
