import reduceReducers from "../../utils/reducers/reduceReducers";
import { reduceLettersReplace } from "../player/ducks/replaceLetters";
import { reduceHealthAdjust } from "../player/ducks/takeDamage";
import { reduceLoadEnemy } from "./ducks/load";
import { reduceNewIntent } from "./ducks/pickNewIntent";
import { reduceIntentReset } from "./ducks/resetIntentTracker";
import { reduceSubmitWord } from "./ducks/submitWord";

function reducer(state, action) {
  if (state.debug) {
    console.log(`Enemy action: ${action.type}`);
  }

  return reduceReducers(
    reduceSubmitWord,
    reduceHealthAdjust,
    reduceNewIntent,
    reduceLettersReplace,
    reduceLoadEnemy,
    reduceIntentReset
  )(state, action);
}

export default reducer;
