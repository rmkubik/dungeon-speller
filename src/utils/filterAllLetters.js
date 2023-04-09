function filterAllLetters(character, targetLetter) {
  return character.letters.filter((letter) => {
    return letter.text === targetLetter;
  });
}
export default filterAllLetters;
