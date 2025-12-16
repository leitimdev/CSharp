import { Link2, CheckCircle, XCircle, RefreshCw, Settings } from 'lucide-react';

const Integracoes = () => {
  const portais = [
    {
      id: '1',
      nome: 'ZapImóveis',
      logo: 'https://via.placeholder.com/80x80?text=Zap',
      status: 'Conectado',
      ultimaSync: '15/06/2024 16:30',
      imoveisPublicados: 45,
      color: 'border-green-500'
    },
    {
      id: '2',
      nome: 'VivaReal',
      logo: 'https://via.placeholder.com/80x80?text=Viva',
      status: 'Conectado',
      ultimaSync: '15/06/2024 16:25',
      imoveisPublicados: 42,
      color: 'border-green-500'
    },
    {
      id: '3',
      nome: 'OLX Imóveis',
      logo: 'https://via.placeholder.com/80x80?text=OLX',
      status: 'Desconectado',
      ultimaSync: '10/06/2024 14:00',
      imoveisPublicados: 0,
      color: 'border-red-500'
    },
    {
      id: '4',
      nome: 'ImovelWeb',
      logo: 'https://via.placeholder.com/80x80?text=IW',
      status: 'Conectado',
      ultimaSync: '15/06/2024 16:20',
      imoveisPublicados: 38,
      color: 'border-green-500'
    },
  ];

  const integracoesExtras = [
    { nome: 'WhatsApp Business', tipo: 'Comunicação', status: 'Ativo', icon: '💬' },
    { nome: 'Google Calendar', tipo: 'Agenda', status: 'Ativo', icon: '📅' },
    { nome: 'Stripe', tipo: 'Pagamentos', status: 'Ativo', icon: '💳' },
    { nome: 'Mailchimp', tipo: 'E-mail Marketing', status: 'Inativo', icon: '📧' },
  ];

  const syncLogs = [
    { portal: 'ZapImóveis', acao: 'Sincronização completa', status: 'Sucesso', data: '15/06/2024 16:30' },
    { portal: 'VivaReal', acao: 'Atualização de preços', status: 'Sucesso', data: '15/06/2024 16:25' },
    { portal: 'ImovelWeb', acao: 'Upload de fotos', status: 'Sucesso', data: '15/06/2024 16:20' },
    { portal: 'OLX Imóveis', acao: 'Tentativa de conexão', status: 'Erro', data: '15/06/2024 15:00' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Integrações com Portais</h1>
        <p className="text-gray-600">Gerencie suas integrações com portais imobiliários e serviços externos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Portais Conectados</p>
              <p className="text-3xl font-bold text-green-600">
                {portais.filter(p => p.status === 'Conectado').length}
              </p>
            </div>
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Imóveis Publicados</p>
              <p className="text-3xl font-bold text-blue-600">
                {portais.reduce((acc, p) => acc + p.imoveisPublicados, 0)}
              </p>
            </div>
            <Link2 size={40} className="text-blue-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Sincronizações Hoje</p>
              <p className="text-3xl font-bold text-purple-600">24</p>
            </div>
            <RefreshCw size={40} className="text-purple-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Integrações Ativas</p>
              <p className="text-3xl font-bold text-orange-600">7</p>
            </div>
            <Settings size={40} className="text-orange-500" />
          </div>
        </div>
      </div>

      {/* Portais Imobiliários */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Portais Imobiliários</h2>
          <button className="btn-primary text-sm">Sincronizar Todos</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portais.map((portal) => (
            <div key={portal.id} className={`border-2 ${portal.color} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Link2 size={32} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{portal.nome}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      portal.status === 'Conectado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {portal.status}
                    </span>
                  </div>
                </div>
                {portal.status === 'Conectado' ? (
                  <CheckCircle size={24} className="text-green-500" />
                ) : (
                  <XCircle size={24} className="text-red-500" />
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última Sincronização:</span>
                  <span className="font-medium text-gray-800">{portal.ultimaSync}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Imóveis Publicados:</span>
                  <span className="font-medium text-gray-800">{portal.imoveisPublicados}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {portal.status === 'Conectado' ? (
                  <>
                    <button className="btn-primary text-sm flex-1 flex items-center justify-center gap-2">
                      <RefreshCw size={16} />
                      Sincronizar
                    </button>
                    <button className="btn-secondary text-sm flex-1">Desconectar</button>
                  </>
                ) : (
                  <button className="btn-primary text-sm flex-1">Conectar</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outras Integrações */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Outras Integrações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {integracoesExtras.map((integracao, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{integracao.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  integracao.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {integracao.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{integracao.nome}</h3>
              <p className="text-sm text-gray-600 mb-3">{integracao.tipo}</p>
              <button className="text-sm text-primary-600 hover:text-primary-700">Configurar</button>
            </div>
          ))}
        </div>
      </div>

      {/* Log de Sincronizações */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Log de Sincronizações</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Portal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ação</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data/Hora</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {syncLogs.map((log, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{log.portal}</td>
                  <td className="py-3 px-4">{log.acao}</td>
                  <td className="py-3 px-4">{log.data}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.status === 'Sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Configuration */}
      <div className="card mt-6">
        <h2 className="text-xl font-semibold mb-4">Configuração de API</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            Configure suas chaves de API para integrações personalizadas
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                type="text"
                className="input-field"
                value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <input
                type="text"
                className="input-field"
                value="https://api.maisimobiliaria.com.br/webhook"
                readOnly
              />
            </div>
            <button className="btn-primary text-sm">Gerar Nova Chave</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integracoes;
