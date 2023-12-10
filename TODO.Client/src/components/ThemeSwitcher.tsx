import useDarkMode from "use-dark-mode";
import {Button} from "@nextui-org/react";
import { MdDarkMode, MdLightMode  } from "react-icons/md";

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false);

  return (
    <Button variant="light" isIconOnly onClick={darkMode.toggle}>
        {
          darkMode.value ?
          <MdLightMode/> :
          <MdDarkMode/> 
        }
    </Button>
  )
};