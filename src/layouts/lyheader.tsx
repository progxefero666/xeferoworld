//src\layouts\lyheader.tsx

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Box, Grid, Flex, Text, Button, Link } from "@radix-ui/themes";
import { RadixConf } from "@/radix/rdxconf";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { RdxThContainers } from "@/radix/rdxthcontainers";


/**
 * Page Header Layout
 */
interface LayoutHeaderProps {
    title: string;
    childrencenter?: React.ReactNode;
    childrenright?: React.ReactNode;
}
export function LayoutHeader({ title, childrencenter, childrenright }: LayoutHeaderProps) {

    const pathname = usePathname();
    const [isIndexPage, setIsIndexPage] = useState<boolean>(false);
    
    useEffect(() => {
        if (pathname === "/") { setIsIndexPage(true); }
    }, []);

    const renderHomeButton = () => {
        return (
            <Link href="/" >
                <Button
                    variant={pathname === "/" ? RadixConf.VARIANTS.solid :
                        RadixConf.VARIANTS.soft}
                    color={ButtonsStyle.COLOR_HOME}
                    size={ButtonsStyle.BUTTON_SIZE} >
                    Home
                </Button>
            </Link>
        )
    };//end

    //minHeight="4em"
    return (
        <Grid width="100%" py="2" height="auto"  rows="auto" columns="12% 84% 4%" 
              style={RdxThContainers.HEADER_MAIN} >

            <Flex gridColumn="1" gridRow="1" direction="row" justify="between"
                  px="3" gap="2" style={RdxThContainers.HEADER_LEFT} >
                <Text size="5" >{title}</Text>
                <Box>{!isIndexPage ? renderHomeButton() : null}</Box>                
            </Flex>

            <Flex gridColumn="2" gridRow="1" direction="row" px="3" 
                  style={RdxThContainers.HEADER_CENTER} >
                {childrencenter}
            </Flex>

            <Flex gridColumn="3" gridRow="1" direction="row" px="3" 
                  style={RdxThContainers.HEADER_RIGHT} >
                {childrenright}
            </Flex>

        </Grid>
    )

}//end PrimaryBar
