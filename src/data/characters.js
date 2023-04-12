const characters = {
  knight: {
    hp: 10,
    memory: 10,
    minWordLength: 4,
    letters: [
      {
        text: "k",
        effect: {
          symbol: "lock",
          value: 1,
        },
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
};

export default characters;
