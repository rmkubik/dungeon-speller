import characters from "../../data/characters";
import createLettersFromString from "../../utils/createLettersFromString";
import getEnemyForEncounterLevel from "../../utils/getEnemyForEncounterLevel";
import pickRandomKey from "../../utils/object/pickRandomKey";

const key = getEnemyForEncounterLevel(1);
const { hp, intents, word } = characters[key];

let letters = createLettersFromString(key);

if (word) {
  letters = createLettersFromString(word);
}

export default {
  key,
  hp,
  maxHp: hp,
  lettersSinceLastIntentTrigger: 0,
  currentIntent: pickRandomKey(intents),
  letters,
  state: "loaded", // 'loaded', 'loading'
  debug: false,
};
