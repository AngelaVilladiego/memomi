import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CompactIconButton from "../CompactIconButton/CompactIconButton";

const MemoFooter = ({ onPrevious, onNext, hasPrev, hasNext }) => {
  return (
    <div className="flex justify-between items-center text-memoblue-400">
      <button
        onClick={onPrevious}
        disabled={!hasPrev}
        className="flex-inline items-center start gap-2 disabled:pointer-events-none disabled:opacity-40 "
      >
        <KeyboardArrowLeftIcon className="-translate-y-[2px]" />
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="flex-inline items-center start gap-2 disabled:pointer-events-none disabled:opacity-40"
      >
        Next
        <KeyboardArrowRightIcon className="-translate-y-[2px]" />
      </button>
    </div>
  );
};

export default MemoFooter;
