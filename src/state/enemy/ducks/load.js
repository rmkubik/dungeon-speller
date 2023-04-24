import characters from "../../../data/characters";
import createLettersFromString from "../../../utils/createLettersFromString";
import pickRandomKey from "../../../utils/object/pickRandomKey";

const load = (dispatch) => (key) => {
  dispatch({
    type: "LOAD_ENEMY",
    key,
  });
};

const finishLoad = (dispatch) => () => {
  dispatch({
    type: "LOAD_ENEMY_FINISHED",
  });
};

function reduceLoadEnemy(state, action) {
  if (action.type === "LOAD_ENEMY") {
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
      currentIntent: pickRandomKey(character.intents),
      lettersSinceLastIntentTrigger: 0,
      letters,
      state: "loading",
    };
  }

  if (action.type === "LOAD_ENEMY_FINISHED") {
    return { ...state, state: "loaded" };
  }

  return state;
}

export default load;
export { reduceLoadEnemy, finishLoad };
