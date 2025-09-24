//src\radix\card\bigcard.tsx

import React from "react";
import { Box, Card, Flex,Text, Heading, Separator } from "@radix-ui/themes";

interface CardExampleProps {
    name?: string;
    title: string;    
}
export default function CardExample({name,title }: CardExampleProps) {
        
    const onSelection = () => {
        alert("selection: " + name);

    }

    return (
        <Card mb="5" variant="surface" size="2">
            <Flex direction="column" gap="2">
                <Heading size="2" mb="2" trim="start">
                    {title}
                </Heading>
            </Flex>
            <Box p="3">

                <Separator size="4" mb="3" />
             
            </Box>
        </Card>
    );

}//end component
