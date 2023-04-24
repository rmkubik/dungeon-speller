import intersectionOfStrings from "./intersectionOfStrings";

function calculateEffects({ player, enemy, word, wordCountThisFight }) {
  const enemyString = enemy.letters.map((letter) => letter.text).join("");
  const enemyLettersInWord = intersectionOfStrings(enemyString, word);

  const initialEffects = {
    sword: enemyLettersInWord.length,
    shield: 0,
    heart: 0,
    skull: 0,
  };

  const playerEffects =
    player.ability?.onCalculateEffects?.({
      effects: initialEffects,
      player,
      enemy,
      enemyLettersInWord,
      word,
      wordCountThisFight,
    }) ?? initialEffects;

  const finalEffects =
    enemy.ability?.onCalculateEffects?.({
      effects: playerEffects,
      player,
      enemy,
      enemyLettersInWord,
      word,
      wordCountThisFight,
    }) ?? playerEffects;

  return finalEffects;
}

export default calculateEffects;
