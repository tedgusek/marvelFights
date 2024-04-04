'use client';
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/searchbar/SearchBar';
import NavBar from '../components/navbar/NavBar';
import CharCard from '../components/charCard/CharCard';
import CharacterList from '../components/characterList/CharacterList';

const Game: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [battleOccurred, setBattleOccurred] = useState<boolean>(false); // Sets state if battle occured, to conditionally render winner modal
  const [playerChar, setPlayerChar] = useState<string>(''); // Sets the chosen character by the player to battle
  const [compChar, setCompChar] = useState<string>(''); // Sets the random character assigned by the computer for battle
  const [characters, setCharacters] = useState<any[]>([]); // Stores the characters from the MarvelAPI call into state
  const [offset, setOffset] = useState<number>(0); // sets the offset for subsequent calls to the marvel API to saturate the page with the data
  const [loading, setLoading] = useState<boolean>(false); // Manages the state of Loading

  const observer = useRef<IntersectionObserver | null>(null); // Defines the observer for the page saturation from Marvel API
  const lastCharacterRef = useRef<HTMLDivElement | null>(null); // Sets the reference for where the page will start to saturate with data

  const fetchData = async (p0?: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/marvelAPI?offset=${offset}`); // Make a request to the API route

      if (!response.ok) {
        throw new Error('Failed to Fetch data');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const lastEntry = entries[0];

    if (lastEntry.isIntersecting && !loading) {
      setOffset((prevOffset) => prevOffset + 100);

      fetchData(offset).then((data) => {
        if (data) {
          setCharacters((prevCharacters) => [...prevCharacters, ...data]);
        }
      });
    }
  };

  // On Page Load Character fetch
  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        setCharacters(data);
        setOffset((prevOffset) => prevOffset + 100);
      }
    });
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

  // Starting to think about search bar
  const handleSearch = (seacrhTerm: string) => {
    // Fetch characters from Marvel API and Store them in state

    setSearchResults([...searchResults]);
  };

  return (
    <div className='flex flex-col items-center overflow-auto fixed top-36 bottom-10 w-5/6 border-green-400 border-4 rounded-xl'>
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
