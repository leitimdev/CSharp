import { CheckCircle, Users, Star, MessageCircle } from 'lucide-react';

const PosVenda = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pós-Venda</h1>
        <p className="text-gray-600">Acompanhamento e satisfação do cliente</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Vendas Concluídas</p>
              <p className="text-3xl font-bold text-gray-800">45</p>
            </div>
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Clientes Ativos</p>
              <p className="text-3xl font-bold text-gray-800">128</p>
            </div>
            <Users size={40} className="text-blue-500" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Satisfação Média</p>
              <p className="text-3xl font-bold text-gray-800">4.8</p>
            </div>
            <Star size={40} className="text-yellow-500" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Feedbacks</p>
              <p className="text-3xl font-bold text-gray-800">89</p>
            </div>
            <MessageCircle size={40} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Customer Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Pesquisa de Satisfação</h2>
          <div className="space-y-4">
            {[
              { question: 'Atendimento', rating: 4.9, color: 'bg-green-500' },
              { question: 'Qualidade do Imóvel', rating: 4.7, color: 'bg-blue-500' },
              { question: 'Processo de Compra', rating: 4.8, color: 'bg-purple-500' },
              { question: 'Pós-Venda', rating: 4.6, color: 'bg-yellow-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.question}</span>
                  <span className="text-sm font-semibold text-gray-800">{item.rating}/5.0</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Últimos Feedbacks</h2>
          <div className="space-y-4">
            {[
              { name: 'João Silva', rating: 5, comment: 'Excelente atendimento! Recomendo.', date: '10/06/2024' },
              { name: 'Maria Santos', rating: 4, comment: 'Processo rápido e eficiente.', date: '08/06/2024' },
              { name: 'Pedro Costa', rating: 5, comment: 'Equipe muito atenciosa.', date: '05/06/2024' },
            ].map((feedback, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">{feedback.name}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                <span className="text-xs text-gray-500">{feedback.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Follow-up Tasks */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Ações de Follow-up</h2>
        <div className="space-y-3">
          {[
            { task: 'Ligar para cliente - Imóvel #001', priority: 'Alta', due: '16/06/2024', status: 'Pendente' },
            { task: 'Enviar pesquisa de satisfação', priority: 'Média', due: '17/06/2024', status: 'Pendente' },
            { task: 'Agendar visita pós-venda', priority: 'Baixa', due: '20/06/2024', status: 'Agendado' },
            { task: 'Resolver pendência documental', priority: 'Alta', due: '15/06/2024', status: 'Em Andamento' },
          ].map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{task.task}</p>
                <div className="flex gap-4 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                    task.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-600">Prazo: {task.due}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                task.status === 'Em Andamento' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PosVenda;
