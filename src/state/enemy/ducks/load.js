import characters from "../../../data/characters";
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

    return {
      ...state,
      key,
      hp: character.hp,
      maxHp: character.hp,
      currentIntent: pickRandomKey(character.intents),
      lettersSinceLastIntentTrigger: 0,
      letters: character.letters,
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
