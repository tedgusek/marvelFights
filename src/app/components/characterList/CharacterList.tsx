import CharCard from '../charCard/CharCard';
import React from 'react';
import { CharacterListProps } from '@/app/types/interface';

//  Consider making an animated loading component to swap out for the boring loading text

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
