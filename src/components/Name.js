import React from "react";
import symbols from "../data/symbols";

const Name = ({ letters, word }) => {
  return (
    <div className="name">
      {letters.map((letter, index) => {
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
