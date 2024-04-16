import React from 'react';
import { WinnerModalProps } from '@/app/types/interface';

const WinnerModal: React.FC<WinnerModalProps> = ({
  character,
  closeWinnerModal,
}) => {
  if (character === null) return;

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 overflow-auto'>
      <div className='max-w-md w-full p-4 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center'>
        <h2 className='text-xl font-bold mb-2 mt-12'>
          Winner: {character.name} !!
        </h2>
        <img
          src={character.thumbnail}
          alt={`AI generated image of ${character.name} winning a battle`}
          className='w-auto rounded-xl shadow-slate-50 shadow-lg max-h-96 overflow-auto'
        />
        <p className='mt-4 text-justify'>{character.description}</p>
        <div className='flex justify-between mt-4'>
          <button
            className='relative bottom-1  rounded-xl h-8 px-4 bg-green-500 bg-opacity-75 hover:bg-opacity-100 mr-10 mt-4'
            onClick={closeWinnerModal}
          >
            Close
          </button>
        </div>
        <div className='bottom-2 relative bg-inherit text-xs text-center mt-4'>
          Battle Description Provided by OpenAI. Image created by Dal-e-3 based
          on the characters of Marvel © 2024
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
