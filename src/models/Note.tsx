export interface Note {
  id: string;
  title: string;    // <-- Corrigido
  text: string;     // <-- Corrigido
  created_at: string; // O Supabase sempre retorna este campo
  user_id: string | null; // Boa prática já incluir
}