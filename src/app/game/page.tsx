'use client';
import React, { useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar';
import NavBar from '../components/navbar/NavBar';

const Game: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [battleOccurred, setBattleOccurred] = useState<boolean>(false); // Sets state if battle occured, to conditionally render winner modal
  const [playerChar, setPlayerChar] = useState<string>('');
  const [compChar, setCompChar] = useState<string>('');

  const handleSearch = (seacrhTerm: string) => {
    // Fetch characters from Marvel API and Stroe them in state

    setSearchResults([...searchResults]);
  };
  return (
    <div>
      <h1>Game</h1>
      {/* Button that will utilize the player and randomly selected char and fetch results of fight from OpenAI */}
      {/* have 2 char cards, one will be chosen by the player, one will be randomly selected */}
      {/* Handle mapping response to character cards here */}
    </div>
  );
};

export default Game;
