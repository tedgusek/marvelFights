import React from 'react';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  thumbnail: Thumbnail;
  character: string;
  description: string;
}

interface ModalProps {
  character: Character | null;
  onClose: () => void;
  setPlayerChar: () => void;
}

const CharModal: React.FC<ModalProps> = ({
  character,
  onClose,
  setPlayerChar,
}) => {
  if (character === null) return;
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='max-w-md w-full p-4 bg-black rounded-xl shadow-lg'>
        <h2 className='text-xl font-bold mb-2'>{character.name}</h2>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={`Comic image of ${character.name}`}
          className='w-full rounded-xl shadow-slate-50 shadow-lg'
        />
        <p className='mt-2 '>{character.description}</p>
        <div className='flex justify-between mt-4'>
          <button
            className='relative bottom-1  rounded-full px-4 bg-green-500 bg-opacity-75 hover:bg-opacity-100'
            onClick={setPlayerChar}
          >
            Confirm Character
          </button>
          <button
            className='relative bottom-1 right-1 rounded-full px-4 bg-red-600 bg-opacity-70 hover:bg-opacity-100'
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
