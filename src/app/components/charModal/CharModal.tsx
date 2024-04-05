import React from 'react';
import { ModalProps } from '@/app/types/interface';

const CharModal: React.FC<ModalProps> = ({
  character,
  onClose,
  setPlayerChar,
}) => {
  if (character === null) return;

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'>
      <div className='max-w-md w-full p-4 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center'>
        <h2 className='text-xl font-bold mb-2'>{character.name}</h2>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={`Comic image of ${character.name}`}
          className='w-auto rounded-xl shadow-slate-50 shadow-lg max-h-96 overflow-auto'
        />
        <p className='mt-2 '>{character.description}</p>
        <div className='flex justify-between mt-4'>
          <button
            className='relative bottom-1  rounded-full px-4 bg-green-500 bg-opacity-75 hover:bg-opacity-100 mr-10'
            onClick={setPlayerChar}
          >
            Confirm Character
          </button>
          <button
            className='relative bottom-1 right-1 rounded-full px-4 bg-red-600 bg-opacity-70 hover:bg-opacity-100 ml-10'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharModal;
