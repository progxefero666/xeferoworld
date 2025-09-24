//src\app\terrains3d\genmodel\components\editorgradient.tsx

import { useEffect, useRef, useState } from "react";
import { NumberParameter } from "@/common/numberparam";
import { SliderNumber } from "@/radix/sliders/slidernumber";
import { CircunfGradient } from "@/terrains/gradients/cfgradient";
import { Flex } from "@radix-ui/themes";
import { Terrains3dConfig } from "../terrains3dcfg";




const paramIntensity: NumberParameter = Terrains3dConfig.GRADRANGE_INTENSITY;
const paramRadius: NumberParameter = Terrains3dConfig.GRADRANGE_RADIUS;
const paramScaleX: NumberParameter = Terrains3dConfig.GRADRANGE_SCALE_X;
const paramScaleY: NumberParameter = Terrains3dConfig.GRADRANGE_SCALE_Y;
const paramRotation: NumberParameter = Terrains3dConfig.GRADRANGE_ROTATION;
const paramPositionX: NumberParameter = Terrains3dConfig.GRADRANGE_POSITION_X;
const paramPositionY: NumberParameter = Terrains3dConfig.GRADRANGE_POSITION_Y;

interface EditorGradientProps {
    gradient: CircunfGradient;
    ongradientmod?: (gradient: CircunfGradient)=>void;
};

export function EditorGradient({ gradient, ongradientmod }: EditorGradientProps) {

    const currGradIntensity = useRef<NumberParameter>(paramIntensity);
    const currGradRadius = useRef<NumberParameter>(paramRadius);
    const currGradScaleX = useRef<NumberParameter>(paramScaleX);
    const currGradScaleY = useRef<NumberParameter>(paramScaleY);
    const currGradRotation = useRef<NumberParameter>(paramRotation);
    const currGradPositionX = useRef<NumberParameter>(paramPositionX);
    const currGradPositionY = useRef<NumberParameter>(paramPositionY);

    useEffect(() => {
        currGradIntensity.current.value = gradient.intensity;
        currGradRadius.current.value = gradient.radius;
        currGradScaleX.current.value = gradient.scale.x;
        currGradScaleY.current.value = gradient.scale.y;
        currGradRotation.current.value = gradient.rotation;
        currGradPositionX.current.value = gradient.position.x;
        currGradPositionY.current.value = gradient.position.y;
    }, []);
        
    const handleOnChange = (index:number,value:number) => {
        if(index===0){currGradIntensity.current.value = value;}
        else if(index===1){currGradRadius.current.value = value;}
        else if(index===2){currGradScaleX.current.value = value;}
        else if(index===3){currGradScaleY.current.value = value;}
        else if(index===4){currGradRotation.current.value = value;}
        else if(index===5){currGradPositionX.current.value = value;}
        else if(index===6){currGradPositionY.current.value = value;}
    };//end

    return (
        <Flex width="100%" direction="column" gapY="2" >
            <SliderNumber index={0}
                        params={currGradIntensity.current} 
                        onchange={handleOnChange} />
            <SliderNumber index={1}
                        params={currGradRadius.current} 
                        onchange={handleOnChange} />    
            <SliderNumber index={2}
                        params={currGradScaleX.current} 
                        onchange={handleOnChange} />    
            <SliderNumber index={3}
                        params={currGradScaleY.current} 
                        onchange={handleOnChange} />
            <SliderNumber index={4}
                        params={currGradRotation.current} 
                        onchange={handleOnChange} />
            <SliderNumber index={5}
                        params={currGradPositionX.current} 
                        onchange={handleOnChange} />
            <SliderNumber index={6}
                        params={currGradPositionY.current} 
                        onchange={handleOnChange} />
        </Flex>        
    )
};//end
