//src\app\index\maincontent.tsx

import React, { useEffect, useState } from "react";
import { Flex} from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";

interface CompProps {
    value?:string;
}
export function PageHeader({}: CompProps) {

    return (
        <Flex width="100%" direction="column" gapY="2" 
              style={RdxThContainers.MAIN_CONTENT} >
            Zone 3d Modules
        </Flex>
    );

}//end PrimaryBar
