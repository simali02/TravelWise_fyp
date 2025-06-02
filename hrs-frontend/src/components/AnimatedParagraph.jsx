import React from "react";
import "../assets/css/AnimatedParagraph.css";

const AnimatedParagraph = ({ text }) => {
  const processText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("-")) {
        return (
          <li key={index} className="bullet-point">
            {line.substring(1).trim()}
          </li>
        );
      }
      const splitText = line.split("*");
      if (splitText?.length > 1) {
        return splitText.map((part, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <b>{splitText[idx - 1]}</b>}
            {part}
          </React.Fragment>
        ));
      }
      return <span key={index}>{line}</span>;
    });
  };

  return (
    <div className="animated-paragraph">
      {text.map((e, i) => (
        <div className="sep-explanation" key={i}>
          <h4>{(i + 1) + ". " + e.title}</h4>
          <ul className="description-list">
            {processText(e.description)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AnimatedParagraph;
