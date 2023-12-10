import { Input, Link, Button } from "@nextui-org/react";

const RegisterPage = () => {
    return ( 
        <div className="flex flex-col items-center m-2 gap-2 w-60">  
            <Input type="email" label="Username" />
            <Input type="password" label="Password" />
            <Link className="self-start" href="#">Already have account?</Link>
            <Button variant="shadow" className="w-60" color="primary">Register</Button>
        </div>
);
}
 
export default RegisterPage;