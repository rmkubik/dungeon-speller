const resetIntentTracker = (dispatch) => () => {
  dispatch({
    type: "INTENT_RESET",
  });
};

function reduceIntentReset(state, action) {
  if (action.type === "INTENT_RESET") {
    return {
      ...state,
      lettersSinceLastIntentTrigger: 0,
    };
  }

  return state;
}

export default resetIntentTracker;
export { reduceIntentReset };
