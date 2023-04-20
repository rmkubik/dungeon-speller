import update from "../../../utils/array/update";

const updateLetterEffect = (dispatch) => (index, effect) => {
  dispatch({
    type: "LETTERS_UPDATE",
    changes: [[index, effect]],
  });
};

const updateLetterEffectBulk = (dispatch) => (changes) => {
  dispatch({
    type: "LETTERS_UPDATE",
    changes,
  });
};

function reduceLettersUpdate(state, action) {
  if (action.type === "LETTERS_UPDATE") {
    const { changes } = action;
    const { letters } = state;

    const newLetters = changes.reduce((currentLetters, currentChange) => {
      const [index, newEffect] = currentChange;

      return update(currentLetters, index, {
        ...currentLetters[index],
        /**
         * e.g.
         * {
         *   symbol: 'lock',
         *   value: 1
         * }
         */
        effect: newEffect,
      });
    }, letters);

    return {
      ...state,
      letters: newLetters,
    };
  }

  return state;
}

export default updateLetterEffect;
export { reduceLettersUpdate, updateLetterEffectBulk };
