import pickRandomlyFromArray from "../utils/array/pickRandomlyFromArray";
import isVowel from "../utils/isVowel";

const characters = {
  knight: {
    hp: 10,
    memory: 10,
    minWordLength: 4,
    ability: {
      name: "Armor",
      effectText: "Reduce incoming damage by 1",
      onTakeDamage: (incomingDamage) => {
        return Math.max(0, incomingDamage - 1);
      },
    },
    letters: [
      {
        text: "k",
      },
      {
        text: "n",
      },
      {
        text: "i",
      },
      {
        text: "g",
      },
      {
        text: "h",
      },
      {
        text: "t",
      },
    ],
  },
  hawk: {
    hp: 3,
    intents: {
      claw: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Fly",
      effectText: "Dodge words longer than 5 🔠",
      onTakeDamage: ({ incomingDamage, word }) => {
        if (word.length > 5) {
          return 0;
        }

        return incomingDamage;
      },
    },
    letters: [
      {
        text: "h",
      },
      {
        text: "a",
      },
      {
        text: "w",
      },
      {
        text: "k",
      },
    ],
  },
  dragon: {
    hp: 12,
    intents: {
      claw: {
        letterCount: 6,
        effect: {
          value: 3,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "d",
      },
      {
        text: "r",
      },
      {
        text: "a",
      },
      {
        text: "g",
      },
      {
        text: "o",
      },
      {
        text: "n",
      },
    ],
  },
  spider: {
    hp: 8,
    intents: {
      bite: {
        letterCount: 3,
        effect: {
          value: 1,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Web",
      effectText: "Locks a random player letter for every word submitted",
      onUsedWord: ({ player }) => {
        const playerLetterEntries = Object.entries(player.letters);
        const unAffectedLetterIndices = playerLetterEntries
          .filter(([index, letter]) => !letter.effect)
          .map(([index]) => parseInt(index, 10));
        const targetIndex = pickRandomlyFromArray(unAffectedLetterIndices);

        if (targetIndex >= 0) {
          player.updateLetterEffect(targetIndex, {
            symbol: "lock",
            value: 1,
          });
        }
      },
    },
    letters: [
      {
        text: "s",
      },
      {
        text: "p",
      },
      {
        text: "i",
      },
      {
        text: "d",
      },
      {
        text: "e",
      },
      {
        text: "r",
      },
    ],
  },
  wolf: {
    hp: 4,
    intents: {
      bite: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "w",
      },
      {
        text: "o",
      },
      {
        text: "l",
      },
      {
        text: "f",
      },
    ],
  },
  serpent: {
    hp: 8,
    intents: {
      bite: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "s",
      },
      {
        text: "e",
      },
      {
        text: "r",
      },
      {
        text: "p",
      },
      {
        text: "e",
      },
      {
        text: "n",
      },
      {
        text: "t",
      },
    ],
  },
  serpent: {
    hp: 8,
    intents: {
      bite: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "s",
      },
      {
        text: "e",
      },
      {
        text: "r",
      },
      {
        text: "p",
      },
      {
        text: "e",
      },
      {
        text: "n",
      },
      {
        text: "t",
      },
    ],
  },
  merfolk: {
    hp: 8,
    intents: {
      slash: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "m",
      },
      {
        text: "e",
      },
      {
        text: "r",
      },
      {
        text: "f",
      },
      {
        text: "o",
      },
      {
        text: "l",
      },
      {
        text: "k",
      },
    ],
  },
  dinosaur: {
    hp: 12,
    intents: {
      bite: {
        letterCount: 8,
        effect: {
          value: 5,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "d",
      },
      {
        text: "i",
      },
      {
        text: "n",
      },
      {
        text: "o",
      },
      {
        text: "s",
      },
      {
        text: "a",
      },
      {
        text: "u",
      },
      {
        text: "r",
      },
    ],
  },
  ant: {
    hp: 3,
    intents: {
      bite: {
        letterCount: 2,
        effect: {
          value: 1,
          symbol: "sword",
        },
      },
    },
    letters: [
      {
        text: "a",
      },
      {
        text: "n",
      },
      {
        text: "t",
      },
    ],
  },
  golem: {
    hp: 3,
    intents: {
      hit: {
        letterCount: 6,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Armor",
      effectText: "Reduce incoming damage by 1",
      onTakeDamage: ({ incomingDamage, word }) => {
        return Math.max(0, incomingDamage - 1);
      },
    },
    letters: [
      {
        text: "g",
      },
      {
        text: "o",
      },
      {
        text: "l",
      },
      {
        text: "e",
      },
      {
        text: "m",
      },
    ],
  },
  ghost: {
    hp: 2,
    intents: {
      moan: {
        letterCount: 5,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Immaterial",
      effectText: "Immune to consonant damage.",
      onCalculateEffects: ({ effects, enemyLettersInWord, word }) => {
        const vowelsOnly = enemyLettersInWord.filter(isVowel);

        return {
          ...effects,
          sword: vowelsOnly.length,
        };
      },
    },
    letters: [
      {
        text: "g",
      },
      {
        text: "h",
      },
      {
        text: "o",
      },
      {
        text: "s",
      },
      {
        text: "t",
      },
    ],
  },
  ghoul: {
    hp: 5,
    intents: {
      moan: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Curse",
      effectText: "Lock player vowels.",
      onEnemyEnter: ({ enemy, player }) => {
        player.letters.forEach((letter, index) => {
          if (isVowel(letter.text)) {
            player.updateLetterEffect(index, {
              symbol: "lock",
              value: 1,
            });
          }
        });
      },
      onEnemyLeave: ({ enemy, player }) => {
        player.letters.forEach((letter, index) => {
          if (isVowel(letter.text)) {
            player.updateLetterEffect(index, undefined);
          }
        });
      },
    },
    letters: [
      {
        text: "g",
      },
      {
        text: "h",
      },
      {
        text: "o",
      },
      {
        text: "u",
      },
      {
        text: "l",
      },
    ],
  },
};

export default characters;
