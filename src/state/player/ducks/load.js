import characters from "../../../data/characters";

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

    return {
      ...state,
      key,
      hp: character.hp,
      maxHp: character.hp,
      minWordLength: character.minWordLength,
      maxRememberedWords: character.memory,
      letters: character.letters,
    };
  }

  return state;
}

export default load;
export { reduceLoadPlayer };
