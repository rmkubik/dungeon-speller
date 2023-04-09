import React, { createContext, useContext, useEffect } from "react";
import usePlayer from "./usePlayer";
import useEnemy from "./useEnemy";
import Bag from "../utils/Bag";
import calculateEffects from "../utils/calculateEffects";
import clamp from "../utils/clamp";

const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const player = usePlayer();
  const enemy = useEnemy();
  const [word, setWord] = React.useState("");

  const rememberWord = player.rememberWord(enemy);

  const updateWord = (e) => {
    const newWord = e.target.value;

    if (newWord.length === 0) {
      setWord("");
      return;
    }

    const allLetters = new Bag([...player.key, ...enemy.key]);
    const newLetters = newWord.split("");
    let newLettersValid = true;

    for (let newLetter of newLetters) {
      if (!allLetters.includes(newLetter)) {
        newLettersValid = false;
        break;
      }

      allLetters.remove(newLetter);
    }

    if (newLettersValid) {
      setWord(newWord);
    }
  };

  const submitWord = (e) => {
    e.preventDefault();

    if (player.rememberedWords.includes(word)) {
      return;
    }

    if (word.length < player.minWordLength) {
      return;
    }

    const effects = calculateEffects(player.key, enemy.key, word);

    const playerTakenDamage = clamp(
      effects.skull - effects.shield,
      0,
      effects.skull
    );
    player.takeDamage(playerTakenDamage);
    enemy.takeDamage(effects.sword);
    rememberWord(word);
    setWord("");
  };

  useEffect(() => {
    const unTriggeredUsedWords = player.rememberedWords.slice(
      enemy.intentIndex
    );
    const letterCount = unTriggeredUsedWords.reduce(
      (count, word) => word.length + count,
      0
    );

    if (
      enemy.character.intent &&
      letterCount >= enemy.character.intent.letterCount
    ) {
      // Enemy intent takes affect
      switch (enemy.character.intent.effect.symbol) {
        case "sword":
          player.takeDamage(enemy.character.intent.effect.value);
          break;
        default:
          console.log(
            `Effect not implemented: ${enemy.character.intent.effect.symbol}`
          );
          break;
      }

      enemy.setIntentIndexToMax(player);
    }
  }, [player.rememberedWords, enemy.key, player.key, enemy.intentIndex]);

  return (
    <GameContext.Provider
      value={{ player, enemy, rememberWord, submitWord, updateWord, word }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

export default useGame;
export { GameContextProvider };
