import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from '../context/ThemeContext';

import Nav from '../components/Nav';

const Header = () => {
    const { accentColor } = useContext(ThemeContext);

    return (
        <header style={{ background: accentColor }}>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a
                    href="/">Courses</a></h1>
                <Nav />
            </div>
        </header>
    )
}

export default Header;
