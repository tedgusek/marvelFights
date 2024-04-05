import React from 'react';
import { CharacterCardProps } from '@/app/types/interface';

const CharCard: React.FC<CharacterCardProps> = ({
  character,
  listRef,
  onCharClick,
}) => {
  const charName: string = character.name;
  const thumbnail: string = `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`;
  const altDescription: string = `Comic style picture of ${charName}`;

  const handleClick = () => {
    onCharClick(character);
  };

  return (
    <div
      onClick={handleClick}
      className='bg-grey rounded-lg border-white border-4  w-40  overflow-auto h-64 flex flex-col justify-center items-center '
      ref={listRef}
    >
      <div
        id='charName'
        className='w-40 text-white font-bold flex justify-center p-4'
      >
        {charName}
      </div>
      <img
        src={thumbnail}
        alt={altDescription}
        className='rounded-lg border-2 border-green-400 p-2 max-h-40 max-w-36 '
      />
    </div>
  );
};

export default CharCard;
