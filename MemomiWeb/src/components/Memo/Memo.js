import React, { useState } from "react";
import MemoHeader from "./MemoHeader";
import "./Memo.css";
import DropdownButton from "../DropdownButton/DropdownButton";

const Memo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = () => {
    console.log("saving");
  };

  return (
    <div className="myMemo mx-auto rounded-lg border-memoblue-400 border-2 h-full grow aspect-[5/7] font-sans py-2 px-6">
      <MemoHeader
        onEdit={() => console.log("clickedEdit")}
        onDelete={() => console.log("clickedDelete")}
        iconName="save"
        onIconClick={handleSave}
      />
      <div className="pt-4 w-5/12 ms-auto self-end border-b-2 border-memoblue-400 font-sans font-semibold text-xs text-memoblue-400">
        <span>Date</span>
        <span className="font-handwriting text-xl align-baseline text-memoneutral-800 ps-8">
          Jan 27, 2023
        </span>
      </div>
      <div className="text-memoblue-400 font-black font-sans text-2xl w-6/12">
        <p className="text-wrap line-clamp-2">Morning Team Meeting</p>
      </div>
      <div className="py-4 text-xs">"tags go here"</div>
      <DropdownButton />
    </div>
  );
};

export default Memo;
