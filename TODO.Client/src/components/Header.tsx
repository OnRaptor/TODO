import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MdOutlineAccountCircle } from "react-icons/md";

const Header = ({isAuth, userName}: {isAuth: boolean, userName: string}) => {
    return ( 
        <Navbar>
            <NavbarBrand>
              <p className="font-bold text-inherit">TODO App</p>
            </NavbarBrand>
            <NavbarContent justify="end">
              {isAuth ?
                <>
                  <NavbarItem>
                    <Button color="primary">
                      Create task
                    </Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button startContent={<MdOutlineAccountCircle/>} variant="bordered">
                      <p className="mb-1">{userName}</p>
                    </Button>
                  </NavbarItem>
                </>
                : 
                <p>
                  You need to be authorized
                </p>
              } 
              <ThemeSwitcher/>
            </NavbarContent>
      </Navbar>
    );
}
 
export default Header;