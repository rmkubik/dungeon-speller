import React, { createContext, useContext, useEffect, useState } from "react";
import usePlayer from "./usePlayer";
import useEnemy from "./useEnemy";
import Bag from "../utils/Bag";
import calculateEffects from "../utils/calculateEffects";
import clamp from "../utils/number/clamp";
import getUseableLetters from "../utils/getUseableLetters";
import pickRandomlyFromArray from "../utils/array/pickRandomlyFromArray";
import wordsText from "../data/words.txt";
import characters from "../data/characters";
import isCharacterValidEnemy from "../utils/isCharacterValidEnemy";
import pickRandomEnemyCharKey from "../utils/pickRandomEnemyCharKey";
import countUntriggeredUsedWordLetters from "../utils/countUntriggeredUsedWordLetters";

const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const player = usePlayer();
  const enemy = useEnemy();
  const [word, setWord] = useState("");
  const [dictionary, setDictionary] = useState(wordsText.split("\n"));
  const [enemyCount, setEnemyCount] = useState(0);
  const [winningEnemyCount, setWinningEnemyCount] = useState(20);

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

    const effects = calculateEffects(player, enemy, word);

    let enemyDamage = effects.sword;

    if (enemy.ability?.onTakeDamage) {
      enemyDamage = enemy.ability.onTakeDamage({
        incomingDamage: enemyDamage,
        word,
      });
    }

    if (player.ability?.onDealDamage) {
      enemyDamage = player.ability.onDealDamage({
        incomingDamage: enemyDamage,
        player,
        enemy,
        word,
      });
    }

    enemy.takeDamage(enemyDamage);

    enemy.ability?.onUsedWord?.({
      player,
      word,
    });

    rememberWord(word);
    setWord("");
  };

  useEffect(() => {
    if (enemy.isDead()) {
      return;
    }

    const letterCount = countUntriggeredUsedWordLetters(player, enemy);

    if (enemy.intent && letterCount >= enemy.intent.letterCount) {
      // Enemy intent takes affect
      switch (enemy.intent.effect.symbol) {
        case "sword":
          const playerDamage =
            player.ability?.onTakeDamage?.(enemy.intent.effect.value) ??
            enemy.intent.effect.value;

          player.takeDamage(playerDamage);
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
      enemy.ability?.onEnemyLeave?.({ enemy, player });

      const newEnemyCharKey = pickRandomEnemyCharKey();

      enemy.load(newEnemyCharKey, player);

      setEnemyCount(enemyCount + 1);
    }
  }, [enemy.hp.current]);

  useEffect(() => {
    if (enemy.isLoaded) {
      enemy.ability?.onEnemyEnter?.({ enemy, player });
    }
  }, [enemy.isLoaded]);

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
        get lettersUntilNextEnemyIntent() {
          const letterCount = countUntriggeredUsedWordLetters(player, enemy);

          return enemy.intent.letterCount - letterCount;
        },
        enemyCount,
        winningEnemyCount,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

export default useGame;
export { GameContextProvider };
