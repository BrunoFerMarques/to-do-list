import React, { useState } from 'react'
import { Note } from '@/models/Note'
import { Box, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface ModalCreateNoteProps{
  isOpen: boolean,
  onClose: () => void,
  onCreateNoteSucess: (note : Note) => void, 
}

const modalStyle = {
    position: 'absolute' as 'absolute',
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

const CreateNote: React.FC<ModalCreateNoteProps>= ({isOpen, onClose, onCreateNoteSucess}) => {
  const handleClose = () => {
    onClose(); // Chama apenas a função onClose passada pelo componente pai
  }
  
  return(
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyle}>
        <button onClick={handleClose} className='bg-black'><CloseIcon/></button>
        <div className='grid grid-rows-[auto_1fr] h-full p-4'>
          <input className='border-b-2 border-black text-black border-b-2 border-black text-black h-10 flex items-center bg-white focus:bg-slategray transition duration-200 ease-in-out' placeholder='title'/>
          <input className='border-t-2 border-white text-black overflow-auto bg-white focus:bg-slategray transition duration-200 ease-in-outh-full' placeholder='lorem'/>
        </div>
      </Box>
    </Modal>
  )
}

export default CreateNote