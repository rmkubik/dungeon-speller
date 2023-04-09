import React from "react";

const Name = ({ character, word }) => {
  return (
    <div className="name">
      {character.letters.map((letter, index) => {
        const isActive = word.includes(letter.text);

        return (
          <div
            key={`${index}.${letter}`}
            className={`letter ${isActive ? "active" : ""}`}
          >
            <div className="text">{letter.text}</div>
            <div className="effect">
              {letter.effect
                ? letter.effect.value + symbols[letter.effect.symbol]
                : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Name;
