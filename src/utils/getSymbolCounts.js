import filterAllLetters from "./filterAllLetters";

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
