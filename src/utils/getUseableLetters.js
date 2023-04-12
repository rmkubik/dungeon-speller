function getUseableLetters(letters) {
  return letters
    .filter((letter) => !letter.effect || letter.effect.symbol !== "lock")
    .map((letter) => letter.text);
}

export default getUseableLetters;
