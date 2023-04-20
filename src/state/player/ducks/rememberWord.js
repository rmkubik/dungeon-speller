const rememberWord = (dispatch) => (word) => {
  dispatch({
    type: "WORD_REMEMBER",
    word,
  });
};

function reduceRememberWord(state, action) {
  if (action.type === "WORD_REMEMBER") {
    const { rememberedWords, maxRememberedWords } = state;
    const { word } = action;

    let prunedUsedWords = [word, ...rememberedWords];

    if (rememberedWords.length >= maxRememberedWords) {
      // Remove first word
      prunedUsedWords.pop();
    }

    return {
      ...state,
      rememberedWords: prunedUsedWords,
    };
  }

  return state;
}

export default rememberWord;
export { reduceRememberWord };
