//src/universo3d/spaceship/controls/flyrollcontrol.tsx

import React, { useRef, useState, useEffect } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { CvPainter } from "@/lib/graph2d/painters/cvpaint";
import { Point2d, TDimension } from "@/common/types";
import { ColorItem } from "@/lib/graph2d/model/coloritem";
import { XMath2dUtil } from "@/math2d/functions/xmath2dutil";
import Background from "three/src/renderers/common/Background.js";
import { XMath2d } from "@/math2d/xmath2d";
import { XButton } from "../buttons/xbutton";
import { LIB_ICON } from "../rdxthicons";
import { OpConstants } from "@/common/constants";
import { ButtonsStyle } from "../rdxtheme";


const MAIN_CONT_STYLE = {
    backgroundColor: "#ffffffff",
};

//XCGradCfg.NEWITEM_COLOR
class XCGradCfg {
    static BODY_HEIGHT: number = 40;
    static CFS_RADIUS: number = 11;
    static CFS_BORDER_COLOR:any = "#181818";
    
    static CBAR_HEIGHT: number = 5;
    static CBAR_FILL_COLOR:any = "#929191ff";
    static CBAR_BORDER_COLOR:any = "#393939";

    static NEWITEM_COLOR:any = "#ffffff";

};

const generateItems = (initcoll:ColorItem[]): ColorItem[]  => {
    const colorsItems:ColorItem[] = [];

    for(let idx=0; idx<initcoll.length; idx++){
        let blocked = false;
        if(idx==0 || idx==(initcoll.length-1)) blocked = true;
        const item:ColorItem = new ColorItem
            (initcoll[idx].color,initcoll[idx].valperc,blocked);
        item.radius = XCGradCfg.CFS_RADIUS;    
        colorsItems.push(item);            
    }
    return colorsItems;
};//end

const foundItemIndex = (cvDim:TDimension,listitems:ColorItem[],point:Point2d) => {
    let foundIndex = -1;
    for(let idx=0; idx<listitems.length; idx++){   
        if(listitems[idx].blocked) {continue;};
        const itemPosition = listitems[idx].getCanvasPosition(cvDim);
        const distance = XMath2d.getPointsDistance(point,itemPosition);
        if(distance<=listitems[idx].radius){
            foundIndex = idx;
            break;                
        }
    }    
    return foundIndex;
};//end

interface XColorGradientProps {
    width: number;
    initcoll:ColorItem[];
};

export function XColorGradient({initcoll,width}: XColorGradientProps) {

    const cbarDim:TDimension = {
        width: width,
        height: XCGradCfg.CBAR_HEIGHT
    };
    const cvDim:TDimension = {width:width,height:XCGradCfg.BODY_HEIGHT};
    const cvCenterY = Math.floor(cvDim.height/2);
    const cssWidth = cvDim.width+'px';
    const cssHeight = cvDim.height+'px';
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [ready, setReady] = useState<boolean>(false);
    const cvPainter = useRef<CvPainter | null>(null);
    const [items, setItems] = useState<ColorItem[]>([]);

    const [selItemIndex, setSelItemIndex] = useState<number>(-1);
    const [deleteDisabled, setDeleteDisabled] = useState<boolean>(true);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Evento para presionar el click

    
    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setDeleteDisabled(true);
        if (!isDragging || selItemIndex<0) return;        
        const rect        = event.currentTarget.getBoundingClientRect();
        const coordX      = event.clientX - rect.left;       
        const percent     = Math.floor(XMath2dUtil.getPercent100(cvDim.width,coordX));
        const prevPercent = items[selItemIndex-1].valperc+1;
        const nextPercent = items[selItemIndex+1].valperc-1;
        //check > previous and < next
        if(!(percent>prevPercent)||!(percent<nextPercent)){return;};  
        //update selected item
        const genItems:ColorItem[] = [...items];
        genItems[selItemIndex].valperc = percent;        
        setItems(genItems);              
    };//end

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false); 
        document.body.style.cursor = 'default';
        setSelItemIndex(-1);        
        renderCanvas(items);
    };//end

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setDeleteDisabled(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const cvPosition:Point2d = {
            x:event.clientX - rect.left,
            y:event.clientY - rect.top};
        event.preventDefault();          
        
        const foundIndex = foundItemIndex(cvDim,items,cvPosition);
        if(foundIndex>0){
            setSelItemIndex(foundIndex);
            setIsDragging(true);
            document.body.style.cursor = 'grabbing';
        };
    };//end

    const handleMouseClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setDeleteDisabled(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const cvPosition:Point2d = {
            x:event.clientX - rect.left,
            y:event.clientY - rect.top};
        event.preventDefault();          
        
        const foundIndex = foundItemIndex(cvDim,items,cvPosition);;
        if(foundIndex>0){
            setSelItemIndex(foundIndex);
            setDeleteDisabled(false);
        };        
    };//end

    const handleMouseDoubleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setDeleteDisabled(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const cvPosition:Point2d = {
            x:event.clientX - rect.left,
            y:event.clientY - rect.top};
        event.preventDefault();          
        
        const foundIndex = foundItemIndex(cvDim,items,cvPosition);
        if(foundIndex>0){
            setSelItemIndex(foundIndex);
            //hiddenRef.current?.click();
        };           
    };//end

    const onItemColorChange = (newColor: any) => { 
    };//end

    useEffect(() => {
        if(ready) {return};

        const canvas = canvasRef.current;
        if (!canvas) return;
        if (!canvas.getContext("2d")) return;        
        cvPainter.current = new CvPainter
            (canvas.getContext("2d")!,cvDim,"#ffffff");
        const genItems:ColorItem[] = generateItems(initcoll); 
      
        setItems(genItems);
        setReady(true);
        renderCanvas(genItems);
         
    }, []);
    
    const renderCanvas = (items:ColorItem[]) => {
        renderCentralBar();
        if(items.length==0) {return;}

        for(let idx=0; idx<items.length; idx++){   
            renderElement(items[idx]);
        }
    };//end
    
    const renderElement = (item:ColorItem) => {         
        const position:Point2d = item.getCanvasPosition(cvDim);
        cvPainter.current!
            .fillCf(position,item.radius,item.color,XCGradCfg.CFS_BORDER_COLOR);            
    };//end

    const renderCentralBar = () => {
        cvPainter.current!.fillback();        
        const point: Point2d ={
            x:0,
            y:cvCenterY-(XCGradCfg.CBAR_HEIGHT/2)};
        cvPainter.current!.fillRect
            (point,cbarDim,XCGradCfg.CBAR_FILL_COLOR,XCGradCfg.CBAR_BORDER_COLOR);
    };//end

    const execOperation=(operation:string,item:string|null) => {
        console.log();
        let genItems:ColorItem[]=[];

        if(operation===OpConstants.OP_ADD){
            const applyValPerc:number= 3;
            const newItem:ColorItem = new ColorItem
                    (XCGradCfg.NEWITEM_COLOR,applyValPerc,false); 
            genItems= [];
            genItems.push(items[0]);
            genItems.push(newItem);
            for(let idx=1; idx<items.length; idx++){                
                genItems.push(items[idx]);              
            }
        }
        else if(operation===OpConstants.OP_DELETE){
            genItems= [];
            for(let idx=0; idx<items.length; idx++){
                if(idx!==selItemIndex){
                    genItems.push(items[idx]);
                }
            }
        }
        else if(operation===OpConstants.OP_RESET){
            genItems = generateItems(initcoll); 
        }
        setItems(genItems);
        renderCanvas(genItems);
    };//end

    // jsx
    //..............................................................................
    //onMouseDown={onMouseDownHandle}

    return (
        <Flex width="100%" height="auto" direction="column" justify="center" 
              gapY="2" >

            <Box width="100%" style={MAIN_CONT_STYLE} >
                <canvas ref={canvasRef}
                        width={cssWidth}
                        height={cssHeight}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onClick={handleMouseClick}
                        onDoubleClick={handleMouseDoubleClick} />
            </Box>

            <Flex width="100%" height="auto" direction="row" 
                  justify="center" gapX="2" >

                    <XButton text="add" 
                             icon={LIB_ICON.ADD}
                             exeOperation={execOperation}
                             operation={OpConstants.OP_ADD}
                             color={ButtonsStyle.COLOR_ADD} />

                    <XButton text="delete" 
                             icon={LIB_ICON.DELETE}
                             exeOperation={execOperation}
                             operation={OpConstants.OP_DELETE}
                             disabled={deleteDisabled}
                             color={ButtonsStyle.COLOR_DELETE} />

                    <XButton text="reset" 
                             icon={LIB_ICON.CLEAR}
                             exeOperation={execOperation}
                             operation={OpConstants.OP_RESET}
                             color={ButtonsStyle.COLOR_CLEAR} />
            </Flex>

        </Flex>
    );
}//end