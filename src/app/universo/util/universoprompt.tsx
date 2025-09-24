//src\app\zone3d\universo3d\main\mainheader.tsx

import { useRef } from "react";
import { Flex, Box } from "@radix-ui/themes";
import { XInputTextArea } from "@/radix/input/inptextarea";

import { XButton } from "@/radix/buttons/xbutton";
import { XText } from "@/radix/data/xtext";
import { TextStyle, ButtonsStyle } from "@/radix/rdxtheme";


interface UniversoPromptProps {
    test?: () => void;
}
export function UniversoPrompt({ }: UniversoPromptProps) {

    const textRef = useRef<HTMLInputElement>(null);

    const ontest = () => {
        
    };//end

            
    return(
        <Flex width="100%" direction="column" pt="1" px="2" pb="2" >
            <XInputTextArea ref={textRef}
                            height="200px" autofocus={true} />
        </Flex> 
    )

};//end component