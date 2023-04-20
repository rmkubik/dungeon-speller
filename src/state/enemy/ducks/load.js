import characters from "../../../data/characters";
import pickRandomKey from "../../../utils/object/pickRandomKey";

const load = (dispatch) => (key) => {
  dispatch({
    type: "LOAD_ENEMY",
    key,
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
    };
  }

  return state;
}

export default load;
export { reduceLoadEnemy };
