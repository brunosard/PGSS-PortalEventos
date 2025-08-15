import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  Bell, 
  Plus,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Save,
  Mail,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';

// Componente do Menu Sidebar
const Sidebar: React.FC<{ activeMenu: string; onMenuChange: (menu: string) => void }> = ({ 
  activeMenu, 
  onMenuChange 
}) => {
  const { profile } = useUserProfile();
  
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: Calendar, color: 'text-blue-600' },
    { id: 'profile', label: 'Meu Perfil', icon: User, color: 'text-green-600' },
    { id: 'request-event', label: 'Solicitar Evento', icon: Plus, color: 'text-purple-600' },
    { id: 'requested-events', label: 'Eventos Solicitados', icon: FileText, color: 'text-orange-600' },
    { id: 'registrations', label: 'Inscrições', icon: CheckCircle, color: 'text-indigo-600' },
    { id: 'notifications', label: 'Notificações', icon: Bell, color: 'text-red-600' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      {/* Header do Sidebar */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
          Meu Painel
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Bem-vindo, {profile?.nome_completo || 'Usuário'}
        </p>
      </div>

      {/* Menu de Navegação */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onMenuChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-cogna-roxo text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : item.color}`} />
                  <span className="font-medium text-left flex-1">{item.label}</span>
                  <ChevronRight 
                    size={16} 
                    className={`ml-auto transition-transform duration-200 ${
                      isActive ? 'rotate-90 text-white' : 'text-gray-400'
                    }`} 
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

// Componente de Perfil Integrado
const Profile: React.FC = () => {
  const { profile, loading, error, updateProfile, refreshProfile } = useUserProfile();
  
  const [formData, setFormData] = useState({
    nome_completo: '',
    tp_categoria: 'Comunidade Externa' as 'Aluno(a) Doutorado' | 'Aluno(a) Ensino Fundamental' | 'Aluno(a) Ensino Médio' | 'Aluno(a) Especialização' | 'Aluno(a) Graduação' | 'Aluno(a) Mestrado' | 'Comunidade Externa' | 'Docente' | 'Pesquisador(a)' | 'Tutor(a)',
    area_atuacao: '',
    id_titulacao: null as number | null,
    tp_documento: 0,
    documento: '',
    data_nascimento: '',
    orcid: '',
    estado: '',
    cidade: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Categorias disponíveis
  const categorias = [
    'Aluno(a) Doutorado',
    'Aluno(a) Ensino Fundamental',
    'Aluno(a) Ensino Médio',
    'Aluno(a) Especialização',
    'Aluno(a) Graduação',
    'Aluno(a) Mestrado',
    'Comunidade Externa',
    'Docente',
    'Pesquisador(a)',
    'Tutor(a)'
  ];

  // Estados brasileiros
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Tipos de documento
  const tiposDocumento = [
    { value: 0, label: 'CPF' },
    { value: 1, label: 'RG' },
    { value: 2, label: 'Passaporte' },
    { value: 3, label: 'CNH' },
    { value: 4, label: 'Outro' }
  ];

  useEffect(() => {
    if (profile) {
      setFormData({
        nome_completo: profile.nome_completo || '',
        tp_categoria: profile.tp_categoria || 'Comunidade Externa',
        area_atuacao: profile.area_atuacao || '',
        id_titulacao: profile.id_titulacao,
        tp_documento: profile.tp_documento || 0,
        documento: profile.documento || '',
        data_nascimento: profile.data_nascimento ? profile.data_nascimento.split('T')[0] : '',
        orcid: profile.orcid || '',
        estado: profile.estado || '',
        cidade: profile.cidade || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tp_documento' || name === 'id_titulacao' ? parseInt(value) || null : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Preparar dados para atualização
      const updateData = {
        ...formData,
        data_nascimento: formData.data_nascimento ? new Date(formData.data_nascimento).toISOString() : null
      };

      await updateProfile(updateData);
      setSaveMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setIsEditing(false);
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({ type: 'error', text: 'Erro ao atualizar perfil. Tente novamente.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        nome_completo: profile.nome_completo || '',
        tp_categoria: profile.tp_categoria || 'Comunidade Externa',
        area_atuacao: profile.area_atuacao || '',
        id_titulacao: profile.id_titulacao,
        tp_documento: profile.tp_documento || 0,
        documento: profile.documento || '',
        data_nascimento: profile.data_nascimento ? profile.data_nascimento.split('T')[0] : '',
        orcid: profile.orcid || '',
        estado: profile.estado || '',
        cidade: profile.cidade || ''
      });
    }
    setIsEditing(false);
    setSaveMessage(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Carregando informações do perfil...
          </p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
            Meu Perfil
          </h1>
          <p className="text-red-600 dark:text-red-400 mb-4">
            Erro ao carregar perfil: {error}
          </p>
          <button
            onClick={refreshProfile}
            className="px-4 py-2 bg-cogna-roxo text-white rounded-lg hover:bg-cogna-roxo/90"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Perfil não encontrado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
          Meu Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas informações pessoais e acadêmicas
        </p>
      </div>

      {/* Mensagem de Sucesso/Erro */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.type === 'success' 
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        }`}>
          {saveMessage.text}
        </div>
      )}

      {/* Formulário do Perfil */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email (não editável) - TOPO */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro flex items-center mb-4">
              <Mail size={20} className="mr-2 text-cogna-roxo" />
              Email
            </h3>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Mail size={16} className="text-gray-400 mr-3" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.email}</span>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className="space-y-4">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome_completo"
                value={formData.nome_completo}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            {/* Documento - Lado a lado */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Documento
                </label>
                <select
                  name="tp_documento"
                  value={formData.tp_documento}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
                >
                  {tiposDocumento.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Número do Documento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número do Documento
                </label>
                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Digite o número"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Informações Acadêmicas */}
          <div className="space-y-4">
            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <select
                name="tp_categoria"
                value={formData.tp_categoria}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            {/* Área de Atuação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Área de Atuação
              </label>
              <input
                type="text"
                name="area_atuacao"
                value={formData.area_atuacao}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Ex: Tecnologia da Informação"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>

            {/* ORCID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ORCID
              </label>
              <input
                type="text"
                name="orcid"
                value={formData.orcid}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="0000-0000-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
              />
            </div>
          </div>

          {/* Localização */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro flex items-center mb-4">
              <MapPin size={20} className="mr-2 text-cogna-roxo" />
              Localização
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
                >
                  <option value="">Selecione um estado</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Digite a cidade"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Espaçamento adicional */}
        <div className="h-4"></div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-3 pt-8 border-t border-gray-200 dark:border-gray-700">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-cogna-roxo text-white rounded-lg hover:bg-cogna-roxo/90 flex items-center font-medium"
            >
              <User size={18} className="mr-2" />
              Editar Perfil
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 bg-cogna-roxo text-white rounded-lg hover:bg-cogna-roxo/90 flex items-center font-medium disabled:opacity-50"
              >
                <Save size={18} className="mr-2" />
                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de Visão Geral
const Overview: React.FC = () => {
  
  const stats = [
    { label: 'Eventos Solicitados', value: '3', icon: FileText, color: 'text-orange-500' },
    { label: 'Inscrições Ativas', value: '7', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Notificações', value: '2', icon: Bell, color: 'text-red-500' },
    { label: 'Próximo Evento', value: '15/01', icon: Calendar, color: 'text-blue-500' },
  ];

  const recentActivities = [
    { action: 'Evento "Workshop de IA" solicitado', time: '2 horas atrás', status: 'pending' },
    { action: 'Inscrição confirmada em "Congresso de Tecnologia"', time: '1 dia atrás', status: 'confirmed' },
    { action: 'Perfil atualizado', time: '3 dias atrás', status: 'updated' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
          Visão Geral
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe suas atividades e estatísticas no Portal de Eventos
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                    {stat.value}
                  </p>
                </div>
                <Icon size={24} className={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-4">
          Atividades Recentes
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {activity.status === 'pending' && <Clock size={16} className="text-orange-500" />}
                {activity.status === 'confirmed' && <CheckCircle size={16} className="text-green-500" />}
                {activity.status === 'updated' && <User size={16} className="text-blue-500" />}
                <span className="text-gray-700 dark:text-gray-300">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente de Solicitar Evento
const RequestEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
    category: '',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de solicitação
    console.log('Solicitar evento:', formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
          Solicitar Evento
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Preencha o formulário abaixo para solicitar a criação de um novo evento
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título do Evento *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoria *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="workshop">Workshop</option>
              <option value="palestra">Palestra</option>
              <option value="congresso">Congresso</option>
              <option value="seminario">Seminário</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data de Início *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data de Fim *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Local *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Máximo de Participantes
            </label>
            <input
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descrição *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Requisitos
          </label>
          <textarea
            value={formData.requirements}
            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cogna-roxo focus:border-transparent"
            placeholder="Descreva os requisitos para participação no evento"
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-cogna-roxo text-white px-6 py-2 rounded-lg hover:bg-cogna-roxo/80 transition-colors"
          >
            Solicitar Evento
          </button>
        </div>
      </form>
    </div>
  );
};

// Componente de Eventos Solicitados
const RequestedEvents: React.FC = () => {
  const requestedEvents = [
    {
      id: 1,
      title: 'Workshop de Inteligência Artificial',
      status: 'pending',
      requestDate: '2024-01-10',
      category: 'Workshop',
      description: 'Workshop prático sobre aplicações de IA em diferentes áreas'
    },
    {
      id: 2,
      title: 'Palestra sobre Inovação Tecnológica',
      status: 'approved',
      requestDate: '2024-01-05',
      category: 'Palestra',
      description: 'Palestra sobre as últimas tendências em inovação tecnológica'
    },
    {
      id: 3,
      title: 'Seminário de Pesquisa',
      status: 'rejected',
      requestDate: '2024-01-01',
      category: 'Seminário',
      description: 'Seminário para apresentação de pesquisas acadêmicas'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' };
      case 'approved':
        return { label: 'Aprovado', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' };
      case 'rejected':
        return { label: 'Rejeitado', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' };
      default:
        return { label: 'Desconhecido', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
          Eventos Solicitados
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe o status das suas solicitações de eventos
        </p>
      </div>

      <div className="space-y-4">
        {requestedEvents.map((event) => {
          const statusInfo = getStatusInfo(event.status);
          return (
            <div key={event.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <span>Categoria: {event.category}</span>
                    <span>Solicitado em: {new Date(event.requestDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente de Inscrições
const Registrations: React.FC = () => {
  const registrations = [
    {
      id: 1,
      eventTitle: 'Congresso de Tecnologia 2024',
      status: 'confirmed',
      registrationDate: '2024-01-08',
      eventDate: '2024-02-15',
      location: 'São Paulo, SP'
    },
    {
      id: 2,
      eventTitle: 'Workshop de Desenvolvimento Web',
      status: 'waiting',
      registrationDate: '2024-01-10',
      eventDate: '2024-01-25',
      location: 'Online'
    },
    {
      id: 3,
      eventTitle: 'Seminário de Inovação',
      status: 'cancelled',
      registrationDate: '2024-01-05',
      eventDate: '2024-01-20',
      location: 'Rio de Janeiro, RJ'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { label: 'Confirmada', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' };
      case 'waiting':
        return { label: 'Lista de Espera', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' };
      case 'cancelled':
        return { label: 'Cancelada', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' };
      default:
        return { label: 'Desconhecido', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
          Minhas Inscrições
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas inscrições em eventos
        </p>
      </div>

      <div className="space-y-4">
        {registrations.map((registration) => {
          const statusInfo = getStatusInfo(registration.status);
          return (
            <div key={registration.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                      {registration.eventTitle}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Data do Evento:</span>
                      <p>{new Date(registration.eventDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Local:</span>
                      <p>{registration.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Inscrição:</span>
                      <p>{new Date(registration.registrationDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente de Notificações
const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: 'Evento Aprovado',
      message: 'Seu evento "Workshop de IA" foi aprovado e será publicado em breve.',
      type: 'success',
      date: '2024-01-10T10:00:00',
      read: false
    },
    {
      id: 2,
      title: 'Inscrição Confirmada',
      message: 'Sua inscrição no "Congresso de Tecnologia" foi confirmada com sucesso.',
      type: 'info',
      date: '2024-01-09T14:30:00',
      read: true
    },
    {
      id: 3,
      title: 'Lembrete de Evento',
      message: 'O evento "Seminário de Inovação" acontece amanhã às 14h.',
      type: 'warning',
      date: '2024-01-08T09:15:00',
      read: false
    }
  ];

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' };
      case 'info':
        return { icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900' };
      case 'warning':
        return { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900' };
      default:
        return { icon: Bell, color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
          Notificações
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe suas notificações e atualizações
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const typeInfo = getTypeInfo(notification.type);
          const Icon = typeInfo.icon;
          
          return (
            <div 
              key={notification.id} 
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
                !notification.read ? 'ring-2 ring-cogna-roxo/20' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${typeInfo.bgColor}`}>
                  <Icon size={20} className={typeInfo.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="px-2 py-1 bg-cogna-roxo text-white text-xs rounded-full">
                        Nova
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notification.date).toLocaleString('pt-BR')}
                    </span>
                    {!notification.read && (
                      <button className="text-sm text-cogna-roxo hover:text-cogna-roxo/80">
                        Marcar como lida
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Usuário não autenticado</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return <Overview />;
      case 'profile':
        return <Profile />;
      case 'request-event':
        return <RequestEvent />;
      case 'requested-events':
        return <RequestedEvents />;
      case 'registrations':
        return <Registrations />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro">
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 