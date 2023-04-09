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
    intent: {
      letterCount: 4,
      effect: {
        value: 2,
        symbol: "sword",
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
};

export default characters;
