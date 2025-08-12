export interface Note {
  id: string;
  title: string;    
  text: string;    
  created_at: string; 
  user_id: string | null; 
}