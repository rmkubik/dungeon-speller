import characters from "../../data/characters";
import createLettersFromString from "../../utils/createLettersFromString";
import pickRandomPlayerCharKeyForLevel from "../../utils/pickRandomPlayerCharKeyForLevel";

const key = pickRandomPlayerCharKeyForLevel(1);
const { hp, minWordLength, memory, word } = characters[key];

let letters = createLettersFromString(key);

if (word) {
  letters = createLettersFromString(word);
}

export default {
  key,
  hp,
  maxHp: hp,
  minWordLength,
  maxRememberedWords: memory,
  rememberedWords: [],
  letters,
  loadingKey: null,
  debug: false,
};
