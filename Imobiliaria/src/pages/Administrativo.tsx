import { FileText, Users, Calendar, Settings } from 'lucide-react';

const Administrativo = () => {
  const administrativeModules = [
    { title: 'Gestão de Usuários', icon: Users, description: 'Controle de acesso e permissões', color: 'bg-blue-500' },
    { title: 'Documentação', icon: FileText, description: 'Gestão de documentos e arquivos', color: 'bg-purple-500' },
    { title: 'Agenda', icon: Calendar, description: 'Calendário e agendamentos', color: 'bg-green-500' },
    { title: 'Configurações', icon: Settings, description: 'Configurações do sistema', color: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administrativo</h1>
        <p className="text-gray-600">Gestão administrativa e configurações</p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {administrativeModules.map((module, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`${module.color} p-4 rounded-lg mb-4 flex items-center justify-center`}>
              <module.icon size={40} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
            <p className="text-sm text-gray-600">{module.description}</p>
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[
            { user: 'Admin', action: 'Criou novo usuário', time: 'Há 2 horas', color: 'bg-blue-100 text-blue-600' },
            { user: 'Carlos', action: 'Atualizou configurações', time: 'Há 3 horas', color: 'bg-green-100 text-green-600' },
            { user: 'Ana', action: 'Fez upload de documento', time: 'Há 5 horas', color: 'bg-purple-100 text-purple-600' },
            { user: 'João', action: 'Agendou nova visita', time: 'Há 1 dia', color: 'bg-yellow-100 text-yellow-600' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center font-semibold`}>
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.user}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Administrativo;
