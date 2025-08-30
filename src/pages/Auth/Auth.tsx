// IMPROTS
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    // CONSTS
    const navigate = useNavigate();

    return (
        <div>
            <Button onClick={() => navigate("/home")}>Sign In</Button>
        </div>
    );
};

export default Auth;
