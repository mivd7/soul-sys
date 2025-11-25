import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context state
interface SceneState {
  selectedPlanet: string | null;
  cameraPosition: [number, number, number];
  isLoading: boolean;
  viewMode: 'orbit' | 'explore' | 'overview';
}

// Define the context type including state and actions
interface SceneContextType {
  // State
  selectedPlanet: string | null;
  cameraPosition: [number, number, number];
  isLoading: boolean;
  viewMode: 'orbit' | 'explore' | 'overview';
  
  // Actions
  setSelectedPlanet: (planet: string | null) => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setIsLoading: (loading: boolean) => void;
  setViewMode: (mode: 'orbit' | 'explore' | 'overview') => void;
  resetScene: () => void;
}

// Create the context with undefined as default (we'll check for this in the hook)
const SceneContext = createContext<SceneContextType | undefined>(undefined);

// Default state
const defaultState: SceneState = {
  selectedPlanet: null,
  cameraPosition: [0, 0, 5000],
  isLoading: false,
  viewMode: 'overview'
};

// Provider component props
interface SceneProviderProps {
  children: ReactNode;
}

// Provider component
export const SceneProvider: React.FC<SceneProviderProps> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(defaultState.selectedPlanet);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(defaultState.cameraPosition);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
  const [viewMode, setViewMode] = useState<'orbit' | 'explore' | 'overview'>(defaultState.viewMode);

  // Reset function to return to default state
  const resetScene = () => {
    setSelectedPlanet(defaultState.selectedPlanet);
    setCameraPosition(defaultState.cameraPosition);
    setIsLoading(defaultState.isLoading);
    setViewMode(defaultState.viewMode);
  };

  const contextValue: SceneContextType = {
    // State
    selectedPlanet,
    cameraPosition,
    isLoading,
    viewMode,
    
    // Actions
    setSelectedPlanet,
    setCameraPosition,
    setIsLoading,
    setViewMode,
    resetScene
  };

  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

// Custom hook to use the context
export const useScene = (): SceneContextType => {
  const context = useContext(SceneContext);
  
  if (context === undefined) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  
  return context;
};

// Optional: Export the context itself if you need it elsewhere
export { SceneContext };
