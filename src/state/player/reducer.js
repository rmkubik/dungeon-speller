import reduceReducers from "../../utils/reducers/reduceReducers";
import { reduceLettersAdd } from "./ducks/addLetter";
import { reduceLoadPlayer } from "./ducks/load";
import { reduceRememberWord } from "./ducks/rememberWord";
import { reduceLettersReplace } from "./ducks/replaceLetters";
import { reduceHealthAdjust } from "./ducks/takeDamage";
import { reduceLettersUpdate } from "./ducks/updateLetterEffect";

function reducer(state, action) {
  if (state.debug) {
    console.log(`Player action: ${action.type}`);
  }

  return reduceReducers(
    reduceRememberWord,
    reduceHealthAdjust,
    reduceLettersAdd,
    reduceLettersUpdate,
    reduceLoadPlayer,
    reduceLettersReplace
  )(state, action);
}

export default reducer;
