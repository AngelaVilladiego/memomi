import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TechretaryButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hoverStyles = "";
  const defaultStyles = "hidden";

  const techretaryOptions = ["Tags", "New Memos"];

  const onMouseOver = () => {
    setIsExpanded(true);
  };

  const onMouseOut = () => {
    setIsExpanded(false);
  };

  const onSelect = (option) => {
    console.log(option);
  };

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className="relative self-start"
    >
      <button className="rounded-md border-memoblue-400 border-[1px] inline-flex items-center justify-center px-3 py-1 font-sans text-sm text-memoblue-400 gap-2 bg-memoyellow-50">
        <div>
          <img
            src={require("../../assets/techretary.svg").default}
            alt="techretary icon"
          />
        </div>
        <span className="">Techretary</span>
        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      {isExpanded ? (
        <div className="absolute ps-4">
          <span className="opacity-50 text-xs">Suggest some</span>
          <ul className="text-sm border-memoblue-400 border-[1px] rounded-lg overflow-clip">
            <li
              onClick={() => {
                onSelect(0);
              }}
              className="px-5 py-1 border-b-[1px] border-gray-200 group bg-memoyellow-50 hover:cursor-pointer hover:bg-memoyellow-100"
            >
              {techretaryOptions[0]}
            </li>
            <li
              onClick={() => {
                onSelect(0);
              }}
              className="px-5 py-1 hover:cursor-pointer bg-memoyellow-50 hover:bg-memoyellow-100"
            >
              {techretaryOptions[1]}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default TechretaryButton;
