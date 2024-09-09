import { useContext } from "react";
import { Link } from "react-router-dom";

import Nav from '../components/Nav';

const Header = () => {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a
                    href="/">Courses</a></h1>
                <Nav />
                {/* <nav>
                    <ul className="header--signedout">
                        <li><a href="/signup">Sign Up</a></li>
                        <li><a href="/signin">Sign In</a></li>
                    </ul>
                </nav> */}
            </div>
        </header>
    )
}

export default Header;
