function countUntriggeredUsedWordLetters(player, enemy) {
  const unTriggeredUsedWords = player.rememberedWords.slice(enemy.intentIndex);
  const letterCount = unTriggeredUsedWords.reduce(
    (count, word) => word.length + count,
    0
  );

  return letterCount;
}

export default countUntriggeredUsedWordLetters;
