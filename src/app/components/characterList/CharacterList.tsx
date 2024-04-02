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
  loading: boolean;
  listRef: any;
  //   ref: HTMLDivElement | null;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  listRef,
}) => {
  return (
    <div className='w-5/6 rounded-lg border-2 border-gray-500 inline-block'>
      {characters.map((character, index) =>
        index === characters.length - 5 ? (
          <CharCard
            key={character.id}
            character={character}
            listRef={listRef}
          />
        ) : (
          <CharCard
            key={character.id}
            character={character}
            listRef={undefined}
          />
        )
      )}
      {loading && <div> Loading... </div>}
    </div>
  );
};

export default CharacterList;
