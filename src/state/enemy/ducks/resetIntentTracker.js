const resetIntentTracker = (dispatch) => (initialValue) => {
  dispatch({
    type: "INTENT_RESET",
    initialValue,
  });
};

function reduceIntentReset(state, action) {
  if (action.type === "INTENT_RESET") {
    return {
      ...state,
      lettersSinceLastIntentTrigger: action.initialValue
        ? action.initialValue
        : 0,
    };
  }

  return state;
}

export default resetIntentTracker;
export { reduceIntentReset };
