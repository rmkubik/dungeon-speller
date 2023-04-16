import React, { createContext, useContext, useEffect, useState } from "react";
import characters from "../data/characters";
import clamp from "../utils/number/clamp";
import update from "../utils/array/update";
import pickRandomPlayerCharKeyForLevel from "../utils/pickRandomPlayerCharKeyForLevel";

const PlayerContext = createContext(null);

const PlayerContextProvider = ({ children }) => {
  const [key, setKey] = useState("thief"); //useState(pickRandomPlayerCharKeyForLevel(1));
  const character = characters[key];
  const [hp, setHp] = useState(character.hp);
  const [maxHp, setMaxHp] = useState(character.hp);
  const [minWordLength, setMinWordLength] = useState(character.minWordLength);
  const [maxRememberedWords, setMaxRememberedWords] = useState(
    character.memory
  );
  const [rememberedWords, setRememberedWords] = useState([]);
  const [letters, setLetters] = useState(character.letters);
  const [loadingKey, setLoadingKey] = useState(null);

  const rememberWord = (enemy) => (newWord) => {
    let prunedUsedWords = [...rememberedWords];

    if (rememberedWords.length >= maxRememberedWords) {
      // Remove first word
      prunedUsedWords.pop();

      enemy.decrementIntentIndex();
    }

    setRememberedWords([newWord, ...prunedUsedWords]);
  };

  const updateLetterEffect = (index, newEffect) => {
    const newLetters = update(letters, index, {
      ...letters[index],
      /**
       * e.g.
       * {
       *   symbol: 'lock',
       *   value: 1
       * }
       */
      effect: newEffect,
    });
    setLetters(newLetters);
  };

  const updateLetterEffectBulk = (changes = []) => {
    const newLetters = changes.reduce((currentLetters, currentChange) => {
      const [index, newEffect] = currentChange;

      return update(currentLetters, index, {
        ...currentLetters[index],
        effect: newEffect,
      });
    }, letters);

    setLetters(newLetters);
  };

  const startLoad = (newKey) => {
    setLoadingKey({ newKey });
  };

  const addLetter = (newLetter) => {
    setLetters([...letters, { text: newLetter }]);
  };

  const finishLoad = () => {
    setKey(loadingKey.newKey);
    const newCharacter = characters[loadingKey.newKey];

    setHp(newCharacter.hp);
    setMaxHp(newCharacter.hp);
    setMinWordLength(newCharacter.minWordLength);
    setMaxRememberedWords(newCharacter.memory);
    setRememberedWords(rememberedWords.slice(0, newCharacter.memory));
    setLetters(newCharacter.letters);

    setLoadingKey(null);
  };

  useEffect(() => {
    if (loadingKey) {
      finishLoad();
    }
  }, [loadingKey]);

  return (
    <PlayerContext.Provider
      value={{
        key,
        hp: {
          current: hp,
          max: maxHp,
        },
        character,
        minWordLength,
        maxRememberedWords,
        rememberedWords,
        letters,
        updateLetterEffect,
        updateLetterEffectBulk,
        takeDamage: (damage) => {
          const newHp = clamp(0, hp - damage, maxHp);

          setHp(newHp);
        },
        rememberWord,
        ability: {
          ...character.ability,
        },
        isLoaded: loadingKey === null,
        load: startLoad,
        addLetter,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export default usePlayer;
export { PlayerContextProvider };
