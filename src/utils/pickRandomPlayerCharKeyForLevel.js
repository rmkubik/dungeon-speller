import characters from "../data/characters";
import pickRandomlyFromArray from "./array/pickRandomlyFromArray";
import isCharacterValidPlayer from "./isCharacterValidPlayer";
import pickRandomPlayerCharKey from "./pickRandomPlayerCharKey";

function pickRandomPlayerCharKeyForLevel(level) {
  const characterEntries = Object.entries(characters);
  const playerCharacterKeys = characterEntries
    .filter(
      ([charKey, char]) => isCharacterValidPlayer(char) && char.level === level
    )
    .map(([charKey]) => charKey);
  const newPlayerCharKey = pickRandomlyFromArray(playerCharacterKeys);

  if (!newPlayerCharKey) {
    console.warn(`No valid player for level: ${level}. Picking random player.`);
    return pickRandomPlayerCharKey();
  }

  return newPlayerCharKey;
}

export default pickRandomPlayerCharKeyForLevel;
