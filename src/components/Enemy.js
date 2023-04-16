import React from "react";
import Name from "./Name";
import useGame from "../hooks/useGame";
import symbols from "../data/symbols";

const Enemy = () => {
  const {
    enemy,
    word,
    lettersUntilNextEnemyIntent,
    enemyCount,
    winningEnemyCount,
  } = useGame();

  if (!enemy.isLoaded) {
    return null;
  }

  return (
    <div>
      <Name letters={enemy.letters} word={word} />
      <p>
        ❤️ {enemy.hp.current}/{enemy.hp.max}
      </p>
      {enemy.ability.name ? (
        <p>
          <strong>{enemy.ability.name}</strong> - {enemy.ability.effectText}
        </p>
      ) : null}
      <p>
        {enemy.intent.effect.value}
        {symbols[enemy.intent.effect.symbol]} in {lettersUntilNextEnemyIntent}{" "}
        🔠 (letters)
      </p>
      <p>
        #️⃣ {enemyCount}/{winningEnemyCount}
      </p>
    </div>
  );
};

export default Enemy;
