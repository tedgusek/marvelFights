import React from 'react';
import CharCard from '../charCard/CharCard';
import { BattleModalProps } from '@/app/types/interface';

const BattleModal: React.FC<BattleModalProps> = ({
  characters,
  battleOnClick,
}) => {
  if (!characters[0] || !characters[1]) return;

  const doNothing = () => {
    console.log(
      'this is a placeholder to fill in a param so that I could reuse the CharCard component'
    );
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 '>
      <div className='max-w-md w-full p-4 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center border-green-500 border-4 shadow-green-500'>
        <h2 className='text-xl font-bold mb-2'>
          {characters[0].name} VS {characters[1].name}
        </h2>
        <div className='flex flex-row items-center justify-center m-4'>
          <CharCard
            key={characters[0].id}
            character={characters[0]}
            listRef={undefined}
            onCharClick={doNothing}
          />
          <h1 className='p-4 text-green-500 font-extrabold text-3xl'>VS</h1>
          <CharCard
            key={characters[1].id}
            character={characters[1]}
            listRef={undefined}
            onCharClick={doNothing}
          />
        </div>
        <button
          className='flex flex-col items-center bottom-1 rounded-full px-4 bg-green-600 bg-opacity-70 hover:bg-opacity-100'
          onClick={battleOnClick}
        >
          BATTLE!!
        </button>
      </div>
    </div>
  );
};

export default BattleModal;
