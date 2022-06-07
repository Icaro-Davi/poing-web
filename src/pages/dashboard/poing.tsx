import { NextPage } from "next";
import { useAuth } from "../../context/Auth";

const PoingSettings: NextPage = props => {
    const auth = useAuth();
    return (
        <div>
            Private Page PoingSettings
            <button onClick={auth?.isAuthenticated ? auth.logOut : auth?.logIn}>{auth?.isAuthenticated ? 'Logout' : 'Login'}</button>
        </div>
    )
}

export default PoingSettings;