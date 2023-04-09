import React, { createContext, useContext, useState } from "react";
import characters from "../data/characters";
import clamp from "../utils/clamp";

const EnemyContext = createContext(null);

const EnemyContextProvider = ({ children }) => {
  const [key, setKey] = useState("hawk");
  const character = characters[key];
  const [hp, setHp] = useState(character.hp);
  const [maxHp, setMaxHp] = useState(character.hp);
  const [intentIndex, setIntentIndex] = useState(0);

  return (
    <EnemyContext.Provider
      value={{
        key,
        hp: {
          current: hp,
          max: maxHp,
        },
        character,
        intentIndex,
        takeDamage: (damage) => {
          const newHp = clamp(0, hp - damage, maxHp);

          setHp(newHp);
        },
        decrementIntentIndex: () => {
          // Reduce enemyIntentIndex if we can
          if (intentIndex > 0) {
            setIntentIndex(intentIndex - 1);
          }
        },
        setIntentIndexToMax: (player) => {
          setIntentIndex(player.rememberedWords.length);
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
