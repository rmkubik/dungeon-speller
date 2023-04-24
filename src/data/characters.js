import pickRandomlyFromArray from "../utils/array/pickRandomlyFromArray";
import shuffle from "../utils/array/shuffle";
import isVowel from "../utils/isVowel";

const characters = {
  peasant: {
    hp: 6,
    memory: 8,
    minWordLength: 3,
    level: 1,
    ability: {
      name: "Weak",
      effectText: "Deal 1 less damage (min 1)",
      onCalculateEffects: ({ effects }) => {
        return {
          ...effects,
          sword: Math.max(1, effects.sword - 1),
        };
      },
    },
  },
  innkeep: {
    hp: 8,
    memory: 6,
    minWordLength: 4,
    level: 1,
    ability: {
      name: "Distracted",
      effectText: "Cannot use a word longer than 5 letters",
      isWordValid: (word) => {
        return word.length <= 5;
      },
    },
  },
  drunk: {
    hp: 8,
    memory: 3,
    minWordLength: 4,
    level: 1,
    ability: {
      name: "Dizzy",
      effectText: "Scramble enemy letters after every word",
      onUsedWord: ({ enemy }) => {
        const enemyLetters = enemy.letters.map((letter) => letter.text);
        const scrambledWord = shuffle(enemyLetters).join("");
        enemy.replaceLetters(scrambledWord);
      },
    },
  },
  noble: {
    hp: 5,
    memory: 10,
    minWordLength: 4,
    level: 1,
    ability: {
      name: "Snooty",
      effectText: "Cannot use words with more than 3 consonants",
      isWordValid: (word) => {
        const consonantCount = word
          .split("")
          .map((letter) => isVowel(letter))
          .filter((x) => !x).length;
        return consonantCount <= 3;
      },
    },
  },
  brawler: {
    hp: 10,
    memory: 6,
    minWordLength: 4,
    level: 6,
    ability: {
      name: "Anger",
      effectText: "Deal 1 extra damage for each word this fight",
      onCalculateEffects: ({ effects, wordCountThisFight }) => {
        return {
          ...effects,
          sword: Math.max(0, effects.sword + wordCountThisFight),
        };
      },
    },
  },
  squire: {
    hp: 12,
    memory: 8,
    minWordLength: 4,
    level: 6,
    ability: {
      name: "Stalling",
      effectText: "Add 2 letters to enemy intent countdown",
      onResetIntentTracker: () => {
        return -2;
      },
    },
  },
  thief: {
    hp: 8,
    memory: 10,
    minWordLength: 3,
    level: 6,
    ability: {
      name: "Pickpocket",
      effectText: "Steal enemy letter on kill",
      onEnemyLeave: ({ enemy, player }) => {
        const enemyLetters = enemy.letters.map((letter) => letter.text);

        player.addLetter(pickRandomlyFromArray(enemyLetters));
      },
    },
  },
  scholar: {
    hp: 6,
    memory: 12,
    minWordLength: 5,
    level: 6,
    ability: {
      name: "Reference",
      effectText: "Odd length words deal 5 damage",
      onCalculateEffects: ({ effects, word }) => {
        const isOdd = word.length % 2 !== 0;

        return {
          ...effects,
          sword: isOdd ? 5 : effects.sword,
        };
      },
    },
  },
  warrior: {
    hp: 16,
    memory: 8,
    minWordLength: 4,
    level: 11,
    ability: {
      name: "Strength",
      effectText: "Deal 1 extra damage",
      onCalculateEffects: ({ effects }) => {
        return {
          ...effects,
          sword: effects.sword + 1,
        };
      },
    },
  },
  knight: {
    hp: 10,
    memory: 10,
    minWordLength: 4,
    level: 11,
    ability: {
      name: "Armor",
      effectText: "Reduce incoming damage by 1",
      onTakeDamage: (incomingDamage) => {
        return Math.max(0, incomingDamage - 1);
      },
    },
  },
  rogue: {
    hp: 8,
    memory: 10,
    minWordLength: 2,
    level: 11,
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
  },
  acolyte: {
    hp: 9,
    memory: 12,
    minWordLength: 5,
    level: 11,
    ability: {
      name: "Specific",
      effectText: "Even length words deal 2 extra damage",
      onCalculateEffects: ({ effects, word }) => {
        const isEven = word.length % 2 === 0;

        return {
          ...effects,
          sword: isEven ? effects.sword + 2 : effects.sword,
        };
      },
    },
  },
  barbarian: {
    hp: 18,
    memory: 5,
    minWordLength: 4,
    level: 16,
    ability: {
      name: "Rage",
      effectText: "Deal extra damage for each missing hp",
      onDealDamage: ({ incomingDamage, word, enemy, player }) => {
        return incomingDamage + (player.hp.max - player.hp.current);
      },
    },
  },
  paladin: {
    hp: 20,
    memory: 10,
    minWordLength: 4,
    level: 16,
    ability: {
      name: "Devotion",
      effectText:
        "Deal 1 extra damage for each word in memory that starts with the same letter",
      onCalculateEffects: ({ effects, word, player }) => {
        const firstLetter = word[0];

        const firstLetterMatchCount = player.rememberedWords
          .map((word) => word[0])
          .filter((letter) => letter === firstLetter).length;

        return {
          ...effects,
          sword: effects.sword + firstLetterMatchCount,
        };
      },
    },
  },
  assassin: {
    hp: 12,
    memory: 10,
    minWordLength: 2,
    level: 16,
    ability: {
      name: "Barrage",
      effectText: "Every other word deals 3 bonus damage",
      onCalculateEffects: ({ effects, wordCountThisFight }) => {
        const isEven = wordCountThisFight % 2 === 0;

        return {
          ...effects,
          sword: isEven ? effects.sword + 3 : effects.sword,
        };
      },
    },
  },
  wizard: {
    hp: 10,
    memory: 15,
    minWordLength: 5,
    level: 16,
    ability: {
      name: "Truth",
      effectText: "Deal damage equal to word length",
      onCalculateEffects: ({ effects, word }) => {
        return {
          ...effects,
          sword: word.length,
        };
      },
    },
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
  },
  ghost: {
    hp: 2,
    encounter: {
      min: 6,
      max: 9,
    },
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
  },
  ghoul: {
    hp: 5,
    encounter: {
      min: 6,
      max: 9,
    },
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
  },
  thorny: {
    hp: 8,
    encounter: {
      min: 6,
      max: 9,
    },
    intents: {
      stab: {
        letterCount: 6,
        effect: {
          value: 2,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Spiky",
      effectText: "Deal 1 damage after taking damage",
      onTakeDamage: ({ incomingDamage, word, player }) => {
        if (incomingDamage > 0) {
          player.takeDamage(1);
        }

        return incomingDamage;
      },
    },
  },
  vampire: {
    hp: 14,
    encounter: {
      min: 10,
      max: 10,
    },
    intents: {
      bite: {
        letterCount: 6,
        effect: {
          value: 3,
          symbol: "sword",
        },
      },
    },
    ability: {
      name: "Drain",
      effectText: "Heal equal to damage dealt",
      onDealDamage: ({ enemy, damage }) => {
        enemy.heal(damage);
      },
    },
  },
};

export default characters;
