import useDarkMode from "use-dark-mode";
import {Switch} from "@nextui-org/react";
import { MdDarkMode, MdLightMode  } from "react-icons/md";

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false, 
    {
      classNameDark: "dark",
      classNameLight: "light"
    });

  return (
    <Switch
      endContent={<MdDarkMode />}
      isSelected={darkMode.value}
      size="lg"
      startContent={<MdLightMode />}
      onChange={darkMode.toggle}
  />
  )
};