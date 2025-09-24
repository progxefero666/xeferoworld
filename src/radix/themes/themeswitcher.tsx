"use client";

import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/app/themecontext";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Flex direction="column" gap="2" align="center">
            <Text size="2" weight="bold" mb="1">
                Theme
            </Text>
            <Button onClick={toggleTheme} variant="soft" size="2">
                {theme === "light" ? (
                    <>
                        <SunIcon width="16" height="16" /> Light Mode
                    </>
                ) : (
                    <>
                        <MoonIcon width="16" height="16" /> Dark Mode
                    </>
                )}
            </Button>
        </Flex>
    );
}
