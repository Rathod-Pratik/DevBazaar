import * as fiIcons from "react-icons/fi"; // Feather
import * as faIcons from "react-icons/fa"; // Font Awesome
import * as fa6Icons from "react-icons/fa6"; // Font Awesome 6
import * as hiIcons from "react-icons/hi"; // Heroicons 1
import * as hi2Icons from "react-icons/hi2"; // Heroicons 2
import * as mdIcons from "react-icons/md"; // Material Design
import * as io5Icons from "react-icons/io5"; // Ionicons 5
import * as biIcons from "react-icons/bi"; // Boxicons
import * as bsIcons from "react-icons/bs"; // Bootstrap
import * as riIcons from "react-icons/ri"; // Remix
import * as luIcons from "react-icons/lu"; // Lucide
import * as piIcons from "react-icons/pi"; // Phosphor
import * as tbIcons from "react-icons/tb"; // Tabler
import * as giIcons from "react-icons/gi"; // Game
import * as siIcons from "react-icons/si"; // Simple
import * as cgIcons from "react-icons/cg"; // CSS.GG
import * as diIcons from "react-icons/di"; // Devicon
import * as aiIcons from "react-icons/ai"; // Ant Design
import * as fcIcons from "react-icons/fc"; // Flat Color

const iconLibraries = {
  ...fiIcons,
  ...faIcons,
  ...fa6Icons,
  ...hiIcons,
  ...hi2Icons,
  ...mdIcons,
  ...io5Icons,
  ...biIcons,
  ...bsIcons,
  ...riIcons,
  ...luIcons,
  ...piIcons,
  ...tbIcons,
  ...giIcons,
  ...siIcons,
  ...cgIcons,
  ...diIcons,
  ...aiIcons,
  ...fcIcons
};

export const getIconComponent = (iconName, props = {}) => {
  const IconComponent = iconLibraries[iconName];
  
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in libraries`);
    return <div className="text-red-500">□</div>;
  }

  return <IconComponent {...props} />;
};
