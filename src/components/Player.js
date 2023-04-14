import React from "react";
import Name from "./Name";
import useGame from "../hooks/useGame";
import calculateEffects from "../utils/calculateEffects";
import symbols from "../data/symbols";

const Player = () => {
  const { player, enemy, updateWord, word, submitWord } = useGame();

  return (
    <div>
      <Name letters={player.letters} word={word} />
      <p>
        ❤️ {player.hp.current}/{player.hp.max}
      </p>
      {player.ability.name ? (
        <p>
          <strong>{player.ability.name}</strong> - {player.ability.effectText}
        </p>
      ) : null}
      <form onSubmit={submitWord}>
        <input type="text" value={word} onChange={updateWord} />
        <div className="wordEffectSummary">
          {Object.entries(calculateEffects(player, enemy, word))
            .filter(([, count]) => count > 0)
            .map(([symbol, count]) => {
              return (
                <div key={symbol}>
                  {symbols[symbol]}
                  {count}
                </div>
              );
            })}
          {word.length > 0 ? <div>{word.length}🔠</div> : null}
        </div>
        <button disabled={word.length < player.minWordLength} type="submit">
          Fight!
        </button>
        {word.length > 0 && word.length < player.minWordLength ? (
          <div className="fight-error">
            min word length: {player.minWordLength}🔠
          </div>
        ) : null}
      </form>
      <div>
        <p>
          🧠 {player.rememberedWords.length}/{player.maxRememberedWords}
        </p>
        <ol>
          {player.rememberedWords.map((rememberedWord) => (
            <li key={rememberedWord}>{rememberedWord}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Player;
