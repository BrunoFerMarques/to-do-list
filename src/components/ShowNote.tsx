import React from 'react'
import { Note } from '../models/Note'
import { Box, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface ModalShowNoteProps{
    isOpen: boolean,
    onClose: () => void,
    note: Note | null
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

const ShowNote : React.FC<ModalShowNoteProps>= ({ isOpen, onClose, note}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <div className='flex flex-col'>  
            <div className="flex justify-between">
              <time className='text-gray-400 text-sm'>{new Date(note?.created_at || new Date()).toLocaleDateString()}</time>
              <button onClick={onClose} className="text-white hover:text-gray-300">
                <CloseIcon />
              </button>
            </div>
            <form>
              <div className='grid grid-rows-[auto_1fr] h-full gap-2'>
                <h2 className="font-NotoSerif text-xl text-white border-b border-blue-400 pb-2">
                  {note?.title}
                </h2>
                <p className='font-cantarell whitespace-pre-wrap break-words overflow-hidden'>
                  {note?.text}
                </p>
              </div>
            </form>
          </div>
        </Box>
    </Modal>
  )
}

export default ShowNote