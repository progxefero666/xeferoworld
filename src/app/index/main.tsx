//src\app\index\maincontent.tsx

import React, { useEffect, useState } from "react";
import { Flex} from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";
import { PageMonitor } from "./monitor";

interface CompProps {
    value?:string;
}
export function PageMain({}: CompProps) {
    const [ready, setReady] = useState<boolean>(false);
    
    useEffect(() => {
        if(ready) {return;} 
        const init = async () => {              
            setReady(true);
        };
        init();
    }, []);

    return (
        <Flex width="100%" direction="column" justify="start"  
              style={RdxThContainers.MONITOR_CONTENT}>
            <PageMonitor />
        </Flex>
    );

}//end PrimaryBar
