import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas do banco
export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          start_date: string;
          end_date: string;
          location: string;
          max_participants: number;
          current_participants: number;
          status: 'draft' | 'published' | 'cancelled' | 'completed';
          created_at: string;
          updated_at: string;
          organizer_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          start_date: string;
          end_date: string;
          location: string;
          max_participants: number;
          current_participants?: number;
          status?: 'draft' | 'published' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
          organizer_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          start_date?: string;
          end_date?: string;
          location?: string;
          max_participants?: number;
          current_participants?: number;
          status?: 'draft' | 'published' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
          organizer_id?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'admin' | 'organizer' | 'participant';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'admin' | 'organizer' | 'participant';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'admin' | 'organizer' | 'participant';
          created_at?: string;
          updated_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          registration_date: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          registration_date?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          registration_date?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
      };
      usuario_portal: {
        Row: {
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
        };
        Insert: {
          id?: number;
          id_users: string;
          created_at?: string;
          nome_completo: string;
          tp_categoria: 'Aluno(a) Doutorado' | 'Aluno(a) Ensino Fundamental' | 'Aluno(a) Ensino Médio' | 'Aluno(a) Especialização' | 'Aluno(a) Graduação' | 'Aluno(a) Mestrado' | 'Comunidade Externa' | 'Docente' | 'Pesquisador(a)' | 'Tutor(a)';
          email: string;
          area_atuacao?: string | null;
          id_titulacao?: number | null;
          tp_documento?: number | null;
          documento?: string | null;
          data_nascimento?: string | null;
          ativo?: boolean | null;
        };
        Update: {
          id?: number;
          id_users?: string;
          created_at?: string;
          nome_completo?: string;
          tp_categoria?: 'Aluno(a) Doutorado' | 'Aluno(a) Ensino Fundamental' | 'Aluno(a) Ensino Médio' | 'Aluno(a) Especialização' | 'Aluno(a) Graduação' | 'Aluno(a) Mestrado' | 'Comunidade Externa' | 'Docente' | 'Pesquisador(a)' | 'Tutor(a)';
          email?: string;
          area_atuacao?: string | null;
          id_titulacao?: number | null;
          tp_documento?: number | null;
          documento?: string | null;
          data_nascimento?: string | null;
          ativo?: boolean | null;
        };
      };
    };
  };
} 