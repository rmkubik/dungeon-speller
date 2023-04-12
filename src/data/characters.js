const characters = {
  knight: {
    hp: 10,
    memory: 10,
    minWordLength: 4,
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
    hp: 4,
    intents: {
      claw: {
        letterCount: 4,
        effect: {
          value: 2,
          symbol: "sword",
        },
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
      web: {
        letterCount: 2,
        effect: {
          value: 1,
          symbol: "lock",
        },
      },
      bite: {
        letterCount: 3,
        effect: {
          value: 1,
          symbol: "sword",
        },
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
      claw: {
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
};

export default characters;
