import { Mail, Send, Plus, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const EmailAutomatico = () => {
  const [showTemplateForm, setShowTemplateForm] = useState(false);

  const emailTemplates = [
    { id: '1', nome: 'Parecer de Visita', tipo: 'visita', assunto: 'Parecer sobre sua visita ao imóvel', status: 'Ativo' },
    { id: '2', nome: 'Proposta Enviada', tipo: 'proposta', assunto: 'Sua proposta foi enviada', status: 'Ativo' },
    { id: '3', nome: 'Follow-up Inicial', tipo: 'follow-up', assunto: 'Obrigado pelo seu interesse', status: 'Ativo' },
    { id: '4', nome: 'Confirmação de Contrato', tipo: 'contrato', assunto: 'Confirmação do seu contrato', status: 'Ativo' },
  ];

  const emailsEnviados = [
    { id: '1', destinatario: 'joao@email.com', template: 'Parecer de Visita', data: '15/06/2024 14:30', status: 'Enviado' },
    { id: '2', destinatario: 'maria@email.com', template: 'Proposta Enviada', data: '15/06/2024 15:45', status: 'Enviado' },
    { id: '3', destinatario: 'pedro@email.com', template: 'Follow-up Inicial', data: '15/06/2024 16:20', status: 'Aberto' },
    { id: '4', destinatario: 'ana@email.com', template: 'Confirmação de Contrato', data: '14/06/2024 10:15', status: 'Enviado' },
  ];

  const automacoes = [
    { trigger: 'Após visita realizada', acao: 'Enviar parecer automático', delay: '2 horas', status: 'Ativo' },
    { trigger: 'Proposta criada', acao: 'Notificar cliente', delay: 'Imediato', status: 'Ativo' },
    { trigger: 'Lead sem resposta', acao: 'Follow-up automático', delay: '3 dias', status: 'Ativo' },
    { trigger: 'Contrato assinado', acao: 'Enviar confirmação', delay: '1 hora', status: 'Ativo' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">E-mails Automáticos</h1>
          <p className="text-gray-600">Gestão de templates e automações de e-mail</p>
        </div>
        <button
          onClick={() => setShowTemplateForm(!showTemplateForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">E-mails Enviados</p>
              <p className="text-3xl font-bold">1,248</p>
              <p className="text-blue-100 text-sm mt-1">Este mês</p>
            </div>
            <Mail size={40} className="text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Taxa de Abertura</p>
              <p className="text-3xl font-bold">68%</p>
              <p className="text-green-100 text-sm mt-1">↑ 5% vs anterior</p>
            </div>
            <CheckCircle size={40} className="text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Templates Ativos</p>
              <p className="text-3xl font-bold">{emailTemplates.length}</p>
              <p className="text-purple-100 text-sm mt-1">Total disponíveis</p>
            </div>
            <Send size={40} className="text-purple-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Automações</p>
              <p className="text-3xl font-bold">{automacoes.length}</p>
              <p className="text-orange-100 text-sm mt-1">Configuradas</p>
            </div>
            <Clock size={40} className="text-orange-200" />
          </div>
        </div>
      </div>

      {/* Template Form */}
      {showTemplateForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Template</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Template</label>
                <input type="text" className="input-field" placeholder="Ex: Parecer de Visita" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select className="input-field">
                  <option>Visita</option>
                  <option>Proposta</option>
                  <option>Contrato</option>
                  <option>Follow-up</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
              <input type="text" className="input-field" placeholder="Assunto do e-mail" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Corpo do E-mail</label>
              <textarea
                className="input-field"
                rows={6}
                placeholder="Use variáveis: {nome}, {imovel}, {data}, {corretor}"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" className="btn-primary">Salvar Template</button>
              <button
                type="button"
                onClick={() => setShowTemplateForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Templates de E-mail</h2>
          <div className="space-y-3">
            {emailTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{template.nome}</p>
                    <p className="text-sm text-gray-600">{template.assunto}</p>
                    <span className="text-xs text-gray-500 capitalize">{template.tipo}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-primary-600 hover:text-primary-700">Editar</button>
                  <button className="text-sm text-gray-600 hover:text-gray-700">Testar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automações */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Automações Configuradas</h2>
          <div className="space-y-3">
            {automacoes.map((auto, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-600" />
                    <span className="font-semibold text-gray-800">{auto.trigger}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {auto.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{auto.acao}</p>
                <p className="text-xs text-gray-500">Delay: {auto.delay}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Histórico de E-mails */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Histórico de E-mails Enviados</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Destinatário</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Template</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data/Hora</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ação</th>
              </tr>
            </thead>
            <tbody>
              {emailsEnviados.map((email) => (
                <tr key={email.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{email.destinatario}</td>
                  <td className="py-3 px-4">{email.template}</td>
                  <td className="py-3 px-4">{email.data}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      email.status === 'Aberto' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-primary-600 hover:text-primary-700">Ver Detalhes</button>
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

export default EmailAutomatico;
