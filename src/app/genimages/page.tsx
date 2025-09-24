//src\app\page.tsx
'use client';

import { useEffect, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { TDimension } from "@/common/types";
import { LayoutPageTwoColumns } from "@/layouts/lypagetwocolumns";
import { GoogleImagesMain } from "@/app/genimages/gimagesmain";
import { PainterBitmap } from "@/app/genimages/painterbitmap";


const canvasDimension:TDimension = {width: 500, height: 500};

/**
 * Page Textures
 */
export default function PageGoogleImages() {

    const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
    const [monitorKey, setMonitorKey] = useState<string>(new Date().toISOString());


    const onimageloaded=(bitmap: ImageBitmap) => {
        setMonitorKey(new Date().toISOString());
        setBitmap(bitmap);
    };//end 

    const headerContent = () => {
        return(
            <Box>Generator Textures.</Box>
        );
    };//end

    return (
        <LayoutPageTwoColumns  key={monitorKey} headertitle = {"Image Generator"} 
                    headercontent = {headerContent()}
                    mainleft      = {<GoogleImagesMain onimageloaded={onimageloaded} />}
                    mainright     = {<PainterBitmap canvasdim={canvasDimension} bitmap={bitmap} />}
                    options       = {[]}
                    actoption     = {""}
                    onselection   = {() => {}} />
    );

}//end page
