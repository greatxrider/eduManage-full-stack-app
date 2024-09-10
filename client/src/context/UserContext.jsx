import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

/**
 * UserProvider component provides user authentication context to its children.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 * @returns {JSX.Element} The UserProvider component.
 */
export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const cookiePassword = Cookies.get("password");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
    const [password, setPassword] = useState(cookiePassword ? JSON.parse(cookiePassword) : null);

    /**
     * Signs in the user with the provided credentials.
     * 
     * @param {Object} credentials - The user credentials.
     * @param {string} credentials.username - The user's email address.
     * @param {string} credentials.password - The user's password.
     * @returns {Promise<Object|null>} The authenticated user object or null if authentication fails.
     * @throws {Error} Throws an error if the response status is not 200 or 401.
     */
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

    /**
     * Signs out the current user and clears the authentication cookies.
     */
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
