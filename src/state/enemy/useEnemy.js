import React, { createContext, useContext, useReducer } from "react";
import characters from "../../data/characters";
import submitWord from "./ducks/submitWord";
import reducer from "./reducer";
import initialState from "./initialState";
import takeDamage from "../player/ducks/takeDamage";
import pickNewIntent from "./ducks/pickNewIntent";
import replaceLetters from "../player/ducks/replaceLetters";
import load, { finishLoad } from "./ducks/load";
import resetIntentTracker from "./ducks/resetIntentTracker";

const EnemyContext = createContext(null);

const EnemyContextProvider = ({ children }) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState);

  console.log("enemy", {
    reducerState,
    load: load(dispatch),
  });

  const {
    key,
    hp,
    maxHp,
    lettersSinceLastIntentTrigger,
    currentIntent,
    letters,
    state,
  } = reducerState;
  const character = characters[key];

  return (
    <EnemyContext.Provider
      value={{
        state,
        hp: {
          current: hp,
          max: maxHp,
        },
        character,
        intent: character.intents[currentIntent],
        letters,
        takeDamage: takeDamage(dispatch),
        heal: (healing) => {
          takeDamage(dispatch)(-healing);
        },
        pickNewIntent: pickNewIntent(dispatch),
        load: load(dispatch),
        finishLoad: finishLoad(dispatch),
        isDead: () => {
          return hp <= 0;
        },
        replaceLetters: replaceLetters(dispatch),
        ability: {
          ...character.ability,
        },
        submitWord: submitWord(dispatch),
        lettersSinceLastIntentTrigger,
        resetIntentTracker: resetIntentTracker(dispatch),
      }}
    >
      {children}
    </EnemyContext.Provider>
  );
};

const useEnemy = () => useContext(EnemyContext);

export default useEnemy;
export { EnemyContextProvider };
