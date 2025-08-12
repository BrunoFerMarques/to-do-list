import { Modal, Box } from '@mui/material'
import React from 'react'
import { Note } from '@/models/Note';

interface ModalDeleteNoteProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteNoteSucess: (note: Note) => void;
    note: Note | null,
}
const modalStyle = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 125,
  bgcolor: '#1C1C1C',
  color: '#fafafa',
  border: '1px solid white',
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};

const DeleteNote : React.FC<ModalDeleteNoteProps> = ({isOpen, onClose, onDeleteNoteSucess, note}) => {
    
    const handleDelete = () =>{
        if (note) onDeleteNoteSucess(note);
    }
    return (
    <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
            <div className='bg-black rounded-xl p-2 grid grid-cols-1'> 
                <div className='flex justify-center'><h1 className='text-xl'>Você tem certeza que quer excluir essa nota?</h1></div>
                <div className='flex justify-center'>
                    <button className='bg-red-500 hover:bg-red-950 transition duration-200 ease-in-out text-xl p-2 m-1' onClick={handleDelete}>Continuar</button>
                    <button className='bg-white hover:bg-gray text-black hover:text-white transition duration-200 ease-in-out text-xl p-2 m-1' onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </Box>
    </Modal>
  )
}

export default DeleteNote