import React from "react";

const TextButton = ({ onClickButton, textContent }) => {
  return (
    <button className="font-sans font-semibold text-xs" onClick={onClickButton}>
      {textContent}
    </button>
  );
};

export default TextButton;
