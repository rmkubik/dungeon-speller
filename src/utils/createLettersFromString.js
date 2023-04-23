function createLettersFromString(word) {
  return word.split("").map((letter) => {
    return {
      text: letter,
    };
  });
}

export default createLettersFromString;
