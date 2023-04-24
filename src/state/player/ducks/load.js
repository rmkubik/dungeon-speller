import characters from "../../../data/characters";
import createLettersFromString from "../../../utils/createLettersFromString";

const load = (dispatch) => (key) => {
  dispatch({
    type: "LOAD_PLAYER",
    key,
  });
};

function reduceLoadPlayer(state, action) {
  if (action.type === "LOAD_PLAYER") {
    const { key } = action;

    const character = characters[key];

    let letters = createLettersFromString(key);

    if (character.word) {
      letters = createLettersFromString(character.word);
    }

    return {
      ...state,
      key,
      hp: character.hp,
      maxHp: character.hp,
      minWordLength: character.minWordLength,
      maxRememberedWords: character.memory,
      letters,
    };
  }

  return state;
}

export default load;
export { reduceLoadPlayer };
