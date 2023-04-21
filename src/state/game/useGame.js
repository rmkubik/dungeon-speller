import React, { createContext, useContext, useEffect, useState } from "react";
import usePlayer from "../player/usePlayer";
import useEnemy from "../enemy/useEnemy";
import Bag from "../../utils/Bag";
import calculateEffects from "../../utils/calculateEffects";
import getUseableLetters from "../../utils/getUseableLetters";
import pickRandomlyFromArray from "../../utils/array/pickRandomlyFromArray";
import wordsText from "../../data/words.txt";
import countUntriggeredUsedWordLetters from "../../utils/countUntriggeredUsedWordLetters";
import getEnemyForEncounterLevel from "../../utils/getEnemyForEncounterLevel";
import pickRandomPlayerCharKeyForLevel from "../../utils/pickRandomPlayerCharKeyForLevel";

const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const player = usePlayer();
  const enemy = useEnemy();
  const [word, setWord] = useState("");
  const [dictionary, setDictionary] = useState(wordsText.split("\n"));
  const [enemyCount, setEnemyCount] = useState(1);
  const [winningEnemyCount, setWinningEnemyCount] = useState(20);

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
      console.log(`${word} is already remembered`);
      return;
    }

    if (word.length < player.minWordLength) {
      console.log(
        `${word} is not long enough, needs to be at least ${player.minWordLength}`
      );
      return;
    }

    if (!isWordInDictionary(word)) {
      console.log(`${word} is not in dictionary`);
      return;
    }

    const effects = calculateEffects(player, enemy, word);

    let enemyDamage = effects.sword;

    if (enemy.ability?.onTakeDamage) {
      enemyDamage = enemy.ability.onTakeDamage({
        incomingDamage: enemyDamage,
        word,
        player,
        enemy,
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

    // TODO: The player and enemy abilities can
    // interfere here. I think we need to switch
    // to a state management model like Redux or
    // mobx-state-tree that can support synchronous
    // changes to state.
    // ex. DRUNK and SHAMAN changing enemy letters
    // will interfere.
    player.ability?.onUsedWord?.({
      player,
      enemy,
      word,
    });
    enemy.ability?.onUsedWord?.({
      player,
      enemy,
      word,
    });

    player.rememberWord(word);
    enemy.submitWord(word);
    setWord("");
  };

  useEffect(() => {
    if (enemy.isDead()) {
      return;
    }

    const letterCount = enemy.lettersSinceLastIntentTrigger;

    console.log({ letterCount });

    if (enemy.intent && letterCount >= enemy.intent.letterCount) {
      // Enemy intent takes affect
      switch (enemy.intent.effect.symbol) {
        case "sword":
          let playerDamage =
            player.ability?.onTakeDamage?.(enemy.intent.effect.value) ??
            enemy.intent.effect.value;

          playerDamage =
            enemy.ability?.onDealDamage?.({
              damage: playerDamage,
              player,
              enemy,
            }) ?? playerDamage;

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

      enemy.resetIntentTracker();
      enemy.pickNewIntent();
    }
  }, [
    player.rememberedWords,
    enemy.key,
    player.key,
    enemy.lettersSinceLastIntentTrigger,
  ]);

  useEffect(() => {
    if (enemy.isDead()) {
      // TODO:
      // These do not correctly overlap
      // SPIDER & THIEF fight each other.
      enemy.ability?.onEnemyLeave?.({ enemy, player });
      player.ability?.onEnemyLeave?.({ enemy, player });

      const newEncounterLevel = enemyCount + 1;

      const newEnemyCharKey = getEnemyForEncounterLevel(newEncounterLevel);

      enemy.load(newEnemyCharKey, player);

      if (newEncounterLevel === 6) {
        player.load(pickRandomPlayerCharKeyForLevel(6));
      }

      setEnemyCount(newEncounterLevel);
    }
  }, [enemy.hp.current]);

  useEffect(() => {
    console.log(enemy.state);
    if (enemy.state === "loading") {
      enemy.ability?.onEnemyEnter?.({ enemy, player });
      enemy.finishLoad();
    }
  }, [enemy.state]);

  return (
    <GameContext.Provider
      value={{
        player,
        enemy,
        rememberWord: player.rememberWord,
        submitWord,
        updateWord,
        word,
        isWordInDictionary,
        get lettersUntilNextEnemyIntent() {
          const letterCount = enemy.lettersSinceLastIntentTrigger;

          return Math.max(0, enemy.intent.letterCount - letterCount);
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
