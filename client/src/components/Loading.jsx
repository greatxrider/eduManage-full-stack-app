import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Loading = () => {
    const { accentColor } = useContext(ThemeContext);

    return (
        <div className="spinner-container">
            <div className="spinner" style={{ borderTopColor: accentColor }}></div>
        </div>
    );
}

export default Loading;
