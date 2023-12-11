import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Divider } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useApiStore } from "../store/ApiStore";
import { dispatch } from "use-bus";
import { useNavigate } from "react-router-dom";
import useDarkMode from "use-dark-mode";

const Header = ({isAuth, userName}: {isAuth: boolean, userName: string | null}) => {
    const logout = useApiStore(store => store.logout);
    const navigate = useNavigate();
    const darkmode = useDarkMode(false, 
      {
        classNameDark: "dark",
        classNameLight: "light"
      });

    return ( 
        <Navbar>
            <NavbarBrand>
              <p className="text-xl bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-bold mr-2">
                TODO App
              </p>
            </NavbarBrand>
            <NavbarContent justify="end">
              {isAuth ?
                <>
                  <NavbarItem>
                    <Button onClick={() => dispatch("showCreateTask")} className="text-white bg-gradient-to-r from-blue-500 to-fuchsia-500" variant="shadow">
                      Create task
                    </Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Dropdown showArrow>
                      <DropdownTrigger>
                        <Button startContent={<MdOutlineAccountCircle/>} variant="bordered">
                            <p className="mb-1">{userName}</p>
                          </Button>
                      </DropdownTrigger>
                      <DropdownMenu onAction={(key) =>{
                        if (key === "logout")
                          logout()
                        else if (key === "profile")
                          navigate("todos");
                        else if (key === "theme")
                          darkmode.toggle();
                      }}
                      >
                        <DropdownItem key="profile" color="primary" className="text-primary-500">
                          Profile
                        </DropdownItem>
                        <DropdownItem key="theme" color="default">
                          Switch theme
                        </DropdownItem>
                        <DropdownItem key="logout" className="text-danger" color="danger">
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavbarItem>
                </>
                : 
                <p>
                  You need to be authorized
                </p>
              } 
              {!isAuth && <ThemeSwitcher/>}
            </NavbarContent>
      </Navbar>
    );
}
 
export default Header;