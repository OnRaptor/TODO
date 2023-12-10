import { Button, Input, Link } from "@nextui-org/react";

const AuthPage = () => {
    return ( 
        <div className="flex flex-col items-center m-2 gap-2 w-60">
            
            <Input type="email" label="Username" />
            <Input type="password" label="Password" />
            <Link className="self-start" href="#">Don't have account?</Link>
            <Button variant="shadow" className="w-60" color="primary">Login</Button>
        </div>
    );
}
 
export default AuthPage;