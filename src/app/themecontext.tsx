"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Theme as RadixTheme } from "@radix-ui/themes";

type Theme = "light" | "dark";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("dark"); // Default theme

    // Effect to update body class for Tailwind dark mode (if needed)
    // and also to potentially sync with system preference or localStorage
    useEffect(() => {
        // For Radix Themes, the <Theme appearance={theme}> handles the visual change.
        // This effect could be used for additional side effects if necessary,
        // e.g., saving preference to localStorage.
        // For now, we'll keep it simple.
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export function AppThemeWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    return <RadixTheme appearance={theme}>{children}</RadixTheme>;
}
