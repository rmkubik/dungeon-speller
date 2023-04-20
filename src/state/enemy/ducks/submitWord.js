import characters from "../../../data/characters";

const submitWord = (dispatch) => (word) => {
  dispatch({
    type: "WORD_SUBMIT",
    word,
  });
};

function reduceSubmitWord(state, action) {
  if (action.type === "WORD_SUBMIT") {
    const { key, lettersSinceLastIntentTrigger, currentIntent } = state;
    const { word } = action;

    let newLettersCount = word.length + lettersSinceLastIntentTrigger;

    return {
      ...state,
      lettersSinceLastIntentTrigger: newLettersCount,
    };
  }

  return state;
}

export default submitWord;
export { reduceSubmitWord };
