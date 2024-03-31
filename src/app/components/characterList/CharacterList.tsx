import CharCard from '../charCard/CharCard';
import React from 'react';

interface Thumbnail {
  path: string;
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
    <div className='w-auto h-auto fixed bottom-5 rounded-lg border-2 border-gray-500'>
      {characters.map((character) => (
        <CharCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
