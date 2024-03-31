'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar/SearchBar';
import NavBar from '../components/navbar/NavBar';
import CharCard from '../components/charCard/CharCard';
import CharacterList from '../components/characterList/CharacterList';

const Game: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [battleOccurred, setBattleOccurred] = useState<boolean>(false); // Sets state if battle occured, to conditionally render winner modal
  const [playerChar, setPlayerChar] = useState<string>('');
  const [compChar, setCompChar] = useState<string>('');
  const [characters, setCharacters] = useState<any[]>([]);

  const handleSearch = (seacrhTerm: string) => {
    // Fetch characters from Marvel API and Stroe them in state

    setSearchResults([...searchResults]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/marvelAPI'); // Make a request to the API route

        if (!response.ok) {
          throw new Error('Failed to Fetch data');
        }

        const data = await response.json();
        // console.log('data: ', data);
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // console.log('characters :', characters);
  // console.log('characters[0] :', characters[0]);
  // console.log('characters[0][id] :', characters[0].id);
  // console.log(' tyoeof characters[0][id] :', typeof characters[0].id);
  // console.log(typeof characters[0]['id'] === 'number');
  return (
    <div>
      <h1>Game</h1>
      <CharacterList characters={characters} />
      {/* Button that will utilize the player and randomly selected char and fetch results of fight from OpenAI */}
      {/* have 2 char cards, one will be chosen by the player, one will be randomly selected */}
      {/* Handle mapping response to character cards here */}
    </div>
  );
};

export default Game;
