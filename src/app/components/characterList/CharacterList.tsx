import CharCard from '../charCard/CharCard';
import React from 'react';
import {
  Thumbnail,
  Character,
  CharacterListProps,
} from '@/app/types/interface';

// interface Thumbnail {
//   path: string;
//   extension: string;
// }

// interface Character {
//   id: number;
//   name: string;
//   thumbnail: Thumbnail;
//   character: string;
//   description: string;
// }

// // interface CharacterCardProps {
// //   character: Character;
// // }
// interface CharacterListProps {
//   characters: Character[];
//   loading: boolean;
//   listRef: any;
//   onCharClick: (character: Character) => void;
//   //   ref: HTMLDivElement | null;
// }

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  listRef,
  onCharClick,
}) => {
  return (
    <div className='w-full rounded-lg flex flex-wrap justify-center'>
      {characters.map((character, index) =>
        index === characters.length - 20 ? (
          <CharCard
            key={character.id}
            character={character}
            listRef={listRef}
            onCharClick={onCharClick}
          />
        ) : (
          <CharCard
            key={character.id}
            character={character}
            listRef={undefined}
            onCharClick={onCharClick}
          />
        )
      )}
      {loading && <div> Loading... </div>}
    </div>
  );
};

export default CharacterList;
