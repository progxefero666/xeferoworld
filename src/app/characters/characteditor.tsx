//src\app\zone3d\head\headeditor.tsx

import { useState, useEffect} from "react";
import { Box, Flex, Text, Button, } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";

interface CompProps {
    value?: string;
};
export function CharacterEditor({}: CompProps) {

    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if(ready) {return;}
      
        setReady(true);
    }, []);

    const testA = () => {};//end

    const renderHeader = () => {
        return (
            <Flex width="100%" direction="row" justify="between"  pb="2" align="center" >
                <Box px="2">
                    <Text size="3" weight="bold" color="gray">
                        Character Editor
                    </Text>
                </Box>
                <Box pt="1" px="1">
                    <Button onClick={testA} color="green">
                        Generate
                    </Button>
                </Box>
            </Flex>         
        );
    };//end


    return (
        <Flex width="100%" direction="column" px="2" py="1" gapY="2"  
              style={RdxThContainers.HEADER_MAIN} >

            {renderHeader()}
            <Box>

            </Box>
 
        </Flex>
    )

};//end component