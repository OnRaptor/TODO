import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = ({isAuth}: {isAuth: boolean}) => {
    return ( 
        <Navbar>
            <NavbarBrand>
              <p className="font-bold text-inherit">TODO App</p>
            </NavbarBrand>
            <NavbarContent justify="end">
              {isAuth ?
                <NavbarItem>
                  <Button color="primary">
                    Create task
                  </Button>
                </NavbarItem>
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