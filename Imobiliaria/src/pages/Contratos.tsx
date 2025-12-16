import { FileText, Plus, Search, Download } from 'lucide-react';
import { useState } from 'react';

const Contratos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const contratos = [
    { id: '1', numero: 'CTR-2024-001', cliente: 'João Silva', imovel: 'Apto 101 - Edifício Solar', tipo: 'Venda', valor: 450000, data: '15/01/2024', status: 'Ativo' },
    { id: '2', numero: 'CTR-2024-002', cliente: 'Maria Santos', imovel: 'Casa Jardim América', tipo: 'Venda', valor: 680000, data: '20/02/2024', status: 'Ativo' },
    { id: '3', numero: 'CTR-2024-003', cliente: 'Pedro Costa', imovel: 'Apto 205 - Residencial Park', tipo: 'Locação', valor: 3500, data: '10/03/2024', status: 'Ativo' },
    { id: '4', numero: 'CTR-2023-098', cliente: 'Ana Paula', imovel: 'Sala Comercial Centro', tipo: 'Locação', valor: 5000, data: '05/12/2023', status: 'Concluído' },
  ];

  const filteredContratos = contratos.filter(contrato =>
    contrato.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contrato.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Contratos</h1>
          <p className="text-gray-600">Gestão de contratos imobiliários</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Contrato
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Total de Contratos</p>
          <p className="text-3xl font-bold text-gray-800">{contratos.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Contratos Ativos</p>
          <p className="text-3xl font-bold text-green-600">
            {contratos.filter(c => c.status === 'Ativo').length}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Vendas</p>
          <p className="text-3xl font-bold text-blue-600">
            {contratos.filter(c => c.tipo === 'Venda').length}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Locações</p>
          <p className="text-3xl font-bold text-purple-600">
            {contratos.filter(c => c.tipo === 'Locação').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por número ou cliente..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contratos Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Número</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Imóvel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredContratos.map((contrato) => (
                <tr key={contrato.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{contrato.numero}</td>
                  <td className="py-3 px-4">{contrato.cliente}</td>
                  <td className="py-3 px-4">{contrato.imovel}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contrato.tipo === 'Venda' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {contrato.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    R$ {contrato.valor.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">{contrato.data}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contrato.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {contrato.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      <Download size={16} />
                      <span className="text-sm">PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Templates */}
      <div className="card mt-6">
        <h2 className="text-xl font-semibold mb-4">Modelos de Contrato</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Contrato de Compra e Venda', icon: FileText, color: 'bg-blue-500' },
            { name: 'Contrato de Locação Residencial', icon: FileText, color: 'bg-purple-500' },
            { name: 'Contrato de Locação Comercial', icon: FileText, color: 'bg-green-500' },
          ].map((template, index) => (
            <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className={`${template.color} p-3 rounded-lg`}>
                <template.icon size={24} className="text-white" />
              </div>
              <span className="font-medium text-gray-800">{template.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contratos;
