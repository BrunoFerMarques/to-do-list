"use client";
import React, { useState, useEffect } from 'react'; // Importe o useEffect
import CreateNote from '@/components/CreateNote';
import { Note } from "@/models/Note";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import UpdateNote from '@/components/UpdateNote';
import { supabase } from '@/lib/supabaseClient'; // Garanta que a importação está correta

const addIconStyle: React.CSSProperties = {
  width: 80
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true); // Para UX
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState<Note | null>(null);

  // MUDANÇA 1: Buscar dados do Supabase na inicialização
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setNotes(data);

      } catch (error) {
        alert('Erro ao carregar as notas!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleOpenCreateModal = () => setIsModalCreateOpen(true);
  const handleCloseModalCreate = () => setIsModalCreateOpen(false);

  const handleOpenUpdateModal = (note: Note) => {
    setNoteToUpdate(note);
    setIsModalUpdateOpen(true);
  }
  const handleCloseModalUpdate = () => {
    setNoteToUpdate(null);
    setIsModalUpdateOpen(false);
  }

  // MUDANÇA 2: Função de criar nota agora é async e usa Supabase
  const handleSaveSuccess = async (noteData: Omit<Note, 'id' | 'Day'>) => {
    try {
      const { data: newNote, error } = await supabase
        .from('notes')
        .insert({ Title: noteData.Title, Text: noteData.Text })
        .select()
        .single();

      if (error) throw error;
      if (newNote) {
        setNotes(currentNotes => [newNote, ...currentNotes]);
        handleCloseModalCreate();
      }
    } catch (error) {
      alert('Erro ao salvar a nota!');
      console.error(error);
    }
  };

  // MUDANÇA 3: Função de atualizar nota agora é async e usa Supabase
  const handleUpdateSucess = async (updatedNote: Note) => {
    try {
      const { data: returnedNote, error } = await supabase
        .from('notes')
        .update({ Title: updatedNote.Title, Text: updatedNote.Text })
        .eq('id', updatedNote.id)
        .select()
        .single();
      
      if (error) throw error;
      if (returnedNote) {
        setNotes(currentNotes =>
          currentNotes.map(note =>
            note.id === returnedNote.id ? returnedNote : note
          )
        );
        handleCloseModalUpdate();
      }
    } catch (error) {
      alert('Erro ao atualizar a nota!');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-white text-center p-10 text-2xl">Carregando... 🌀</div>
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-r from-blue-900 to-tahiti p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <button
            onClick={handleOpenCreateModal}
            className='m-4 p-5 bg-black hover:bg-white hover:text-black rounded border-blue-300 border-2 text-white transition-colors w-full h-full'
          >
            <h1 className="border-b-2 border-blue-300 rounded-none">Crie uma nota</h1>
            <ControlPointIcon sx={addIconStyle} />
          </button>
        </div>
        {notes.map((note) => (
          <div key={note.id} className="grid grid-cols-1 m-4 p-5 bg-black hover:bg-gray-800 transition duration-300 rounded border-blue-300 border-2 text-white w-full h-full">
            <div className='flex align-center justify-between cursor-pointer'>
              <time className='text-gray-400'>{new Date(note.created_at).toLocaleDateString()}</time>
              <EditIcon onClick={() => handleOpenUpdateModal(note)} />
            </div>
            <h1 className="border-b-2 border-blue-300 rounded-none text-white h-10 flex items-center">{note.Title}</h1>
            <p className='text-white overflow-auto bg-transparent focus:bg-gray-800 transition duration-200 ease-in-out h-full'>{note.Text}</p>
          </div>
        ))}
      </div>
      <CreateNote
        isOpen={isModalCreateOpen}
        onClose={handleCloseModalCreate}
        onCreateNoteSucess={handleSaveSuccess}
      />
      <UpdateNote
        isOpen={isModalUpdateOpen}
        onClose={handleCloseModalUpdate}
        onUpdateNoteSucess={handleUpdateSucess}
        note={noteToUpdate}
      />
    </div>
  );
}