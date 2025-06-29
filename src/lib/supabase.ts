import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      readings: {
        Row: {
          id: string;
          user_id: string;
          birth_date: string;
          birth_time: string;
          birth_location: string;
          current_location: string;
          avatar: string;
          influence: 'love' | 'career' | 'wealth';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          birth_date: string;
          birth_time: string;
          birth_location: string;
          current_location: string;
          avatar: string;
          influence: 'love' | 'career' | 'wealth';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          birth_date?: string;
          birth_time?: string;
          birth_location?: string;
          current_location?: string;
          avatar?: string;
          influence?: 'love' | 'career' | 'wealth';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};