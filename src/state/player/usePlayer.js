import React, { createContext, useContext, useReducer } from "react";
import characters from "../../data/characters";
import reducer from "./reducer";
import initialState from "./initialState";
import rememberWord from "./ducks/rememberWord";
import takeDamage from "./ducks/takeDamage";
import addLetter from "./ducks/addLetter";
import updateLetterEffect, {
  updateLetterEffectBulk,
} from "./ducks/updateLetterEffect";
import load from "./ducks/load";
import createLettersFromString from "../../utils/createLettersFromString";

const PlayerContext = createContext(null);

const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("player", { state });

  const {
    hp,
    maxHp,
    key,
    rememberedWords,
    minWordLength,
    maxRememberedWords,
    word,
  } = state;
  const character = characters[key];

  let letters = createLettersFromString(key);

  if (word) {
    letters = createLettersFromString(word);
  }

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
        updateLetterEffect: updateLetterEffect(dispatch),
        updateLetterEffectBulk: updateLetterEffectBulk(dispatch),
        takeDamage: takeDamage(dispatch),
        rememberWord: rememberWord(dispatch),
        ability: {
          ...character.ability,
        },
        load: load(dispatch),
        addLetter: addLetter(dispatch),
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export default usePlayer;
export { PlayerContextProvider };
