import { Building2, MapPin, DollarSign, Plus, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useState } from 'react';

const Comercial = () => {
  const { imoveis } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImoveis = imoveis.filter(imovel =>
    imovel.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imovel.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Comercial</h1>
          <p className="text-gray-600">Gestão de imóveis e vendas</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Imóvel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Total de Imóveis</p>
          <p className="text-3xl font-bold text-gray-800">{imoveis.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Disponíveis</p>
          <p className="text-3xl font-bold text-green-600">
            {imoveis.filter(i => i.status === 'disponivel').length}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Vendidos</p>
          <p className="text-3xl font-bold text-blue-600">
            {imoveis.filter(i => i.status === 'vendido').length}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Reservados</p>
          <p className="text-3xl font-bold text-yellow-600">
            {imoveis.filter(i => i.status === 'reservado').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por código ou endereço..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Imóveis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImoveis.map((imovel) => (
          <div key={imovel.id} className="card hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
              <Building2 size={64} className="text-blue-400" />
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{imovel.codigo}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  imovel.status === 'disponivel' ? 'bg-green-100 text-green-700' :
                  imovel.status === 'vendido' ? 'bg-blue-100 text-blue-700' :
                  imovel.status === 'reservado' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {imovel.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 capitalize">{imovel.tipo}</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{imovel.endereco}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign size={16} />
                <span className="font-semibold text-gray-800">
                  R$ {imovel.valorVenda.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>{imovel.quartos} quartos</span>
                <span>{imovel.banheiros} banheiros</span>
                <span>{imovel.area}m²</span>
              </div>
              <button className="btn-primary w-full text-sm">Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comercial;
