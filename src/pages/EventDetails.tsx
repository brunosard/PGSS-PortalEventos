import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Bookmark, User, Mail, Phone } from 'lucide-react';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock data - em produção viria da API
  const event = {
    id: parseInt(id || '1'),
    title: 'Treinamento de Segurança Pública',
    description: 'Treinamento intensivo sobre procedimentos de segurança pública para agentes da PGSS. Este evento abrange temas como controle de multidões, gestão de crises, procedimentos de segurança em eventos públicos e protocolos de emergência.',
    date: '2024-02-15',
    time: '09:00 - 17:00',
    location: 'Academia da PGSS, São Paulo',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    participants: 150,
    maxParticipants: 200,
    status: 'upcoming' as const,
    category: 'Treinamento',
    organizer: {
      name: 'Departamento de Treinamento PGSS',
      email: 'treinamento@cogna.com.br',
      phone: '+55 11 3000-0000'
    },
    requirements: [
      'Ser agente da PGSS',
      'Ter concluído o curso básico',
      'Trazer equipamento de proteção individual'
    ],
    agenda: [
      { time: '09:00 - 09:30', activity: 'Credenciamento e Coffee Break' },
      { time: '09:30 - 10:00', activity: 'Abertura e Apresentações' },
      { time: '10:00 - 12:00', activity: 'Módulo 1: Controle de Multidões' },
      { time: '12:00 - 13:00', activity: 'Almoço' },
      { time: '13:00 - 15:00', activity: 'Módulo 2: Gestão de Crises' },
      { time: '15:00 - 15:15', activity: 'Coffee Break' },
      { time: '15:15 - 17:00', activity: 'Módulo 3: Procedimentos de Emergência' }
    ]
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

  const handleRegistration = () => {
    if (!isRegistered) {
      setIsRegistered(true);
      // Aqui seria feita a chamada para a API de inscrição
      alert('Inscrição realizada com sucesso!');
    } else {
      setIsRegistered(false);
      // Aqui seria feita a chamada para cancelar a inscrição
      alert('Inscrição cancelada!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-cogna-roxo hover:text-cogna-coral transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar para Eventos</span>
          </Link>
        </div>

        {/* Event Header */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{event.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {event.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {event.description}
              </p>

              {/* Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Calendar size={20} className="text-cogna-roxo flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{event.date}</div>
                    <div className="text-sm">{event.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin size={20} className="text-cogna-roxo flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{event.location}</div>
                    <div className="text-sm">{event.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Users size={20} className="text-cogna-roxo flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{event.participants}/{event.maxParticipants}</div>
                    <div className="text-sm">Participantes</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Clock size={20} className="text-cogna-roxo flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">8 horas</div>
                    <div className="text-sm">Duração</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRegistration}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isRegistered
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-cogna-roxo hover:bg-cogna-roxo/90'
                }`}
              >
                {isRegistered ? 'Inscrito ✓' : 'Inscrever-se'}
              </button>
              
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Share2 size={16} />
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Requisitos</h2>
              <ul className="space-y-3">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cogna-roxo rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agenda */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Programação</h2>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-cogna-roxo font-semibold text-sm min-w-[80px]">{item.time}</div>
                    <div className="text-gray-700 dark:text-gray-300">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Organizer Info */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organizador</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cogna-roxo rounded-full flex items-center justify-center text-white font-semibold">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{event.organizer.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Departamento de Treinamento</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <Mail size={16} className="text-cogna-roxo flex-shrink-0" />
                    <span>{event.organizer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <Phone size={16} className="text-cogna-roxo flex-shrink-0" />
                    <span>{event.organizer.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-cogna-roxo text-white rounded-lg font-medium hover:bg-cogna-roxo/90 transition-colors">
                  Baixar Material
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Adicionar ao Calendário
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Reportar Problema
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 