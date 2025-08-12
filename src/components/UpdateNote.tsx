import React, { useState, useEffect } from 'react';
import { Note } from '@/models/Note';
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalUpdateNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateNoteSucess: (note: Note) => void;
  note: Note | null;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: '#1C1C1C',
  color: '#fafafa',
  border: '1px solid white',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const meses = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${meses[month]} ${day}, ${year}`
};

const UpdateNote: React.FC<ModalUpdateNoteProps> = ({ isOpen, onClose, onUpdateNoteSucess, note }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
    }
  }, [note]);

  const handleSubmit = () => {
    if (title.trim() === '' || text.trim() === '') {
      alert('Texto ou título vazio')
      return
    }
    const now = new Date()
    const date = formatDate(now)

    const updatedNote: Note = {
      id: note?.id || '', 
      title: title,
      text: text,
      created_at: date,
      user_id: note?.user_id || ''
    };

    onUpdateNoteSucess(updatedNote)
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <CloseIcon />
          </button>
        </div>
        <h1 className="text-white">Atualizar Nota</h1>
        <div className="grid grid-rows-[auto_1fr] h-full p-4 gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-white text-white h-10 flex items-center bg-transparent focus:bg-gray-800 transition duration-200 ease-in-out"
            placeholder="Título"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-t-2 border-b-2 border-white text-white overflow-y-scroll bg-transparent focus:bg-gray-800 transition duration-200 ease-in-out h-full"
            placeholder="Digite seu texto aqui..."
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Salvar Nota
          </button>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateNote
