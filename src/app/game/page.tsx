'use client';
import React, { useState, useEffect, useRef } from 'react';
import CharacterList from '../components/characterList/CharacterList';
import CharModal from '../components/charModal/CharModal';
import { Character } from '../types/interface';
import BattleModal from '../components/battleModal/battleModal';

const Game: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [battleOccurred, setBattleOccurred] = useState<boolean>(false); // Sets state if battle occured, to conditionally render winner modal
  const [playerChar, setPlayerChar] = useState<Character | null>(null); // Sets the potential character chosen by the player to battle
  const [compChar, setCompChar] = useState<Character | null>(null); // Sets the random character assigned by the computer for battle
  const [confirmedPlayer, setConfirmedPlayer] = useState<Character | null>(
    null
  ); // Sets the Confirmed Player
  const [characters, setCharacters] = useState<any[]>([]); // Stores the characters from the MarvelAPI call into state
  const [offset, setOffset] = useState<number>(0); // sets the offset for subsequent calls to the marvel API to saturate the page with the data
  const [loading, setLoading] = useState<boolean>(false); // Manages the state of Loading component
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Manages state of the Char Modal
  const [isBattleModalOpen, setIsBattleModalOpen] = useState<boolean>(false); // Manages state of the Battle Modal

  const observer = useRef<IntersectionObserver | null>(null); // Defines the observer for the page saturation from Marvel API
  const lastCharacterRef = useRef<HTMLDivElement | null>(null); // Sets the reference for where the page will start to saturate with data

  // Fetches data from the Marvel API
  const fetchData = async () => {
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

  // Handles the intersection for the lazy loading
  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const lastEntry = entries[0];

    if (lastEntry.isIntersecting && !loading) {
      setOffset((prevOffset) => prevOffset + 100);

      fetchData().then((data) => {
        if (data) {
          setCharacters((prevCharacters) => [...prevCharacters, ...data]);
        }
      });
    }
  };

  // Randomly chooses index from the characters array in the state
  const getRandomIndex: Function = (characters: any[]): number => {
    if (characters.length === 0) {
      throw new Error('Array is Empty!');
    }
    const randomIndex = Math.floor(Math.random() * characters.length);
    return randomIndex;
  };

  // Assigns a random opponent from the current stat of characters
  const assignCompChar = () => {
    setCompChar(characters[getRandomIndex(characters)]);
  };

  // Opens the Char Modal
  const openModal = (chosenCharacter: Character) => {
    setIsModalOpen(true);
    setPlayerChar(chosenCharacter);
  };

  // Closes the Char Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Chooses Characters for the battle
  const chooseCharacter = () => {
    setIsModalOpen(false);
    setConfirmedPlayer(playerChar);
    assignCompChar();
    setIsBattleModalOpen(true);
  };

  // Starts the battle, and temporary way to define winner until OPenAi is attached
  const battleStart = () => {
    if (!confirmedPlayer) return;
    if (!compChar) return;
    if (confirmedPlayer.id > compChar.id) {
      console.log(`Player wins`);
    } else {
      console.log('Comp Wins!');
    }
    setIsBattleModalOpen(false);
    return;
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

  // To lazy load the Character div
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
        onCharClick={openModal}
      />
      {isModalOpen && (
        <CharModal
          character={playerChar}
          onClose={closeModal}
          setPlayerChar={chooseCharacter}
        />
      )}
      {isBattleModalOpen && (
        <BattleModal
          characters={[confirmedPlayer, compChar]}
          battleOnClick={battleStart}
        />
      )}
      {/* Button that will utilize the player and randomly selected char and fetch results of fight from OpenAI */}
      {/* have 2 char cards, one will be chosen by the player, one will be randomly selected */}
      {/* Handle mapping response to character cards here */}
    </div>
  );
};

export default Game;
