import React, { createContext, useContext, useEffect, useState } from "react";
import usePlayer from "./usePlayer";
import useEnemy from "./useEnemy";
import Bag from "../utils/Bag";
import calculateEffects from "../utils/calculateEffects";
import clamp from "../utils/number/clamp";
import getUseableLetters from "../utils/getUseableLetters";
import pickRandomlyFromArray from "../utils/array/pickRandomlyFromArray";
import wordsText from "../data/words.txt";

const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const player = usePlayer();
  const enemy = useEnemy();
  const [word, setWord] = useState("");
  const [dictionary, setDictionary] = useState(wordsText.split("\n"));

  const rememberWord = player.rememberWord(enemy);

  const isWordInDictionary = (maybeWord) => {
    return dictionary.includes(maybeWord);
  };

  const updateWord = (e) => {
    const newWord = e.target.value;

    if (newWord.length === 0) {
      setWord("");
      return;
    }

    const allLetters = new Bag([
      ...getUseableLetters(player.letters),
      ...getUseableLetters(enemy.letters),
    ]);
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

    if (!isWordInDictionary(word)) {
      return;
    }

    const effects = calculateEffects(player.key, enemy.key, word);

    enemy.takeDamage(effects.sword);
    rememberWord(word);
    setWord("");
  };

  useEffect(() => {
    if (enemy.isDead()) {
      return;
    }

    const unTriggeredUsedWords = player.rememberedWords.slice(
      enemy.intentIndex
    );
    const letterCount = unTriggeredUsedWords.reduce(
      (count, word) => word.length + count,
      0
    );

    if (enemy.intent && letterCount >= enemy.intent.letterCount) {
      // Enemy intent takes affect
      switch (enemy.intent.effect.symbol) {
        case "sword":
          player.takeDamage(enemy.intent.effect.value);
          break;
        case "lock": {
          const playerLetterEntries = Object.entries(player.letters);
          const unAffectedLetterIndices = playerLetterEntries
            .filter(([index, letter]) => !letter.effect)
            .map(([index]) => parseInt(index, 10));
          const targetIndex = pickRandomlyFromArray(unAffectedLetterIndices);

          if (targetIndex >= 0) {
            player.updateLetterEffect(targetIndex, {
              symbol: "lock",
              value: 1,
            });
          }
          break;
        }
        default:
          console.warn(`Effect not implemented: ${enemy.intent.effect.symbol}`);
          break;
      }

      enemy.setIntentIndexToMax(player);
      enemy.pickNewIntent();
    }
  }, [player.rememberedWords, enemy.key, player.key, enemy.intentIndex]);

  useEffect(() => {
    if (enemy.isDead()) {
      enemy.load("hawk", player);
    }
  }, [enemy.hp.current]);

  return (
    <GameContext.Provider
      value={{
        player,
        enemy,
        rememberWord,
        submitWord,
        updateWord,
        word,
        isWordInDictionary,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

export default useGame;
export { GameContextProvider };
