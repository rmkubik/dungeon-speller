import React from "react";
import "../styles/main.scss";

import Player from "./Player";
import Enemy from "./Enemy";
import { PlayerContextProvider } from "../hooks/usePlayer";
import { EnemyContextProvider } from "../hooks/useEnemy";
import useGame, { GameContextProvider } from "../hooks/useGame";

const App = () => {
  return (
    <div className="game">
      <Player />
      <Enemy />
    </div>
  );
};

const AppWithProviders = () => {
  return (
    <PlayerContextProvider>
      <EnemyContextProvider>
        <GameContextProvider>
          <App />
        </GameContextProvider>
      </EnemyContextProvider>
    </PlayerContextProvider>
  );
};

export default AppWithProviders;
