// Thumbnail img src from the MarvelAPI call
export interface Thumbnail {
  path: string;
  extension: string;
}

// Individual Character from the Characters Array obtained from the Marvel API
export interface Character {
  id: number;
  name: string;
  thumbnail: Thumbnail;
  character: string;
  description: string;
}

// Winning Character
export interface WinningCharacter {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
}

// Winner Modal Props
export interface WinnerModalProps {
  character: WinningCharacter | null;
  // isLoading: boolean;
  closeWinnerModal: () => void;
}

// Modal Props for the Char Modal
export interface ModalProps {
  character: Character | null;
  onClose: () => void;
  setPlayerChar: () => void;
}

export interface ErrorResponse {
  error: string;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export interface CharacterCardProps {
  character: Character;
  listRef: any;
  onCharClick: (character: Character) => void;
}

export interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  listRef: any;
  onCharClick: (character: Character) => void;
}

export interface CharacterPair {
  0: Character | null;
  1: Character | null;
}

export interface BattleModalProps {
  characters: CharacterPair;
  battleOnClick: () => void;
}

export interface BattleButtonProps {
  player: Character;
  comp: Character;
  toDetermineWinnerOnClick: () => void;
}

interface OpenAiReqContent {}

export interface OpenAiRequest {
  role: String;
  content: String;
}
export interface LoadingProps {
  loading: boolean;
  description: string;
}

export interface BattleImage {
  output: string;
}
