import filterAllLetters from "./filterAllLetters";

/**
 * TODO: This uses the old static player/enemy
 * characters. It doesn't reference the current
 * player/enemy dynamic values.
 */
function getSymbolCounts(player, enemy, word) {
  const symbolCounts = {};

  Object.keys(symbols).forEach((symbol) => {
    symbolCounts[symbol] = 0;
  });

  for (let letter of word) {
    if (player.includes(letter)) {
      const playerCharacter = characters[player];
      const playerLetters = filterAllLetters(playerCharacter, letter);
      playerLetters.forEach((playerLetter) => {
        if (playerLetter.effect) {
          const effect = playerLetter.effect;

          symbolCounts[effect.symbol] += effect.value;
        }
      });
    }

    if (enemy.includes(letter)) {
      const enemyCharacter = characters[enemy];
      const enemyLetters = filterAllLetters(enemyCharacter, letter);
      enemyLetters.forEach((enemyLetter) => {
        if (enemyLetter.effect) {
          const effect = enemyLetter.effect;

          symbolCounts[effect.symbol] += effect.value;
        }
      });
    }
  }

  return symbolCounts;
}

export default getSymbolCounts;
