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
          price: number;
          is_free: boolean;
          status: 'draft' | 'published' | 'cancelled' | 'completed';
          created_at: string;
          updated_at: string;
          created_by: string;
          category: string;
          image_url?: string;
          requirements?: string;
          agenda?: string;
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
          price: number;
          is_free: boolean;
          status?: 'draft' | 'published' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
          created_by: string;
          category: string;
          image_url?: string;
          requirements?: string;
          agenda?: string;
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
          price?: number;
          is_free?: boolean;
          status?: 'draft' | 'published' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
          created_by?: string;
          category?: string;
          image_url?: string;
          requirements?: string;
          agenda?: string;
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
          avatar_url?: string;
          phone?: string;
          institution?: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          role?: 'admin' | 'organizer' | 'participant';
          created_at?: string;
          updated_at?: string;
          avatar_url?: string;
          phone?: string;
          institution?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'admin' | 'organizer' | 'participant';
          created_at?: string;
          updated_at?: string;
          avatar_url?: string;
          phone?: string;
          institution?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          registered_at: string;
          payment_status: 'pending' | 'paid' | 'refunded';
          payment_method?: string;
          notes?: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          registered_at?: string;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string;
          notes?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          registered_at?: string;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string;
          notes?: string;
        };
      };
    };
  };
} 