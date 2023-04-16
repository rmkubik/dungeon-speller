import characters from "../data/characters";
import pickRandomlyFromArray from "./array/pickRandomlyFromArray";
import isCharacterValidPlayer from "./isCharacterValidPlayer";

function pickRandomPlayerCharKeyForLevel(level) {
  const characterEntries = Object.entries(characters);
  const playerCharacterKeys = characterEntries
    .filter(
      ([charKey, char]) => isCharacterValidPlayer(char) && char.level === level
    )
    .map(([charKey]) => charKey);
  const newPlayerCharKey = pickRandomlyFromArray(playerCharacterKeys);

  return newPlayerCharKey;
}

export default pickRandomPlayerCharKeyForLevel;
