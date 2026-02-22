import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="toggle-btn" onClick={toggleTheme}>
      Current Theme: {theme.toUpperCase()} (Click to Toggle)
    </button>
  );
}

export default ThemeToggle;