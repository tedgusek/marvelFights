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

interface CharacterCardProps {
  character: Character;
  listRef: any;
  // loading: boolean;
}

const CharCard: React.FC<CharacterCardProps> = ({ character, listRef }) => {
  // const characterObject: any = character
  const charName: string = character.name;
  const thumbnail: string =
    character.thumbnail.path + '.' + character.thumbnail.extension;
  const description: string = character.description;
  const altDescription: string = `Comic style picture of ${charName}`;

  //   if (typeof (character.id === 'string')) {
  //     const id = parseInt(character.id);
  //   } else if (typeof (character.id === 'number')) {
  //     const id = character.id;
  //   } else console.error('Issue assigning the character ID to the key');

  return (
    <div
      className='bg-grey rounded-lg border-white border-4 h-56 w-28 inline-block overflow-auto'
      ref={listRef}
    >
      <img
        src={thumbnail}
        alt={altDescription}
        className='w-40 rounded-lg border-2 border-green-400 p-2'
      />
      <div id='charName' className='w-40 text-white font-bold '>
        {charName}
      </div>
      <div id='description' className='w-40 text-white overflow-auto'>
        {description}
      </div>
    </div>
  );
};

export default CharCard;
