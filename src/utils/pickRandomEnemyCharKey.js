import characters from "../data/characters";
import pickRandomlyFromArray from "./array/pickRandomlyFromArray";
import isCharacterValidEnemy from "./isCharacterValidEnemy";

function pickRandomEnemyCharKey() {
  const characterEntries = Object.entries(characters);
  const enemyCharacterKeys = characterEntries
    .filter(([charKey, char]) => isCharacterValidEnemy(char))
    .map(([charKey]) => charKey);
  const newEnemyCharKey = pickRandomlyFromArray(enemyCharacterKeys);

  return newEnemyCharKey;
}

export default pickRandomEnemyCharKey;
