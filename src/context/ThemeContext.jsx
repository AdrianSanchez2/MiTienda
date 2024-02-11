/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light");

    const toogleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const themeContextValues = {
        theme,
        toogleTheme,
    };
    return (
        <ThemeContext.Provider value={themeContextValues}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };