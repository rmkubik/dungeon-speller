import intersectionOfStrings from "./intersectionOfStrings";

function calculateEffects(player, enemy, word) {
  const enemyString = enemy.letters.map((letter) => letter.text).join("");
  const enemyLettersInWord = intersectionOfStrings(enemyString, word);

  const initialEffects = {
    sword: enemyLettersInWord.length,
    shield: 0,
    heart: 0,
    skull: 0,
  };

  const finalEffects =
    enemy.ability?.onCalculateEffects?.({
      effects: initialEffects,
      player,
      enemy,
      enemyLettersInWord,
      word,
    }) ?? initialEffects;

  return finalEffects;
}

export default calculateEffects;
