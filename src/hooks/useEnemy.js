import React, { createContext, useContext, useEffect, useState } from "react";
import characters from "../data/characters";
import clamp from "../utils/number/clamp";
import pickRandomKey from "../utils/object/pickRandomKey";
import getEnemyForEncounterLevel from "../utils/getEnemyForEncounterLevel";

const EnemyContext = createContext(null);

const EnemyContextProvider = ({ children }) => {
  const [key, setKey] = useState(getEnemyForEncounterLevel(1));
  const character = characters[key];
  const [hp, setHp] = useState(character.hp);
  const [maxHp, setMaxHp] = useState(character.hp);
  const [intentIndex, setIntentIndex] = useState(0);
  const [currentIntent, setCurrentIntent] = useState(
    pickRandomKey(character.intents)
  );
  const [letters, setLetters] = useState(character.letters);
  const [loadingKey, setLoadingKey] = useState(null);

  const pickNewIntent = () => {
    setCurrentIntent(pickRandomKey(character.intents));
  };

  const setIntentIndexToMax = (player) => {
    setIntentIndex(player.rememberedWords.length);
  };

  const startLoad = (newKey, player) => {
    setLoadingKey({ newKey, player });
  };

  const replaceLetters = (newWord) => {
    setLetters(
      newWord.split("").map((letter) => {
        return {
          text: letter,
        };
      })
    );
  };

  const takeDamage = (damage) => {
    const newHp = clamp(0, hp - damage, maxHp);

    setHp(newHp);
  };

  const finishLoad = () => {
    setKey(loadingKey.newKey);
    const newCharacter = characters[loadingKey.newKey];

    setHp(newCharacter.hp);
    setMaxHp(newCharacter.hp);
    setIntentIndexToMax(loadingKey.player);
    setCurrentIntent(pickRandomKey(newCharacter.intents));
    setLetters(newCharacter.letters);

    setLoadingKey(null);
  };

  useEffect(() => {
    if (loadingKey) {
      finishLoad();
    }
  }, [loadingKey]);

  return (
    <EnemyContext.Provider
      value={{
        key,
        hp: {
          current: hp,
          max: maxHp,
        },
        character,
        intent: character.intents[currentIntent],
        intentIndex,
        letters,
        takeDamage,
        heal: (healing) => {
          takeDamage(-healing);
        },
        decrementIntentIndex: () => {
          // Reduce enemyIntentIndex if we can
          if (intentIndex > 0) {
            setIntentIndex(intentIndex - 1);
          }
        },
        setIntentIndexToMax,
        pickNewIntent,
        load: startLoad,
        isDead: () => {
          return hp <= 0;
        },
        replaceLetters,
        isLoaded: loadingKey === null,
        ability: {
          ...character.ability,
        },
      }}
    >
      {children}
    </EnemyContext.Provider>
  );
};

const useEnemy = () => useContext(EnemyContext);

export default useEnemy;
export { EnemyContextProvider };
