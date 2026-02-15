import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/theme";
import { useEffect } from "react";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  //actual change in theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <>
      {/* <h1 className='p-4 bg-pink-600'>Hello World</h1> */}

      <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
        <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
            <div className="w-full max-w-sm mx-auto flex justify-end mb-4"></div>
                {/* themebtn */}
                <ThemeBtn />
            <div className="w-full max-w-sm mx-auto"></div>
                {/* cardbtn */}
                <Card />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
