import React from "react";

const TextButton = ({ onClickButton, textContent, className, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`font-sans font-semibold text-xs ${className}`}
      onClick={onClickButton}
    >
      {textContent}
    </button>
  );
};

export default TextButton;
