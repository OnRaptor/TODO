import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../api";
import { useUserStore } from "../store/UserStore";
import { useApiStore } from "../store/ApiStore";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
    const [userName,setUserName] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [userError,setUserError] = useState<string>();
    const [passwordError,setPasswordError] = useState<string>();
    const [isLoading,setIsLoading] = useState<boolean>();
    const addAuthData = useApiStore(store => store.addAuthData);
    const apiClient = useApiStore(store => store.client);
    const addUser = useUserStore(store => store.addUser);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const loginFn = async () => {
        setIsLoading(true);
        setUserError("");
        setPasswordError("");
        try{
            const token = await apiClient?.user.postApiRegister(
                {
                    user: {name: userName},
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
            if (e instanceof ApiError) {
                if (e.body.errors["user.Name"] !== undefined)
                    setUserError("\n".concat(e.body.errors["user.Name"]));
                if (e.body.errors?.password !== undefined)
                    setPasswordError("\n".concat(e.body.errors.password));
            }
        }
        finally{
            setIsLoading(false);
        }
    }
    
    return ( 
        <div className="flex flex-col items-center m-2 gap-2 w-60">  
            <Input placeholder={t('UserNameHint')} variant="bordered" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" label={t("UsernameLabel")} />
            <p className="text-red-600 self-start">{userError}</p>
            <Input placeholder={t("PasswordHint")} variant="bordered" value={password} onChange={(e) => setPassword(e.target.value)} type="password" label={t("PasswordLabel")} />
            <p className="text-red-600 self-start">{passwordError}</p>
            <Link className="self-start" to="/login">{t('TryLoginLabel')}</Link>
            <Button isLoading={isLoading} onClick={loginFn} variant="shadow" className="w-60" color="primary">{t('RegisterLabel')}</Button>
        </div>
);
}
 
export default RegisterPage;