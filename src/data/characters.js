import pickRandomlyFromArray from "../utils/array/pickRandomlyFromArray";
import isVowel from "../utils/isVowel";

const characters = {
  peasant: {
    hp: 6,
    memory: 8,
    minWordLength: 3,
    level: 1,
    letters: [
      { text: "p" },
      { text: "e" },
      { text: "a" },
      { text: "s" },
      { text: "a" },
      { text: "n" },
      { text: "t" },
    ],
  },
  innkeep: {
    hp: 8,
    memory: 6,
    minWordLength: 4,
    level: 1,
    letters: [
      { text: "i" },
      { text: "n" },
      { text: "n" },
      { text: "k" },
      { text: "e" },
      { text: "e" },
      { text: "p" },
    ],
  },
  drunk: {
    hp: 8,
    memory: 3,
    minWordLength: 4,
    level: 1,
    letters: [
      { text: "d" },
      { text: "r" },
      { text: "u" },
      { text: "n" },
      { text: "k" },
    ],
  },
  noble: {
    hp: 5,
    memory: 12,
    minWordLength: 4,
    level: 1,
    letters: [
      { text: "n" },
      { text: "o" },
      { text: "b" },
      { text: "l" },
      { text: "e" },
    ],
  },
  brawler: {
    hp: 6,
    memory: 8,
    minWordLength: 3,
    level: 6,
    letters: [
      { text: "b" },
      { text: "r" },
      { text: "a" },
      { text: "w" },
      { text: "l" },
      { text: "e" },
      { text: "r" },
    ],
  },
  squire: {
    hp: 8,
    memory: 6,
    minWordLength: 4,
    level: 6,
    letters: [
      { text: "s" },
      { text: "q" },
      { text: "u" },
      { text: "i" },
      { text: "r" },
      { text: "e" },
    ],
  },
  thief: {
    hp: 8,
    memory: 6,
    minWordLength: 5,
    level: 6,
    letters: [
      { text: "t" },
      { text: "h" },
      { text: "i" },
      { text: "e" },
      { text: "f" },
    ],
  },
  scholar: {
    hp: 5,
    memory: 12,
    minWordLength: 5,
    level: 6,
    letters: [
      { text: "s" },
      { text: "c" },
      { text: "h" },
      { text: "o" },
      { text: "l" },
      { text: "a" },
      { text: "r" },
    ],
  },
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
  rogue: {
    hp: 8,
    memory: 10,
    minWordLength: 2,
    ability: {
      name: "Backstab",
      effectText: "2x damage if using the enemy's last letter",
      onDealDamage: ({ incomingDamage, word, enemy }) => {
        const enemyLastLetter = enemy.letters[enemy.letters.length - 1].text;

        return word.includes(enemyLastLetter)
          ? incomingDamage * 2
          : incomingDamage;
      },
    },
    letters: [
      {
        text: "r",
      },
      {
        text: "o",
      },
      {
        text: "g",
      },
      {
        text: "u",
      },
      {
        text: "e",
      },
    ],
  },
  barbarian: {
    hp: 12,
    memory: 5,
    minWordLength: 4,
    ability: {
      name: "Rage",
      effectText: "Deal extra damage for each missing hp",
      onDealDamage: ({ incomingDamage, word, enemy, player }) => {
        return incomingDamage + (player.hp.max - player.hp.current);
      },
    },
    letters: [
      {
        text: "b",
      },
      {
        text: "a",
      },
      {
        text: "r",
      },
      {
        text: "b",
      },
      {
        text: "a",
      },
      {
        text: "r",
      },
      {
        text: "i",
      },
      {
        text: "a",
      },
      {
        text: "n",
      },
    ],
  },
  hawk: {
    hp: 3,
    encounter: {
      min: 2,
      max: 4,
    },
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
    encounter: {
      min: 2,
      max: 4,
    },
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
      onEnemyLeave: ({ enemy, player }) => {
        const letterKeys = Object.keys(player.letters);
        const letterIndices = letterKeys.map(([index]) => parseInt(index));
        const lockChanges = letterIndices.map((index) => {
          return [index, undefined];
        });

        player.updateLetterEffectBulk(lockChanges);
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
    encounter: {
      min: 2,
      max: 4,
    },
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
    encounter: {
      min: 2,
      max: 4,
    },
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
    encounter: {
      min: 1,
      max: 1,
    },
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
        const letterEntries = Object.entries(player.letters);
        const vowelIndices = letterEntries
          .filter(([index, letter]) => isVowel(letter.text))
          .map(([index]) => parseInt(index));
        const lockChanges = vowelIndices.map((index) => {
          return [index, { symbol: "lock", value: 1 }];
        });

        player.updateLetterEffectBulk(lockChanges);
      },
      onEnemyLeave: ({ enemy, player }) => {
        const letterEntries = Object.entries(player.letters);
        const vowelIndices = letterEntries
          .filter(([index, letter]) => isVowel(letter.text))
          .map(([index]) => parseInt(index));
        const lockChanges = vowelIndices.map((index) => {
          return [index, undefined];
        });

        player.updateLetterEffectBulk(lockChanges);
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
  shaman: {
    hp: 12,
    encounter: {
      min: 5,
      max: 5,
    },
    intents: {
      attack: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Transform",
      effectText: "Change after every word",
      onUsedWord: ({ enemy }) => {
        const transforms = ["hawk", "serpent", "spider", "ant", "wolf"];
        enemy.replaceLetters(pickRandomlyFromArray(transforms));
      },
    },
    letters: [
      { text: "s" },
      { text: "h" },
      { text: "a" },
      { text: "m" },
      { text: "a" },
      { text: "n" },
    ],
  },
  imp: {
    hp: 6,
    encounter: {
      min: 6,
      max: 9,
    },
    intents: {
      stab: {
        letterCount: 3,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Spite",
      effectText: "Deal 1 damage on death",
      onEnemyLeave: ({ enemy, player }) => {
        player.takeDamage(1);
      },
    },
    letters: [
      {
        text: "i",
      },
      {
        text: "m",
      },
      {
        text: "p",
      },
    ],
  },
};

export default characters;
