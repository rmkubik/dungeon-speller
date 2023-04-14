function isCharacterValidPlayer(character) {
  return (
    character.memory !== undefined && character.minWordLength !== undefined
  );
}

export default isCharacterValidPlayer;
