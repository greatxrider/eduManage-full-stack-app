import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const cookiePassword = Cookies.get("password");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
    const [password, setPassword] = useState(cookiePassword ? JSON.parse(cookiePassword) : null);

    const signIn = async (credentials) => {
        const response = await api("/users", "GET", null, credentials);
        if (response.status === 200) {
            const user = await response.json();
            setAuthUser(user);
            setPassword(credentials.password);
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
            Cookies.set("password", JSON.stringify(credentials.password), { expires: 1 });
            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    };

    const signOut = () => {
        setAuthUser(null);
        setPassword(null);
        Cookies.remove("authenticatedUser");
        Cookies.remove("password");
        Cookies.remove("defaultTheme");
    };

    return (
        <UserContext.Provider value={{
            authUser,
            password,
            actions: {
                signIn,
                signOut,
                setPassword
            }
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
