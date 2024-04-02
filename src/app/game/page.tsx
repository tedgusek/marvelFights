'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCharacterRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/marvelAPI?offset=${offset}`); // Make a request to the API route

      if (!response.ok) {
        throw new Error('Failed to Fetch data');
      }

      const data = await response.json();
      // const newData =
      // console.log('data: ', data);
      // setCharacters((prevCharacters) => [...prevCharacters, ...data]);
      setCharacters([...data]);
      setOffset(offset + 100);
      // console.log('offset :', offset);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // On Page Load Character fetch
  useEffect(() => {
    fetchData();
  }, []);

  // To saturate the Character div when scrolling down to end of available characters
  useEffect(() => {
    if (loading || characters.length === 0) return;

    // Create new Intersection Observer
    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    // Observe Last Char Card
    if (lastCharacterRef.current) {
      observer.current.observe(lastCharacterRef.current);
    }

    // Clean up function
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [characters, loading]);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const lastEntry = entries[0];
    if (lastEntry.isIntersecting && !loading) {
      fetchData();
    }
  };

  // Starting to think about search bar
  const handleSearch = (seacrhTerm: string) => {
    // Fetch characters from Marvel API and Store them in state

    setSearchResults([...searchResults]);
  };
  // console.log('offset :', offset);
  // console.log('characters :', characters);
  // console.log('characters[0].thumbnail :', characters[0]);
  // console.log('characters[0][id] :', characters[0].id);
  // console.log(' tyoeof characters[0][id] :', typeof characters[0].id);
  // console.log(typeof characters[0]['id'] === 'number');
  return (
    <div className='w-full flex flex-col items-center'>
      <h1>Game</h1>
      <CharacterList
        characters={characters}
        loading={loading}
        listRef={lastCharacterRef}
      />
      {/* Button that will utilize the player and randomly selected char and fetch results of fight from OpenAI */}
      {/* have 2 char cards, one will be chosen by the player, one will be randomly selected */}
      {/* Handle mapping response to character cards here */}
    </div>
  );
};

export default Game;
