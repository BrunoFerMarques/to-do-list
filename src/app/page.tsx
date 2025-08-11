"use client";
import React, {useState} from 'react';
import CreateNote from '@/components/CreateNote';
import { Note } from "@/models/Note";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const addIconStyle : React.CSSProperties = {
  width:80
}

export default function Home() {
  const texts = new Array<Note>
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const note : Note ={
    Title : 'title',
    Text : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non necessitatibus ipsa, saepe possimus dolore illo iusto incidunt deleniti accusamus quidem quae reiciendis eligendi voluptate quod, vel itaque velit aliquid. Voluptate.'
  }

  for (let index = 0; index < 1; index++) {
    texts.push(...texts, note)
  }
  
  
  const handleSaveSuccess = () => {
    return
  }
  
  
  
  return (
    <div className="font-sans absolut items-center justify-items-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-950">
       <div>
          home
       </div>
       <div className="grid grid-cols-3">
          <div>
             <button onClick = {() =>  setIsModalOpen(true)} className='bg-black hover:bg-white'>
                <div className="m-4 p-5 bg-black rounded-sx border-blue-300 border-3 text-white"> 
                  <h1 className="border-b-2 border-blue-300 rounded-none">Crie uma nota</h1>
                  <ControlPointIcon sx = {addIconStyle}/>
                  <CreateNote 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onCreateNoteSucess={handleSaveSuccess}
                  />
              </div>
             </button>
          </div>
          {texts.length > 0 ? 
            (
              texts.map((note, index) => (
                <div key={index} className="m-4 p-5 bg-black rounded-sx border-blue-300 border-3 text-white"> 
                  <h1 className="border-b-2 border-blue-300 rounded-none">{note.Title}</h1>
                  <p>{note.Text}</p>
                </div>
              ))
            ): 
            (
              <h1>
                voce ainda nao tem nenhuma nota
              </h1>
            ) 
          }
          <div className="m-4 p-5 bg-black rounded-sx border-blue-300 border-3 text-white">
            <h1 className="border-b-2 border-blue-300 rounded-none">title</h1>
            <p className="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non necessitatibus ipsa, saepe possimus dolore illo iusto incidunt deleniti accusamus quidem quae reiciendis eligendi voluptate quod, vel itaque velit aliquid. Voluptate.</p>
          </div>
       </div>
    </div>
  );
}
