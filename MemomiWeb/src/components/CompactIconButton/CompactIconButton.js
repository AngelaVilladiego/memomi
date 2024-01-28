import React from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import SaveIcon from "@mui/icons-material/Save";

const getIconFromName = (iconName, iconProps) => {
  switch (iconName) {
    case "fullscreen":
      return <ZoomOutMapIcon className={iconProps} />;
    case "save":
      return <SaveIcon className={iconProps} />;

    // all other supported icons
  }
};

const CompactIconButton = ({ iconName, iconProps, onClick }) => {
  const icon = getIconFromName(iconName, iconProps);
  return <button onClick={onClick}>{icon}</button>;
};

export default CompactIconButton;
