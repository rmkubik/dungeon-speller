const addLetter = (dispatch) => (letter) => {
  dispatch({
    type: "LETTERS_ADD",
    letter,
  });
};

function reduceLettersAdd(state, action) {
  if (action.type === "LETTERS_ADD") {
    const { letter } = action;
    const { letters } = state;

    const newLetters = [...letters, { text: letter }];

    return {
      ...state,
      letters: newLetters,
    };
  }

  return state;
}

export default addLetter;
export { reduceLettersAdd };
