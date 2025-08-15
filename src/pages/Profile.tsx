import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, MapPin, Award, FileText } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    if (!user) return;

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
      setSaveMessage({ 
        type: 'error', 
        text: `Erro ao atualizar perfil: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
      });
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
      <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cogna-roxo"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Erro ao carregar perfil: {error}</p>
          <button 
            onClick={refreshProfile}
            className="bg-cogna-roxo text-white px-4 py-2 rounded-lg hover:bg-cogna-roxo/80"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Perfil não encontrado</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-cogna-roxo text-white px-4 py-2 rounded-lg hover:bg-cogna-roxo/80"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-cogna-roxo hover:text-cogna-roxo/80 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie suas informações pessoais e acadêmicas
          </p>
        </div>

        {/* Mensagem de sucesso/erro */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {saveMessage.text}
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
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
              <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro flex items-center">
                <User size={20} className="mr-2 text-cogna-roxo" />
                Informações Pessoais
              </h3>
              
              {/* Nome Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo *
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
              <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro flex items-center">
                <Award size={20} className="mr-2 text-cogna-roxo" />
                Informações Acadêmicas
              </h3>
              
              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria *
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
                  placeholder="Ex: Ciência da Computação, Medicina, etc."
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
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro flex items-center">
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

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-cogna-roxo text-white px-6 py-2 rounded-lg hover:bg-cogna-roxo/80 flex items-center"
              >
                <FileText size={16} className="mr-2" />
                Editar Perfil
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-cogna-roxo text-white px-6 py-2 rounded-lg hover:bg-cogna-roxo/80 disabled:opacity-50 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 