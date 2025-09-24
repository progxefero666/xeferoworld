//src\app\zone3d\terrains\terraineditor.tsx

import { useRef, useState } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { RdxThContainers } from "@/radix/rdxthcontainers";

import { generateImage } from "@/lib/openai/generateimage";
import { ImageUtil } from "@/lib/graph2d/util/imageutil";
import { TX_PLANET, TX_SHIP, TX_TABLET, TX_UNIVERSE } from "@/app/genimages/txprompts";
import { LIB_ICON } from "@/radix/rdxthicons";
import { XButton } from "@/radix/buttons/xbutton";
import { ProgresDialog } from "@/radix/progress/progdialog";
import { OpConstants } from "@/common/constants";
import { ButtonsStyle } from "@/radix/rdxtheme";
import { ImageDataFunc } from "@/lib/graph2d/functions/imagedatafunc";
import { DocFormats } from "@/common/docformats";

/**
 * Terrain 3D Editor
 */
interface GoogleImagesMainProps {
    onimageloaded: (bitmap: ImageBitmap) => void;
};
export function GoogleImagesMain({onimageloaded}: GoogleImagesMainProps) {

    const [imageUrl, setImageUrl] = useState<string|null>(null);

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState<boolean>(false);

    const loadTextureSystemFile = () => {
        inputFileRef.current?.click();
    };//end
    
    const onFileReceived = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {return;}
        const image:HTMLImageElement 
            = await ImageUtil.getFileHTMLImageElement(e.target.files[0]);   
        //ontextureloaded(image); 
    };//end
    
    const exportTextureImage = async () => {
 
        const img:HTMLImageElement = await ImageUtil.getCvImage(imageUrl!);
        alert('export');

        const imgUrl:string = await ImageUtil.getHtmImageDataURL(
            img,
            DocFormats.FORMAT_JPG.key,
            {width:img.width, height:img.height});

        ImageDataFunc.exportCanvasImage("texture.jpg",imgUrl);

        //ImageUtil.exportTexture(imageData, "jpg", "texture");
    };//end

    const prompt:string = 
`4 vistas de nave espacial futurista de combate tipo starwars:
1.-Vista MUY ALEJADA lateral.
2.-Vista  MUY ALEJADA superior.
3.-Vista  MUY ALEJADA frontal.
4.-Pespectiva  MUY ALEJADA  camara alejada.
todas las vistas deben encuadrar bien TODA LA NAVE,
SE TIENE Q VER TODA LA NAVE COMPLETA, NO UN TROZO DE ELLA.
Importante q la nave no se salga del cuadro de la imagen. 
Con detalles ilumidados sutilmente a lo largo de toda la nave.
Colores variados. y tono metalicos claros. Mucha luminosidad
y detalles en la superficie.`;

    const generateTexture = async () => {
        try {
            setProcessing(true);
            const imageUrl: string = await generateImage(prompt);
            const imageBitmap: ImageBitmap = await ImageUtil.getImageBitmap(imageUrl);

            //const dataURL = canvas.toDataURL('image/jpeg', 0.5);


            setImageUrl(imageUrl);
            setProcessing(false);
            onimageloaded(imageBitmap);                 
        } 
        catch (error) {
            console.error('Error generating texture:', error);
            setProcessing(false);
        }
    };//end



    const renderInputFile = () => {
        return(
            <Flex width="100%" style={{display: 'none'}}>
                <input ref={inputFileRef} style={{display:'none'}}
                       type="file" multiple={false}
                       accept={".jpg,.jpeg,.png"}
                       onChange={onFileReceived} />
            </Flex>
        )
    };//end
        
    return (
        <Flex width="100%" direction="column" px="2" pt="1" pb="2" 
              style={RdxThContainers.MAIN_CONTENT} >
             {renderInputFile()}
            <Flex width="100%" direction="row" justify="between" align="center" >
                <Text size="3" weight="bold" color="gray">
                    generation texture
                </Text>
                <Flex  width="100%" direction="row" gapX="2">
                    <Flex direction="row" pt="1" gapX="2" >
                        <XButton text={OpConstants.OP_TEXT_IMPORT}
                                icon={LIB_ICON.IMPORT}
                                color={ButtonsStyle.COLOR_IMPORT}
                                onclick={loadTextureSystemFile} />
                         
                        <XButton text={OpConstants.OP_TEXT_EXPORT}
                                icon={LIB_ICON.EXPORT}
                                color={ButtonsStyle.COLOR_EXPORT}
                                onclick={exportTextureImage} /> 
                       
                                                       
                    </Flex>                 
                    <ProgresDialog processing={processing}
                                buttontext="Open AI"
                                icon={LIB_ICON.APICALL}
                                title="Generating Texture"
                                data="Generating from api service.Please wait..."
                                execute={generateTexture} />
                </Flex>           
            </Flex>

        </Flex>
    )

};//end component


    /*
    const [ready, setReady] = useState<boolean>(false);
    useEffect(() => {
        if(ready) {return;}        
        setReady(true);
    }, []);
    "A beautiful landscape with mountains and a river"
    */