"use client";
import React, { useState, useEffect } from 'react'; 
import CreateNote from '@/components/CreateNote';
import { Note } from "@/models/Note";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import UpdateNote from '@/components/UpdateNote';
import DeleteNote from '@/components/DeleteNote';
import { supabase } from '@/lib/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';

const addIconStyle: React.CSSProperties = {
  width: 80
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true)
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [noteToUpdate, setNoteToUpdate] = useState<Note | null>(null)
  const [noteToDelete, setNoteToDelete] = useState<Note | null> (null)

  //Buscar dados do Supabase na inicialização
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
  
  const handleOpenDeleteModal = (note: Note) => {
    setNoteToDelete(note)
    setIsModalDeleteOpen(true)
  }
  const handleCloseDeleteModal = () =>{ 
    setNoteToDelete(null)
    setIsModalDeleteOpen(false)
  }
  
  const handleOpenUpdateModal = (note: Note) => {
    setNoteToUpdate(note);
    setIsModalUpdateOpen(true);
  }
  const handleCloseModalUpdate = () => {
    setNoteToUpdate(null);
    setIsModalUpdateOpen(false);
  }

  const handleSaveSuccess = async (noteData: Omit<Note, 'id' | 'Day'>) => {
    try {
      const { data: newNote, error } = await supabase
        .from('notes')
        .insert({ title: noteData.title, text: noteData.text })
        .select()
        .single();

      if (error) throw error;
      if (newNote) {
        setNotes(currentNotes => [newNote, ...currentNotes]);
        handleCloseModalCreate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSucess = async (updatedNote: Note) => {
    try {
      const { data: returnedNote, error } = await supabase
        .from('notes')
        .update({ title: updatedNote.title, text: updatedNote.text })
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

  const handleDeleteSucess = async (noteToDelete: Note) => {
    try{
      const { data: returnedNote, error } = await supabase.from('notes').delete().eq('id', noteToDelete.id).select()
      if (error) throw error;

      setNotes(currentNotes => currentNotes.filter(note => note.id !== noteToDelete.id));
    }
    catch(error){ 
      alert('Erro ao deletar a nota!');
      console.error(error);
    }
    handleCloseDeleteModal()
  }
  
  if (loading) {
    return <div className="text-white text-center p-10 text-2xl">Carregando... 🌀</div>
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-r from-blue-900 to-tahiti p-4">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
           <button
                onClick={handleOpenCreateModal}
                className='bg-black hover:bg-white hover:text-black rounded border-blue-300 border-2 text-white transition-colors w-full h-75 gap-3'
              >
                <h1 className="border-blue-300 rounded-none">Crie uma nota clicando aqui</h1>
                <ControlPointIcon sx={addIconStyle} />
            </button>
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="flex flex-col p-4 bg-gray-900 hover:bg-gray-800 transition duration-300 rounded-lg border border-blue-400 shadow-lg shadow-blue-500/20 text-white"
            >
              <div className='flex justify-between items-center mb-2'>
              <time className='text-gray-400 text-sm'>
                {new Date(note.created_at).toLocaleDateString()}
              </time>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenUpdateModal(note)}
                    className="text-gray-300 hover:text-yellow-400 transition"
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(note)}
                    className="text-gray-300 hover:text-red-500 transition"
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white border-b border-blue-400 pb-2">
                  {note.title}
                </h2>
                <p className='text-gray-300 text-gray-300 whitespace-pre-wrap break-words overflow-hidden'>
                  {note.text}
                </p>
              </div>
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
      <DeleteNote
        isOpen = {isModalDeleteOpen}
        onClose={handleCloseDeleteModal}
        onDeleteNoteSucess={handleDeleteSucess}
        note = {noteToDelete}
      />
    </div>
  );
}