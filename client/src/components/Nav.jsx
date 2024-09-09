import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Nav = () => {
    const { authUser } = useContext(UserContext);

    return (
        <nav>
            {authUser === null ?
                <>
                    <nav>
                        <ul className="header--signedout">
                            <li><Link className="signup" to="/signup">Sign up</Link></li>
                            <li><Link className="signin" to="/signin">Sign in</Link></li>
                        </ul>
                    </nav>
                </>
                :
                <>
                    <nav>
                        <ul className="header--signedin">
                            <li><span>Welcome, {authUser.firstName} {authUser.lastName}!</span></li>
                            <li><Link className="signout" to="/signout">Sign Out</Link></li>
                        </ul>
                    </nav>
                </>
            }
        </nav>
    );
}

export default Nav;
