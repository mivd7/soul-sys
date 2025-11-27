import { useQuery } from "@apollo/client/react";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GET_PLANETS } from "../../queries/getPlanets";
import { ApiResponse, Planet } from "../../types";
import { CelestialBody } from "../../types/body";
import { GET_BODY } from "../../queries/getBody";

// Define the shape of your context state
interface SceneState {
  planets: CelestialBody[];
  selectedPlanet: string | null;
  cameraPosition: [number, number, number];
  sceneLoading: boolean;
  viewMode: "orbit" | "explore" | "overview";
}

// Define the context type including state and actions
interface SceneContextType {
  // State
  selectedPlanet: string | null;
  cameraPosition: [number, number, number];
  dataLoading: boolean;
  sceneLoading: boolean;
  viewMode: "orbit" | "explore" | "overview";
  planets?: Planet[];
  sun?: CelestialBody;

  // Actions
  setSelectedPlanet: (planet: string | null) => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setSceneLoading: (loading: boolean) => void;
  setViewMode: (mode: "orbit" | "explore" | "overview") => void;
  resetScene: () => void;
}

// Create the context with undefined as default (we'll check for this in the hook)
const SceneContext = createContext<SceneContextType | undefined>(undefined);

// Default state
const defaultState: SceneState = {
  planets: [],
  selectedPlanet: null,
  cameraPosition: [0, 0, 5000],
  sceneLoading: false,
  viewMode: "overview",
};

// Provider component props
interface SceneProviderProps {
  children: ReactNode;
}

// Provider component
export const SceneProvider: React.FC<SceneProviderProps> = ({ children }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(
    defaultState.selectedPlanet
  );
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >(defaultState.cameraPosition);
  const [sceneLoading, setSceneLoading] = useState<boolean>(
    defaultState.sceneLoading
  );
  const [viewMode, setViewMode] = useState<"orbit" | "explore" | "overview">(
    defaultState.viewMode
  );

  const {
    error,
    loading: dataLoading,
    data: planetData,
  } = useQuery<ApiResponse>(GET_PLANETS);
  `  console.log('data', data.)`;
  if (error) {
    console.error(error);
    throw new Error("error fetching planets");
  }

  const { data: sunData } = useQuery<{ body: CelestialBody }>(GET_BODY, {
    variables: {
      id: "soleil",
    },
    pollInterval: 0,
  });

  const sun = sunData?.body;
  // Reset function to return to default state
  const resetScene = () => {
    setSelectedPlanet(defaultState.selectedPlanet);
    setCameraPosition(defaultState.cameraPosition);
    setSceneLoading(defaultState.sceneLoading);
    setViewMode(defaultState.viewMode);
  };

  const contextValue: SceneContextType = {
    // State
    selectedPlanet,
    cameraPosition,
    sceneLoading,
    dataLoading,
    viewMode,
    planets: planetData?.allPlanets,
    sun,
    // Actions
    setSelectedPlanet,
    setCameraPosition,
    setSceneLoading,
    setViewMode,
    resetScene,
  };

  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

// Custom hook to use the context
export const useSceneContext = (): SceneContextType => {
  const context = useContext(SceneContext);

  if (context === undefined) {
    throw new Error("useScene must be used within a SceneProvider");
  }

  return context;
};

// Optional: Export the context itself if you need it elsewhere
export { SceneContext };
