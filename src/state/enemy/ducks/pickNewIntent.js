import characters from "../../../data/characters";
import pickRandomKey from "../../../utils/object/pickRandomKey";

const pickNewIntent = (dispatch) => () => {
  dispatch({
    type: "INTENT_NEW",
  });
};

function reduceNewIntent(state, action) {
  if (action.type === "INTENT_NEW") {
    const { key } = state;

    const character = characters[key];
    const newIntent = pickRandomKey(character.intents);

    return {
      ...state,
      currentIntent: newIntent,
    };
  }

  return state;
}

export default pickNewIntent;
export { reduceNewIntent };
