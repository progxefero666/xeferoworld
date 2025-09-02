//src\radix\data\infonotdata.tsx

import { Box, Flex, Text } from "@radix-ui/themes";
import { RdxThContainers } from "../rdxthcontainers";


interface CompProps {
    message: string;
}
export const InfoNotdata = ({ message }: CompProps) => {

    return (
        <Flex width="100%" justify="center" align="center"
                px="3" py="2" style={RdxThContainers.BORDER_SIMPLE} >
            <Text size="2">{message}</Text>
        </Flex>
    );

}//end comp