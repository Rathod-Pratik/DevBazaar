import * as fiIcons from "react-icons/fi";
import * as hiIcons from "react-icons/hi2";
import * as luIcons from "react-icons/lu";
import * as piIcons from "react-icons/pi";
import * as tbIcons from "react-icons/tb";

const iconLibraries = {
  ...fiIcons,
  ...hiIcons,
  ...luIcons,
  ...piIcons,
  ...tbIcons
};

export const getIconComponent = (iconName) => {
  const IconComponent = iconLibraries[iconName];
  return IconComponent ? <IconComponent /> : <div>Icon not found</div>;
};