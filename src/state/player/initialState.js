import characters from "../../data/characters";
import pickRandomPlayerCharKeyForLevel from "../../utils/pickRandomPlayerCharKeyForLevel";

const key = pickRandomPlayerCharKeyForLevel(1);
const { hp, minWordLength, memory, letters } = characters[key];

export default {
  key,
  hp,
  maxHp: hp,
  minWordLength,
  maxRememberedWords: memory,
  rememberedWords: [],
  letters,
  loadingKey: null,
};
