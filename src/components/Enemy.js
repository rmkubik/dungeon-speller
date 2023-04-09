import React from "react";
import Name from "./Name";
import useGame from "../hooks/useGame";

const Enemy = () => {
  const { enemy, word } = useGame();

  return (
    <div>
      <Name character={enemy.character} word={word} />
      <p>
        ❤️ {enemy.hp.current}/{enemy.hp.max}
      </p>
      <p>2⚔️ in 4 🔠 (letters)</p>
    </div>
  );
};

export default Enemy;
