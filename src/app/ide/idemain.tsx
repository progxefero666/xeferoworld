//src\app\index\maincontent.tsx

import React, { useEffect, useState } from "react";
import { Flex} from "@radix-ui/themes";


import { IdeConfig } from "@/app/ide/xethreeidecfg";
import { ThreeApp } from "@/app/ide/application/threeapp";

interface CompProps {
    value?:string;
}
export function XfThreeIdeMain({}: CompProps) {

    const [ready, setReady] = useState<boolean>(false);
    
    useEffect(() => {
        if(ready) {return;} 
        setReady(true);
    }, []);

    const loadAssetGltfObject = (srcpath:string) => {
    
    };//end

    return (
        <Flex width="100%" direction="column" 
              style={IdeConfig.DESKTOP_CONTENT}>

            <ThreeApp />

        </Flex>
    );

}//end PrimaryBar

/*
    useEffect(() => {
        if(ready) {return;} 
        const init = async () => {              
            setReady(true);
        };
        init();
    }, []);
*/