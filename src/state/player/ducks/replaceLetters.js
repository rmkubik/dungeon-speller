const replaceLetters = (dispatch) => (word) => {
  dispatch({
    type: "LETTERS_REPLACE",
    word,
  });
};

function reduceLettersReplace(state, action) {
  if (action.type === "LETTERS_REPLACE") {
    const { word } = action;

    const newLetters = word.split("").map((letter) => {
      return {
        text: letter,
      };
    });

    return {
      ...state,
      letters: newLetters,
    };
  }

  return state;
}

export default replaceLetters;
export { reduceLettersReplace };
