import React from "react";
import TextButton from "../TextButton/TextButton";
import CompactIconButton from "../CompactIconButton/CompactIconButton";

const MemoHeader = ({
  onEdit,
  onDelete,
  iconName,
  onIconClick,
  canSave,
  isEditable,
}) => {
  return (
    <div className="flex justify-between items-center text-memoblue-400">
      <span className="space-x-8">
        <TextButton
          disabled={isEditable}
          className={isEditable ? "opacity-50" : ""}
          onClickButton={onEdit}
          textContent="Edit"
        />
        <TextButton onClickButton={onDelete} textContent="Delete" />
      </span>
      <CompactIconButton
        disabled={!canSave}
        onClick={onIconClick}
        iconName={iconName}
        iconProps={"size-6"}
      />
    </div>
  );
};

export default MemoHeader;
