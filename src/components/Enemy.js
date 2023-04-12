import React from "react";
import Name from "./Name";
import useGame from "../hooks/useGame";
import symbols from "../data/symbols";

const Enemy = () => {
  const { enemy, word } = useGame();

  if (!enemy.isLoaded) {
    return null;
  }

  return (
    <div>
      <Name letters={enemy.letters} word={word} />
      <p>
        ❤️ {enemy.hp.current}/{enemy.hp.max}
      </p>
      <p>
        {enemy.intent.effect.value}
        {symbols[enemy.intent.effect.symbol]} in {enemy.intent.letterCount} 🔠
        (letters)
      </p>
    </div>
  );
};

export default Enemy;
