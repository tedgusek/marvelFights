import React from 'react';
// import CharModal from '../charModal/CharModal';
import CharCard from '../charCard/CharCard';
import { BattleModalProps } from '@/app/types/interface';

const BattleModal: React.FC<BattleModalProps> = ({
  characters,
  battleOnClick,
}) => {
  //   const playerName: string = characters[0].name;
  //   const computerName = characters[1].name;
  //   const playerIMGSRC = `${characters[0].thumbnail.path}.${characters[0].thumbnail.extension}`;
  //   const computerIMGSRC = `${characters[1].thumbnail.path}.${characters[1].thumbnail.extension}`;
  if (!characters[0] || !characters[1]) return;

  const doNothing = () => {
    console.log(
      'this is a placeholder to fill in a param so that I could reuse the CharCard component'
    );
  };

  //   const battle = () => {
  //     battleOnclick();
  //   };
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'>
      <div className='max-w-md w-full p-4 bg-black rounded-xl shadow-lg flex flex-col items-center justify-center'>
        <h2 className='text-xl font-bold mb-2'>
          {characters[0].name} VS {characters[1].name}
        </h2>
        <CharCard
          key={characters[0].id}
          character={characters[0]}
          listRef={undefined}
          onCharClick={doNothing}
        />
        <h1>VS</h1>
        <CharCard
          key={characters[1].id}
          character={characters[1]}
          listRef={undefined}
          onCharClick={doNothing}
        />
        <button
          className='relative bottom-1 right-1 rounded-full px-4 bg-red-600 bg-opacity-70 hover:bg-opacity-100 ml-10'
          onClick={battleOnClick}
        >
          BATTLE!!
        </button>
      </div>
    </div>
  );
};

export default BattleModal;
