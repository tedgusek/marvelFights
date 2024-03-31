import CharCard from '../charCard/CharCard';
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

// interface CharacterCardProps {
//   character: Character;
// }
interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className='w-5/6 rounded-lg border-2 border-gray-500 inline-block'>
      {characters.map((character) => (
        <CharCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
