import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - em produção viria da API
  const events = [
    {
      id: 1,
      title: 'Treinamento de Segurança Pública',
      date: '2024-02-15',
      time: '09:00',
      location: 'Academia da PGSS, São Paulo',
      participants: 150,
      maxParticipants: 200,
      status: 'upcoming' as const,
      description: 'Treinamento intensivo sobre procedimentos de segurança pública para agentes da PGSS.'
    },
    {
      id: 2,
      title: 'Conferência sobre Cibersegurança',
      date: '2024-02-20',
      time: '14:00',
      location: 'Auditório Central, São Paulo',
      participants: 80,
      maxParticipants: 120,
      status: 'upcoming' as const,
      description: 'Conferência sobre as últimas tendências em cibersegurança e proteção de dados.'
    },
    {
      id: 3,
      title: 'Workshop de Primeiros Socorros',
      date: '2024-02-10',
      time: '10:00',
      location: 'Centro de Treinamento, Rio de Janeiro',
      participants: 45,
      maxParticipants: 50,
      status: 'ongoing' as const,
      description: 'Workshop prático sobre técnicas de primeiros socorros para situações de emergência.'
    },
    {
      id: 4,
      title: 'Seminário de Direitos Humanos',
      date: '2024-01-25',
      time: '15:00',
      location: 'Sala de Conferências, Brasília',
      participants: 120,
      maxParticipants: 120,
      status: 'completed' as const,
      description: 'Seminário sobre direitos humanos e procedimentos policiais.'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Eventos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Descubra e participe dos eventos organizados pela PGSS.
            Treinamentos, conferências e workshops para o seu desenvolvimento profissional.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar eventos por título ou localização..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Filter size={20} />
            Filtros
          </button>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-cogna-roxo to-cogna-coral flex items-center justify-center text-white text-3xl font-bold">
                  {event.title.charAt(0)}
                </div>
                
                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  {/* Event Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar size={16} className="text-cogna-roxo flex-shrink-0" />
                      <span>{formatDate(event.date)} às {event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin size={16} className="text-cogna-roxo flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                      <Users size={16} className="text-cogna-roxo flex-shrink-0" />
                      <span>{event.participants}/{event.maxParticipants} participantes</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </span>

                  {/* Action Button */}
                  <div className="mt-6">
                    <Link
                      to={`/events/${event.id}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-cogna-roxo text-white rounded-lg font-medium hover:bg-cogna-roxo/90 transition-colors"
                    >
                      <span>Ver Detalhes</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-500 dark:text-gray-400">
            <h3 className="text-2xl font-semibold mb-2">Nenhum evento encontrado</h3>
            <p>Tente ajustar os filtros de busca ou verifique novamente mais tarde.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 