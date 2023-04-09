import intersectionOfStrings from "./intersectionOfStrings";

function calculateEffects(player, enemy, word) {
  const enemyLetters = intersectionOfStrings(enemy, word);

  return {
    sword: enemyLetters.length,
    shield: 0,
    heart: 0,
    skull: 0,
  };
}

export default calculateEffects;
