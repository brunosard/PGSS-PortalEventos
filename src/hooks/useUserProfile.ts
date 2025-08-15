import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: number;
  id_users: string;
  created_at: string;
  nome_completo: string;
  tp_categoria: 'Aluno(a) Doutorado' | 'Aluno(a) Ensino Fundamental' | 'Aluno(a) Ensino Médio' | 'Aluno(a) Especialização' | 'Aluno(a) Graduação' | 'Aluno(a) Mestrado' | 'Comunidade Externa' | 'Docente' | 'Pesquisador(a)' | 'Tutor(a)';
  email: string;
  area_atuacao: string | null;
  id_titulacao: number | null;
  tp_documento: number | null;
  documento: string | null;
  data_nascimento: string | null;
  ativo: boolean | null;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('usuario_portal')
          .select('*')
          .eq('id_users', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const { data, error } = await supabase
        .from('usuario_portal')
        .update(updates)
        .eq('id_users', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('usuario_portal')
        .select('*')
        .eq('id_users', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return { 
    profile, 
    loading, 
    error, 
    updateProfile, 
    refreshProfile 
  };
}; 