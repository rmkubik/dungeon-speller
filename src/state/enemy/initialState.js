import characters from "../../data/characters";
import getEnemyForEncounterLevel from "../../utils/getEnemyForEncounterLevel";
import pickRandomKey from "../../utils/object/pickRandomKey";

const key = getEnemyForEncounterLevel(1);
const { hp, intents, letters } = characters[key];

export default {
  key,
  hp,
  maxHp: hp,
  lettersSinceLastIntentTrigger: 0,
  currentIntent: pickRandomKey(intents),
  letters,
  state: "loaded", // 'loaded', 'loading'
};
