import React from "react";
import TextButton from "../TextButton/TextButton";
import CompactIconButton from "../CompactIconButton/CompactIconButton";

const MemoHeader = ({ onEdit, onDelete, iconName, onIconClick }) => {
  return (
    <div className="flex justify-between items-center text-memoblue-400">
      <span className="space-x-8">
        <TextButton onClickButton={onEdit} textContent="Edit" />
        <TextButton onClickButton={onDelete} textContent="Delete" />
      </span>
      <CompactIconButton
        onClick={onIconClick}
        iconName={iconName}
        iconProps={"size-6"}
      />
    </div>
  );
};

export default MemoHeader;
