import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Eye, Edit, Trash2, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - em produção viria da API
  const stats = [
    { label: 'Total de Eventos', value: '156', change: '+12%', trend: 'up', color: 'bg-blue-500' },
    { label: 'Participantes Ativos', value: '2.847', change: '+8%', trend: 'up', color: 'bg-green-500' },
    { label: 'Eventos em Andamento', value: '23', change: '-3%', trend: 'down', color: 'bg-yellow-500' },
    { label: 'Taxa de Sucesso', value: '94.2%', change: '+2.1%', trend: 'up', color: 'bg-purple-500' }
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Treinamento de Segurança Pública',
      date: '2024-02-15',
      status: 'upcoming',
      participants: 150,
      maxParticipants: 200
    },
    {
      id: 2,
      title: 'Conferência sobre Cibersegurança',
      date: '2024-02-20',
      status: 'upcoming',
      participants: 80,
      maxParticipants: 120
    },
    {
      id: 3,
      title: 'Workshop de Primeiros Socorros',
      date: '2024-02-10',
      status: 'ongoing',
      participants: 45,
      maxParticipants: 50
    }
  ];

  const recentActivity = [
    { type: 'event_created', message: 'Novo evento criado: Treinamento de Segurança Pública', time: '2 horas atrás' },
    { type: 'user_registered', message: '50 novos participantes inscritos no Workshop de Primeiros Socorros', time: '4 horas atrás' },
    { type: 'event_completed', message: 'Seminário de Direitos Humanos concluído com sucesso', time: '1 dia atrás' },
    { type: 'system_update', message: 'Sistema atualizado para versão 2.1.0', time: '2 dias atrás' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Próximo';
      case 'ongoing':
        return 'Em Andamento';
      case 'completed':
        return 'Concluído';
      default:
        return 'Próximo';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event_created':
        return <Calendar size={16} className="text-green-500" />;
      case 'user_registered':
        return <Users size={16} className="text-blue-500" />;
      case 'event_completed':
        return <Clock size={16} className="text-purple-500" />;
      case 'system_update':
        return <Activity size={16} className="text-orange-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'event_created':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'user_registered':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'event_completed':
        return 'bg-purple-100 dark:bg-purple-900/20';
      case 'system_update':
        return 'bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Visão geral do sistema de eventos da PGSS
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-cogna-roxo text-white rounded-lg font-medium hover:bg-cogna-roxo/90 transition-colors">
              Criar Evento
            </button>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Relatórios
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Eventos Recentes</h2>
                <Link to="/events" className="text-cogna-roxo hover:text-cogna-coral text-sm font-medium transition-colors">
                  Ver Todos
                </Link>
              </div>

              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
                />
              </div>

              {/* Events Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Evento</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Data</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Participantes</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500 dark:text-gray-400">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event) => (
                      <tr key={event.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-4 px-2">
                          <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 px-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                            {getStatusText(event.status)}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600 dark:text-gray-400">
                          {event.participants}/{event.maxParticipants}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <button className="p-1 text-gray-400 hover:text-cogna-roxo transition-colors" title="Ver">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-cogna-roxo transition-colors" title="Editar">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Excluir">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estatísticas Rápidas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Eventos Hoje</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Inscrições Pendentes</span>
                  <span className="font-semibold text-gray-900 dark:text-white">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Taxa de Ocupação</span>
                  <span className="font-semibold text-gray-900 dark:text-white">78%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                    <div className="flex items-start gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 