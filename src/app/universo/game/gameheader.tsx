//src\app\zone3d\universo3d\main\mainheader.tsx

import { OpConstants } from "@/common/constants";
import { ImageUtil } from "@/lib/graph2d/util/imageutil";
import { XButton } from "@/radix/buttons/xbutton";
import { XText } from "@/radix/data/xtext";
import { TextStyle, ButtonsStyle } from "@/radix/rdxtheme";
import { LIB_ICON } from "@/radix/rdxthicons";

import { Flex, Box } from "@radix-ui/themes";
import { useRef } from "react";

interface CompProps {
    execgetaitexture: () => void;
}
export function UniversoMainHeader({execgetaitexture }: CompProps) {

    const inputFileRef = useRef<HTMLInputElement>(null);

    const loadTextureSystemFile = () => {
        inputFileRef.current?.click();
    };//end
    
    const onFileReceived = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {return;}
        const image:HTMLImageElement 
            = await ImageUtil.getFileHTMLImageElement(e.target.files[0]);   
        //ontextureloaded(image); 
    };//end
    

    const renderInputFile = () => {
        return(
            <Flex width="100%" style={{display: 'none'}}>
                <input ref={inputFileRef} style={{display:'none'}}
                       type="file" multiple={false}
                       accept={"*.png,*.jpg,*.jpeg"}
                       onChange={onFileReceived} />
            </Flex>
        )
    };//end
            
    return(
        <Flex width="100%" direction="row" justify="between"  pt="1" px="2"  pb="2" align="center" >
            <Box >                 
                <XText value="Universo Editor" 
                        style={TextStyle.ST_CONT_HEADER_COLOR} />
            </Box>
            <Flex  width="auto" direction="row" gapX="2" align="center" >                    
                <XButton text={OpConstants.OP_TEXT_IMPORT}
                            icon={LIB_ICON.IMPORT}
                            color={ButtonsStyle.COLOR_IMPORT}
                            onclick={loadTextureSystemFile} />
                <XButton text="Open AI"
                            icon={LIB_ICON.APICALL}
                            color={ButtonsStyle.COLOR_APICALL}
                            onclick={execgetaitexture}  />
            </Flex>
             {renderInputFile()}
        </Flex> 
    )

};//