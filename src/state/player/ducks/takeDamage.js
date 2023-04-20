import clamp from "../../../utils/number/clamp";

const takeDamage = (dispatch) => (damage) => {
  dispatch({
    type: "HEALTH_ADJUST",
    healthAdjustment: -damage,
  });
};

function reduceHealthAdjust(state, action) {
  if (action.type === "HEALTH_ADJUST") {
    const { healthAdjustment } = action;
    const { hp, maxHp } = state;

    const newHp = clamp(0, hp + healthAdjustment, maxHp);

    return {
      ...state,
      hp: newHp,
    };
  }

  return state;
}

export default takeDamage;
export { reduceHealthAdjust };
