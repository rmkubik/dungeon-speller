import characters from "../data/characters";
import pickRandomlyFromArray from "./array/pickRandomlyFromArray";
import isCharacterValidEnemy from "./isCharacterValidEnemy";
import inRange from "./number/inRange";
import pickRandomEnemyCharKey from "./pickRandomEnemyCharKey";

function getEnemyForEncounterLevel(level) {
  const characterEntries = Object.entries(characters);
  const enemyEntries = characterEntries.filter(([key, character]) =>
    isCharacterValidEnemy(character)
  );
  const enemyEntriesInLevel = enemyEntries.filter(([key, enemy]) =>
    inRange(level, enemy.encounter?.min, enemy.encounter?.max)
  );

  const [enemyKey] = pickRandomlyFromArray(enemyEntriesInLevel) ?? [];

  if (!enemyKey) {
    console.warn(
      `No valid enemy encounter for level: ${level}. Picking random enemy.`
    );
    return pickRandomEnemyCharKey();
  }

  return enemyKey;
}

export default getEnemyForEncounterLevel;
