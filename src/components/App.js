import React from "react";
import "../styles/main.scss";

import Player from "./Player";
import Enemy from "./Enemy";
import { PlayerContextProvider } from "../state/player/usePlayer";
import { EnemyContextProvider } from "../state/enemy/useEnemy";
import { GameContextProvider } from "../state/game/useGame";

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
