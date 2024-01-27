import React from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const getIconFromName = (iconName, iconProps) => {
  switch (iconName) {
    case "fullscreen":
      return <ZoomOutMapIcon className={iconProps} />;

    // all other supported icons
  }
};

const CompactIconButton = ({ iconName, iconProps, onClick }) => {
  const icon = getIconFromName(iconName, iconProps);
  return <button onClick={onClick}>{icon}</button>;
};

export default CompactIconButton;
