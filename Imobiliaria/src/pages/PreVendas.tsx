import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Plus, Search, Filter, Phone, Mail, Calendar } from 'lucide-react';
import { Lead } from '../types';

const PreVendas = () => {
  const { leads, addLead, updateLead } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTemp, setFilterTemp] = useState<string>('todos');

  const [newLead, setNewLead] = useState<Partial<Lead>>({
    nome: '',
    email: '',
    telefone: '',
    imovelInteresse: '',
    origem: 'Site',
    temperatura: 'frio',
    etapaFunil: 'novo',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      id: Date.now().toString(),
      nome: newLead.nome || '',
      email: newLead.email || '',
      telefone: newLead.telefone || '',
      imovelInteresse: newLead.imovelInteresse || '',
      origem: newLead.origem || 'Site',
      temperatura: newLead.temperatura || 'frio',
      etapaFunil: newLead.etapaFunil || 'novo',
      dataCriacao: new Date().toISOString().split('T')[0],
      ultimaInteracao: new Date().toISOString().split('T')[0],
      responsavel: 'Admin',
    };
    addLead(lead);
    setShowForm(false);
    setNewLead({});
  };

  const filteredLeads = leads.filter(lead => {
    const matchSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterTemp === 'todos' || lead.temperatura === filterTemp;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pré-Vendas</h1>
          <p className="text-gray-600">Gestão de leads e oportunidades</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Lead
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Lead</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                className="input-field"
                value={newLead.nome}
                onChange={(e) => setNewLead({ ...newLead, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input-field"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                className="input-field"
                value={newLead.telefone}
                onChange={(e) => setNewLead({ ...newLead, telefone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imóvel de Interesse</label>
              <input
                type="text"
                className="input-field"
                value={newLead.imovelInteresse}
                onChange={(e) => setNewLead({ ...newLead, imovelInteresse: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
              <select
                className="input-field"
                value={newLead.origem}
                onChange={(e) => setNewLead({ ...newLead, origem: e.target.value })}
              >
                <option>Site</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Indicação</option>
                <option>Telefone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperatura</label>
              <select
                className="input-field"
                value={newLead.temperatura}
                onChange={(e) => setNewLead({ ...newLead, temperatura: e.target.value as any })}
              >
                <option value="frio">Frio</option>
                <option value="morno">Morno</option>
                <option value="quente">Quente</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">Salvar Lead</button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar leads..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <select
              className="input-field"
              value={filterTemp}
              onChange={(e) => setFilterTemp(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="quente">Quente</option>
              <option value="morno">Morno</option>
              <option value="frio">Frio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{lead.nome}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lead.temperatura === 'quente' ? 'bg-red-100 text-red-700' :
                lead.temperatura === 'morno' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {lead.temperatura}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{lead.telefone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Criado em {lead.dataCriacao}</span>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Interesse:</strong> {lead.imovelInteresse}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Etapa:</strong> <span className="capitalize">{lead.etapaFunil}</span>
              </p>
              <div className="flex gap-2">
                <button className="btn-primary text-sm flex-1">Contatar</button>
                <button className="btn-secondary text-sm flex-1">Detalhes</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreVendas;
