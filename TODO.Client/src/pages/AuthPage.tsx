import { Button, Input, Link } from "@nextui-org/react";
import { AppClient } from "../api/AppClient";
import { useEffect, useState } from "react";
import { ApiError } from "../api";
import { useUserStore } from "../store/UserStore";
import _default from "zustand/vanilla";

const AuthPage = () => {
    const [userName,setUserName] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [userError,setUserError] = useState<string>();
    const [passwordError,setPasswordError] = useState<string>();
    const [isLoading,setIsLoading] = useState<bool>();
    const addAuthData = useUserStore(store => store.addAuthData);
    const addUser = useUserStore(store => store.addUser);
    
    const loginFn = async () => {
        setIsLoading(true);
        setUserError("");
        setPasswordError("");
        let appClient = new AppClient(
            {
                BASE: "https://localhost:44337"
            })
        try{
            let token = await appClient?.user.postApiLogin(
                {
                    username: userName,
                    password: password
                }
            );
            if (token){
                addAuthData(token);
                appClient = new AppClient(
                    {
                        BASE: "https://localhost:44337",
                        TOKEN: token
                    });
                console.log(appClient);
                let userName = (await appClient?.user.getApiUserinfo())?.name ?? "";
                addUser(userName);
            }
        }
        catch(e){
            if (e instanceof ApiError) {
                console.log(e.body);
                if (e.body.errors?.username !== undefined)
                    setUserError("\n".concat(e.body.errors.username));
                else
                    setPasswordError(e.body)
            }
        }
        finally{
            setIsLoading(false);
        }
    }
    
    return ( 
        <div className="flex flex-col items-center m-2 gap-2 w-60">
            <Input value={userName} onChange={(e) => setUserName(e.target.value)} type="email" label="Username" />
            <p className="text-red-600 self-start">{userError}</p>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" />
            <p className="text-red-600 self-start">{passwordError}</p>
            <Link className="self-start" href="#">Don't have account?</Link>
            <Button isLoading={isLoading} onClick={loginFn} variant="shadow" className="w-60" color="primary">Login</Button>
        </div>
    );
}
 
export default AuthPage;