import DarkMode from "./themes/DarkMode";
import AccentColor from "./themes/AccentColor";
import FontSize from "./themes/FontSize";
import '../styles/settingsStyles.css';
import '../styles/new.css';

const Settings = () => {
  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>Preferences</h1>
        <DarkMode />
        <AccentColor />
        <FontSize />
      </div>
    </div>
  );
}

export default Settings;
