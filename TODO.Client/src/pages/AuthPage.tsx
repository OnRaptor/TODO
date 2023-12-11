import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { ApiError } from "../api";
import { useUserStore } from "../store/UserStore";
import { Link, useNavigate } from "react-router-dom";
import { useApiStore } from "../store/ApiStore";

const AuthPage = () => {
    const [userName,setUserName] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [userError,setUserError] = useState<string>();
    const [passwordError,setPasswordError] = useState<string>();
    const [isLoading,setIsLoading] = useState<boolean>();
    const addAuthData = useApiStore(store => store.addAuthData);
    const apiClient = useApiStore(store => store.client);
    const addUser = useUserStore(store => store.addUser);
    const navigate = useNavigate();
    
    const loginFn = async () => {
        console.log(apiClient);
        setIsLoading(true);
        setUserError("");
        setPasswordError("");
        try{
            const token = await apiClient?.user.postApiLogin(
                {
                    username: userName,
                    password: password
                }
            );
            if (token){
                addAuthData(token);
                addUser(userName ?? "");
                navigate("/todos");
            }
        }
        catch(e){
            console.log(e);
            if (e instanceof ApiError) {
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
            <Input placeholder="Enter your email" variant="bordered" value={userName} onChange={(e) => setUserName(e.target.value)} type="email" label="Username" />
            <p className="text-red-600 self-start">{userError}</p>
            <Input placeholder="Enter your password" variant="bordered" value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" />
            <p className="text-red-600 self-start">{passwordError}</p>
            <Link className="self-start" to="/reg">Don't have account?</Link>
            <Button isLoading={isLoading} onClick={loginFn} variant="shadow" className="w-60" color="primary">Login</Button>
        </div>
    );
}
 
export default AuthPage;