//src\app\terrains\worldplane\worldplane.tsx


import { useEffect, useState } from "react";
import { Flex,Box } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";


interface CompProps {
    value?: string;
};
export function WorldPlane({}: CompProps) {

    //const [monitorKey, setMonitorKey] = useState<string>(new Date().getTime().toString());
    //setMonitorKey(new Date().getTime().toString());

    const onTest = () => {

    };
    
    return(
        <Flex width="100%" direction="row" style={RdxThContainers.MAIN_CONTENT} >

            <Flex width="40%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.PRIMARY_CONTENT}>     

            </Flex>

            <Flex width="60%"  direction="column" px="2" py="1" mb="2" 
                 style={RdxThContainers.SECONDARY_CONTENT}>
                
            </Flex>

        </Flex>
    )

}//end component